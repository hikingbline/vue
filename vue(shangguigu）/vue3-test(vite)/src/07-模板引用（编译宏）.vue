<script setup>
import TestCom from '@/components/test-com.vue';
import { ref } from 'vue'

//模板引用（可以获取DOM,也可以获取组件）
//1.调用ref函数 生成一个ref对象
//2.通过ref标识，进行绑定
//3.通过ref对象.value即可访问到绑定的元素（必须渲染完成后才能被访问）

//获取DOM
const input = ref(null)

//生命周期钩子 onMounted 看DOM是否渲染完成
onMounted(()=>{
  // console.log(input.value);
 //一进页面就聚焦
  // input.value.focus()
})
//定义一个方法    
const clickFn = () =>{
  input.value.focus()
}

//-------------------------
//获取组件
const testRef = ref(null)
const getComponent = () =>{
  console.log(testRef.value)
}
</script>

<template>
  <div>
  <input type = "text">
  <button @click = "clickFn">点击让输入框聚焦</button>
  </div>

  <TestCom ref = "testRef"></TestCom>
  <button @click = "getComponent">获取组件</button>
</template>

<style></style>
