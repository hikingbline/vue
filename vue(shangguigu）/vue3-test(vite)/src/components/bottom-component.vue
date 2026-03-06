<script setup>
import { inject } from 'vue'
const themeColor = inject('theme-color')
const count = inject('count')
const changeCount = inject('changeCount')
const clickFn = () => {
  changeCount(100000)
}
</script>

<template>
  <div>
    <h3>我是底层组件-{{ themeColor }}-{{ count }}</h3>
    <!-- 遵循一个原则：谁的数据谁来维护 -->
     <button @click="clickFn">更新count</button>
  </div>
</template>