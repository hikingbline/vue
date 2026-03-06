<template>
	<div>
	<h4>当前求和为：{{sum}}</h4>
	<button @click="sum++">点我++</button>
	<hr>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>薪资：{{job.j1.salary}}K</h2>
	<h3 v-show="person.car">汽车信息：{{person.car}}</h3>
	<button @click="name+='~'">修改姓名</button>
	<button @click="age++">增长年龄</button>
	<button @click="job.j1.salary++">涨薪</button>
	<button @click="showRawPerson">输出最原始的person</button>
	<button @click="addCar">给人添加一台车</button>
	<button @click="person.car.name+='!'">换车名</button>
	<button @click="changePrice">换价格</button>
	</div>
</template>

<script>
	import {ref,reactive,toRefs,toRaw,markRaw} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			function showRawPerson() {
				// toRaw()方法只能处理reactive()处理过的数据
				const p = toRaw(person)
				//此时已经被还原了，年龄在增长但是页面不会再变
				p.age++
				console.log(p)
			}

			function addCar() {
				//markRaw()的应用场景要比toRaw()方法更多
				let car = { name: '奔驰', price: 40 }
				//禁止响应式，防止这个对象特别复杂不想改它
				//只要经过了markRaw()方法，这个对象就永远无法成为响应式了
				person.car = markRaw(car)
			}

			function changePrice(){
				person.car.price++
				console.log(person.car.price)
			}

			//返回一个对象（常用）
			return {
				sum,
				//建议还是把person给出去，以免后面还想加属性
				person,
				...toRefs(person),
				showRawPerson,
				addCar,
				changePrice
			}
		}
	}
</script>

