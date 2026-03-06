<script setup>
//子组件
//注意，由于写了setup ，所以无法配置props选项了
//所以：此处需要借助于"编译器宏"函数接受子组件传来的数据
const props = defineProps({
    car: String,
    money: Number
})
console.log(props.car)
console.log(props.money)

const emit = defineEmits(['changemoney'])
const buy = () => {
    emit('changemoney', 5)
}
</script>

<template>
  <div class="son">我是子组件-{{ car }}-{{ money }}</div>
  <button @click="buy">花钱</button>
</template>

<style scoped>
.son{
    border: 1px solid #000;
    padding: 30px;
}
</style>
