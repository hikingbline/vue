<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<!-- transition       用于单个元素的过渡效果 -->
		<!-- transition-group 用于多个元素的过渡效果 -->
		<transition-group name="hello" appear>
			<!-- key 唯一标识 -->
			<!-- 不能包在一起，可能会有互斥的情况，交叉过渡 -->
			<h1 v-show="!isShow" key="1">大傻逼！</h1>
			<h1 v-show="isShow" key="2">徐雨亮！</h1>
		</transition-group>
	</div>
</template>

<script>
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>

<!-- 过渡 -->
<style scoped>
	h1{
		background-color: orange;
	}
	/* vue给我们加了3个样式 进入/离开的时候 进入/离开的过程中 进入/离开的终点 */
	/* 进入的起点、离开的终点：hello-leave-to */
	.hello-enter,.hello-leave-to{
		transform: translateX(-100%);
	}
	.hello-enter-active,.hello-leave-active{
		transition: 0.5s linear;
	}
	/* 进入的终点：hello-enter-to、离开的起点：hello-leave */
	.hello-enter-to,.hello-leave{
		transform: translateX(0);
	}

</style>