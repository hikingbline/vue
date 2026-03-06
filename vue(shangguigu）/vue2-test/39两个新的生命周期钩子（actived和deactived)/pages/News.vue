<template>
	<ul>
		<li :style="{opacity}">欢迎学习Vue</li>
		<li>news001 <input type="text"></li>
		<li>news002 <input type="text"></li>
		<li>news003 <input type="text"></li>
	</ul>
</template>

<script>
	export default {
		name:'News',
		data() {
			return {
				opacity:1
			}
		},
		/* beforeDestroy() {
			console.log('News组件即将被销毁了')
			clearInterval(this.timer)
		}, */
		/* mounted(){
			this.timer = setInterval(() => {
				console.log('@')
				this.opacity -= 0.01
				if(this.opacity <= 0) this.opacity = 1
			},16)
		}, */
		//这是路由独有的生命周期钩子
		activated() {
			this.timer = setInterval(() => {
				console.log('@')
				this.opacity -= 0.01
				if(this.opacity <= 0) this.opacity = 1
			},16)
		},
		deactivated() {
			clearInterval(this.timer)
		},
	}
</script>