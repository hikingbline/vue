<script setup>
//const 计算属性 = computed(() => {
// return 计算返回的结果
//})

import { ref, computed } from 'vue'
//声明数据 
const list = ref([1, 2, 3, 4, 5, 6, 7, 8])

//基于list去派生一个计算属性,从list中过滤出>2的数字
const computedList = computed(() => {
  return list.value.filter(item => item > 2)
})

//定义一个修改数组的方法
const addCount = () => {
  list.value.push(666)
}

</script>

<template>
  <div>原始数据：{{ list }}</div>
  <hr>
  <div>计算属性结果：{{ computedList }}</div>
  <button  @click="addCount" type="button">修改</button>
</template>

<style scoped>

</style>