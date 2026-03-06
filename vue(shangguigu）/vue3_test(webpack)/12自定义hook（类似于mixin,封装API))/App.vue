<template>
	<div>
	<button @click="isShowDemo = !isShowDemo">切换隐藏/显示</button>
	<Demo v-if="isShowDemo"/>
	<hr>
	<Test/>
	</div>
</template>

<script>
	import {ref} from 'vue'
	import Demo from './components/Demo'
	import Test from './components/Test'
	export default {
		name: 'App',
		components:{Demo,Test},
		setup() {
			let isShowDemo = ref(true)
			return {isShowDemo}
		}
	}
</script>

