<template>
	<div class="container">

		<Category title="游戏">
			<!-- 注意scope是作用的意思 -->
			<template scope="atguigu">
				<ul>
					<li v-for="(g,index) in atguigu.games" :key="index">{{g}}</li>
				</ul>
			</template>
		</Category>

		<!-- 根据数据所采用的结构是由使用者而定的 -->
		<Category title="游戏">
			<!-- 解构赋值就不用给插槽起名字了 -->
			<template scope="{games}">
				<ol>
					<li style="color:white" v-for="(g,index) in games" :key="index">{{g}}</li>
				</ol>
			</template>
		</Category>

		<Category title="游戏">
			<template slot-scope="{games}">
				<h4 v-for="(g,index) in games" :key="index">{{g}}</h4>
			</template>
		</Category>

	</div>
</template>

<script>
	import Category from './components/Category'
	export default {
		name:'App',
		components:{Category},
	}
</script>

<style scoped>
	.container,.foot{
		display: flex;
		justify-content: space-around;
	}
	h4{
		text-align: center;
	}
</style>
