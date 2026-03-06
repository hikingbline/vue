<!-- 组合式API-provide/inject的使用-->
<!-- 顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信 -->

<script setup>
import centerComponent from '@/components/center-component.vue';
import { provide } from 'vue'
import { ref } from 'vue'

//1.跨层传递普通数据
//属性名 属性值
provide('theme-color', 'pink')

//2.跨层传递响应式数据
const count = ref(100)
provide('count', count)

setTimeout(() => {
  count.value += 10
}, 1000)

//跨层传递函数 => 给子孙后代传递可以修改数据的方法
provide('changeCount', (newCount) => {
  count.value = newCount
})
</script>

<template>
  <div>
    <h1>我是顶层组件</h1>
    <centerComponent></centerComponent>
  </div>
</template>
