<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<!-- 想让谁有动画的效果就给它加一个transition -->
		<!-- appear 让它一上来就有效果 -->
		<!-- name给动画命名 -->
		<transition name="hello" appear>
			<!-- come:来 go:走 -->
			<h1 v-show="isShow">你好啊！</h1>
		</transition>
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

<!-- 动画 -->
<style scoped>
	h1{
		background-color: orange;
	}

	/* v-enter-active 和 v-leave-active 来的时候要激活*/
	/* linear 匀速 */
	.hello-enter-active{
		animation: atguigu 0.5s linear;
	}

	.hello-leave-active{
		animation: atguigu 0.5s linear reverse;
	}

	/* 定义动画 */
	@keyframes atguigu {
		from{
			/* 正：表示从右边而来 负：表示从左边而来 */
			transform: translateX(-100%);
		}
		to{
			transform: translateX(0px);
		}
	}
</style>