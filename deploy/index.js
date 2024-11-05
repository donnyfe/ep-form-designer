import 'dotenv/config'
// 导入基础部署类和具体实现类
import { NpmDeploy } from './NpmDeploy.js'
import { ServerDeploy } from './ServerDeploy.js'

// 部署管理器
export class DeployManager {
	constructor() {
		this.deployers = []
	}

	addDeployer(deployer) {
		this.deployers.push(deployer)
		return this
	}

	async deploy() {
		for (const deployer of this.deployers) {
			await deployer.deploy()
		}
	}
}

// 配置各种部署选项
const npmOptions = {
	defaultRegistry: 'https://registry.npmmirror.com',
	publishRegistry: 'https://registry.npmjs.org',
	publishScope: 'public'
}

const serverOptions = {
	ssh: {
		host: process.env.SSH_HOST,
		port: process.env.SSH_PORT || 22,
		username: process.env.SSH_USERNAME,
		password: process.env.SSH_PASSWORD
	},
	rootPath: '/root/web/ep-form-designer',
	files: ['dist.tar.gz'],
	shell: [
		'cd /root/web/ep-form-designer',
		'rm -rf dist',
		'tar zxvf dist.tar.gz',
		'rm -rf dist.tar.gz',
		'exit'
	]
}

// 使用示例
const deployManager = new DeployManager()

// 按需添加部署器
deployManager
	// 添加npm部署器
	.addDeployer(new NpmDeploy(npmOptions))
	// 添加服务器部署器
	.addDeployer(new ServerDeploy(serverOptions))

// 执行部署
deployManager.deploy()
