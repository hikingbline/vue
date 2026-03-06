<template>
	<div>
	<h4>{{person}}</h4>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>薪资：{{job.j1.salary}}K</h2>
	<button @click="name+='~'">修改姓名</button>
	<button @click="age++">增长年龄</button>
	<button @click="job.j1.salary++">涨薪</button>
	</div>
</template>

<script>
    //ref是复制一个（新创建一个，和原来的没有关系，它改原来的也不会改）
	//toRef是创建一个ref，但是它的value属性是响应式的，指向另一个对象中的某个属性
    //toRefs只是把第一层给拆出来了 
	import {ref,reactive,toRef,toRefs} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			// const name1 = person.name
			// console.log('%%%',name1)
			// const name2 = toRef(person,'name')
			// console.log('####',name2)

			//const x = toRefs(person)
			//返回一个对象（常用）
			return {
				person,
				// name:toRef(person,'name'),
				// age:toRef(person,'age'),
				// salary:toRef(person.job.j1,'salary'),
				//扩展修饰符
				...toRefs(person)
			}
		}
	}
</script>

