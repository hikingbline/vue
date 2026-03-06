<template>
	<div>
		<h2>Home组件内容</h2>
		<div>
			<ul class="nav nav-tabs">
				<li>
					<router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
				</li>
				<li>
					<router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
				</li>
			</ul>
			<!--: 实现了动态绑定，使 include 能够接收 JavaScript 数据类型（如数组）。
                静态写法（无 :）只能传递字符串，无法直接绑定数组。 -->
			<!-- 缓存多个路由组件使用数组来解决-->
			<!-- <keep-alive :include="['News','Message']"> -->

			<!-- 缓存一个路由组件 -->
			<keep-alive include="News">
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Home',
		/* beforeDestroy() {
			console.log('Home组件即将被销毁了')
		}, */
		/* mounted() {
			console.log('Home组件挂载完毕了',this)
			window.homeRoute = this.$route
			window.homeRouter = this.$router
		},  */
	}
</script>