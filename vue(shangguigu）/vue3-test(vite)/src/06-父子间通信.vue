<script setup>
//父传子
//1.给子组件添加属性的方法来传值
//2，在子组件中通过props来接收

//子传父
//1.在子组件内部通过，emit函数来触发事件(通过编译宏来获取）
//2.在父组件中用@来监听子组件触发的事件，并获取到子组件传递的参数

//局部组件，导入进来就能用
import { ref } from "vue";
import sonComponent from "./components/son-component.vue";
const money = ref(100);
const getMoney = () => {
  money.value += 10;
};
const changeFn = (newMoney) => {
  money.value = newMoney;
};
</script>

<template>
  <div>
    <h1>我是父组件-{{ money }}</h1>
    <button @click="getMoney">挣钱</button>

    <!-- 给子组件添加属性的方式传值 -->
    <!-- ：绑动态的属性传动态的值 -->
    <son-component 
    @changemoney="changeFn"
    car="宝马车" 
    :money="money"> 
    </son-component>
  </div>
</template>

<style></style>
