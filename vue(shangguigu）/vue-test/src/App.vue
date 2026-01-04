<template>
	<div>
		<School/>
		<Student/>
	</div>
</template>

<script>
	import School from './components/School'
	import Student from './components/Student'

	export default {
		name:'App',
		components:{School,Student}
	}
</script>

<!-- app里面写样式了，说明许多组件都是在用这个样式 -->
<style>
.title {
  color: green;
}
</style>
