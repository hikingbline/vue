<template>
	<div class="container">
		<Category title="美食" >
			<img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
		</Category>

		<Category title="游戏" >
			<ul>
				<li v-for="(g,index) in games" :key="index">{{g}}</li>
			</ul>
		</Category>

		<Category title="电影">
			<video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
		</Category>
	</div>
</template>

<script>
	import Category from './components/Category'
	export default {
		name:'App',
		components:{Category},
		data() {
			return {
				foods:['火锅','烧烤','小龙虾','牛排'],
				games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
				films:['《教父》','《拆弹专家》','《你好，李焕英》','《尚硅谷》']
			}
		},
	}
</script>

<style>
.container {
  /* 弹性盒模型 */
  display: flex;
  /* flex布局常用属性 */
  /* justify-content
    作用：定义项目在主轴上的对齐方式
    取值：
	flex-start（默认）：左对齐
	flex-end：右对齐
	center：居中
	space-between：两端对齐，项目间距离相等
	space-around：每个项目两侧间距相等
	space-evenly：所有项目间距相等 */

  justify-content: space-around;
}
</style>
