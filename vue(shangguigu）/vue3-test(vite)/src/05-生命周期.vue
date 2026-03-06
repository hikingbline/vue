<script setup>
import { onMounted } from 'vue'

//beforeCreate和created中的相关代码一律放在setup中执行
const getList = () => {
    setTimeout(() => {
        console.log('发送请求，获取数据')
    }, 2000);
}
//一进入页面的请求
getList()

//如果有些代码需要在mounted里面执行
onMounted(() => {
    console.log('monunted生命周期函数')
})

//写成函数的调用方式，可以调用多次，调一个函数就提供一个逻辑

</script>

<template>
</template>

<style>
</style>