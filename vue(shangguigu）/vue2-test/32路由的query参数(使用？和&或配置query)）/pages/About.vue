<!-- 这里面放路由组件 -->
<template>
	<h2>我是About的内容</h2>
</template>

<!-- $route 每个组件都有 但是$router有且仅有一个 -->
<script>
	export default {
		name:'About',
		/* beforeDestroy() {
			console.log('About组件即将被销毁了')
		},*/
		/* mounted() {
			console.log('About组件挂载完毕了',this)
			window.aboutRoute = this.$route
			window.aboutRouter = this.$router
		},  */
	}
</script>