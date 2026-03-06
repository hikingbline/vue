<!-- SFC单文件组件 script-template-style -->
<!--写逻辑在最上面写  -->
<!-- 加上setup允许在编码的时候直接编写组合式API -->
<script setup>
//reactive和ref函数
//rectice函数：接受一个对象类型的数据，返回一个响应式的对象
import { reactive, ref } from 'vue'
const state = reactive({
  count:100
})
const addCount = () => {
  state.count++
}

//ref函数：接受简单数据类型或者是对象数据类型的数据，返回一个响应式的对象
//本质：在原有传入数据的基础上外层包了一层对象，包成了复杂类型
//底层：包成了复杂类型之后，再借助reactive函数实现响应式
//在脚本中访问数据需要通过.value属性访问
//在template中访问数据不需要.value属性访问(因为template模板中会自动帮你解包装)
const count = ref(0)
const setCount = () => {
  count.value++
}
</script>

<!-- 推荐以后声明数据，统一用ref函数 =>统一编码规范，在编写逻辑时加value,在template中访问数据不需要.value属性访问 -->

<!-- 写结构在这里写 -->
<template>
 <div>
 <div>{{ count}}</div>
 <button @click="setCount">+1</button>
 </div>
</template>
