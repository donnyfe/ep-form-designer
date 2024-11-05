import { Client } from 'ssh2'
import * as fs from 'node:fs/promises'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import * as childProcess from 'child_process'
import sshConfig from './ssh.config.js'

class Deploy {
	constructor(options) {
		// 验证必要参数
		const required = ['npm', 'ssh', 'server']
		required.forEach(field => {
			if (!options[field]) {
				throw new Error(`Missing required option: ${field}`)
			}
		})

		this.log = this.initLogger()
		this.options = options
		this.client = new Client()
	}
	/**
	 * 初始化日志记录器
	 */
	initLogger() {
		return {
			info: msg => console.log(`[INFO] ${msg}`),
			error: msg => console.error(`[ERROR] ${msg}`),
			success: msg => console.log(`[SUCCESS] ${msg}`)
		}
	}
	/**
	 * 执行命令行命令
	 */
	async execCommand(command) {
		return new Promise((resolve, reject) => {
			let stdout = ''
			let stderr = ''

			const pro = childProcess.exec(command, (err, stdout, stderr) => {
				if (err) reject(err)
			})

			// 收集标准输出
			pro.stdout.on('data', data => {
				stdout += data
				process.stdout.write(data)
			})

			// 收集标准错误
			pro.stderr.on('data', data => {
				stderr += data
				process.stderr.write(data)
			})

			pro.on('exit', code => {
				if (code === 0) {
					resolve({ stdout, stderr })
				} else {
					reject(new Error(`命令执行失败,退出码: ${code}`))
				}
			})
		})
	}
	/**
	 * 执行shell脚本
	 */
	async runShell(shell) {
		return new Promise((resolve, reject) => {
			try {
				this.client.shell((err, stream) => {
					if (err) {
						this.log.error('shell执行失败')
						return reject(err)
					}

					stream
						.on('data', data => {
							this.log.info(`Shell输出: ${data.toString()}`)
						})
						.on('close', () => {
							this.log.info('Shell已关闭')
							this.client.end()
							resolve()
						})
						.on('error', err => {
							this.log.error('Shell执行错误')
							reject(err)
						})
						.end(shell.join('\n'))
				})
			} catch (err) {
				this.log.error(`shell执行失败: ${err.message}`)
			}
		})
	}

	async start() {
		// 压缩代码包
		await this.compression()
		// 发布npm包
		await this.publishNpm()
		// 部署服务器
		await this.publishServer()
	}

	/**
	 * 压缩代码包
	 */
	async compression() {
		this.log.info('正在压缩代码包...')
		await this.execCommand('tar zcvf dist.tar.gz dist')
		this.log.success('代码包压缩成功!')
	}
	/**
	 * 检查npm登录状态
	 */
	async checkNpmLogin() {
		return new Promise(async (resolve, reject) => {
			const { publishRegistry } = this.options.npm
			// 切换到发布源
			await this.execCommand(`npm config set registry=${publishRegistry}`)

			try {
				this.log.info('检查npm登录状态, 请请稍后...')
				const { stdout } = await this.execCommand('npm whoami')
				// 使用 stdout 或 stderr
				this.log.info(`命令输出: ${stdout}`)

				if (stdout.trim() === '') {
					resolve(false)
				} else {
					resolve(true)
				}
			} catch (error) {
				this.log.error(error.message)
				reject(error)
			}
		})
	}

	/**
	 * 发布npm包
	 */
	async publishNpm() {
		const isLogin = await this.checkNpmLogin()
		if (!isLogin) {
			// 执行npm登录
			this.log.info('请登录npm...')
			await this.execCommand('npm login')
		}

		const { defaultRegistry, publishScope } = this.options.npm
		try {
			// 执行发布
			this.log.info('开始发布npm包...')
			const publishCmd = publishScope ? `npm publish --access ${publishScope}` : 'npm publish'
			await this.execCommand(publishCmd)

			// 发布完成后切回默认源
			await this.execCommand(`npm config set registry=${defaultRegistry}`)

			this.log.success('npm包发布成功!')
		} catch (error) {
			this.log.error(`npm包发布失败: ${error.message}`)
			throw error
		}
	}
	/**
	 * 部署服务器
	 */
	async publishServer() {
		try {
			this.log.info('开始部署服务器...')
			await this.connect(async () => {
				await this.upload()
				await this.runShell(this.options.server.shell)
			})
			this.client?.end()
		} catch (error) {
			this.log.error(`部署失败: ${error.message}`)
			// 确保出错时关闭连接
			this.client?.end()
			throw error
		}
	}

	/**
	 * 连接服务器
	 */
	async connect(excutor) {
		this.log.info('正在连接远程服务器……')
		return new Promise((resolve, reject) => {
			// 连接ssh上传
			this.client.connect(this.options.ssh).on('ready', async () => {
				this.log.info('SSH2连接成功!')

				await excutor(this.client)
				resolve()
			})
		})
	}

	/**
	 * 上传资源文件
	 */
	async upload() {
		return new Promise((resolve, reject) => {
			// 建立sftp连接
			this.client.sftp(async (err, sftp) => {
				if (err) {
					this.log.error('SFTP连接失败')
					return reject(err)
				}

				const { files, rootPath } = this.options.server

				try {
					// 使用Promise.all并行处理所有文件上传
					await Promise.all(
						files.map(async file => {
							const filePath = path.join(dirname(fileURLToPath(import.meta.url)), file)

							// 检查文件是否存在
							if (!(await fs.stat(filePath)).isFile()) {
								throw new Error(`本地文件不存在: ${filePath}`)
							}

							this.log.info(`本地路径: ${filePath}`)

							const remotePath = path.join(rootPath, file)
							this.log.info(`远程路径: ${remotePath}`)

							// 上传单个文件
							await this.uploadFile(sftp, filePath, remotePath)
						})
					)

					resolve()
				} catch (error) {
					reject(error)
				}
			})
		})
	}

	// 抽取单个文件上传逻辑为独立方法
	async uploadFile(sftp, localPath, remotePath) {
		return new Promise((resolve, reject) => {
			const startTime = Date.now()
			const fileName = path.basename(localPath)

			sftp.fastPut(
				localPath,
				remotePath,
				{
					step: (transferred, chunk, total) => {
						const percent = Math.round((transferred / total) * 100)
						this.log.info(`${fileName} 上传进度: ${percent}%`)
					}
				},
				err => {
					if (err) {
						this.log.error(`文件 ${fileName} 上传失败`)
						return reject(err)
					}
					const duration = ((Date.now() - startTime) / 1000).toFixed(2)
					this.log.success(`文件 ${fileName} 上传成功! 耗时${duration}秒`)
					resolve()
				}
			)
		})
	}
}

const options = {
	npm: {
		defaultRegistry: 'https://registry.npmmirror.com',
		publishRegistry: 'https://registry.npmjs.org',
		publishScope: 'public' // 发布权限,可选 public/restricted
	},
	// ssh2客户端配置
	ssh: Object.assign(
		{
			host: '', // 服务器公网IP地址
			port: 22, // 端口号，默认22
			username: '', // 登录用户名，默认root
			password: '' // 登录密码
		},
		sshConfig
	),
	server: {
		rootPath: '/root/web/ep-form-designer',
		files: ['dist.tar.gz'],
		shell: [
			// 进入远端目标目录
			'cd /root/web/ep-form-designer',
			// 将上传压缩包复制一份到bak目录下并更名带上时间戳，通常用于代码回退， 根据实际情况选择
			// 'cp dist.tar.gz bak/dist.bak.$(date "+%Y%m%d%H%M%S").tar.gz',
			// 移除远端dist目录
			'rm -rf dist',
			// 解压上传的压缩包
			'tar zxvf dist.tar.gz',
			// 移除压缩包
			'rm -rf dist.tar.gz',
			// 退出ssh2
			'exit'
		]
	}
}

new Deploy(options).start()
