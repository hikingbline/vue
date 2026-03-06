<script setup>

//默认情况下在<script setup>语法糖下组件内部的属性和方法是不开放给父组件访问的
//可以通过defineExpose编译宏指定哪些属性和方法允许访问，将这些属性和方法暴露出去
const count = 999
const sayHi = () => {
  console.log('打招呼')
}

defineExpose({
  count,
  sayHi
})
</script>

<template>
  <div>
  我是用于测试的组件
  </div>
</template>

<style></style>
