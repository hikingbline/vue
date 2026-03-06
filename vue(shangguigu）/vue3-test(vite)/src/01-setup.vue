<!-- SFC单文件组件 script-template-style -->
<!--写逻辑在最上面写  -->
<!-- setup语法糖 -->
<!-- 加上setup允许在编码的时候直接编写组合式API -->
<script setup>
//import HelloWorld from './components/HelloWorld.vue'
//import TheWelcome from './components/TheWelcome.vue'
//数据
const msg = 'Hello World'
//函数
const logMessage = () => {
  console.log(msg)
}
</script>


<!-- 写结构在这里写 -->
<template>
 <div>
  {{ msg }}
 </div>
 <button @click="logMessage">按钮</button>
</template>

<!-- 写样式在这里写 -->
<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
