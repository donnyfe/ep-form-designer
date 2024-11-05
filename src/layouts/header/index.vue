<script
	setup
	lang="ts"
>
import logo from '@/assets/logo.png'
</script>

<template>
<header class="designer-header">
	<div class="logo">
		<img
			:src="logo"
			alt=""
		/>
	</div>
	<div class="title">Element-Plus Form Designer</div>
</header>
</template>

<style
	lang="scss"
	scoped
>
	.designer-header {
		@apply flex justify-start h-60px bg-white border-b-solid border-b-gray-200 mb-2 px-2;

		.logo {
			@apply w-60px h-full overflow-hidden box-border px-2 py-2;

			img {
				@apply w-full h-full;
			}
		}

		.title {
			@apply flex items-center h-full text-22px;
		}
	}
</style>
