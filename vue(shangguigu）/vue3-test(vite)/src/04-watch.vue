<script setup>
import { ref,watch } from 'vue';

const count = ref(0);
const nickname = ref('张三');

const changeCount = () => {
  count.value++;
};  

const changeNickname = () => {
  nickname.value = '李四';
};

//1.监视单个数据的变化
//  watch(ref对象，（newValue,oldValue）=>{...})
//不要加.value 因为此时要监视的是一个对象 不是值
watch(count, (newValue, oldValue) => {
  console.log('count', newValue, oldValue);
});

//2.监视多个数据的变化
// watch([ref对象1,ref对象2],(newValues,oldValues)=>{...})
watch([count, nickname], (newValues, oldValues) => {
  console.log('count', newValues[0], oldValues[0]);
  console.log('nickname', newValues[1], oldValues[1]);
});

//立即执行
// //3.immediate:是否在初始化时执行一次监听函数
// watch(count, (newValue, oldValue) => {
//   console.log(newValue, oldValue);
// }, { immediate: true });

//4.深度监视 默认watch进行的是浅层监视
//  const ref1 = ref(简单类型) 可以直接监视
//  const ref2 = ref(复杂类型)  监视不到复杂类型内部数据的变化
const userInfo = ref({
    name: '张三',
    age: 18
})

const setUserInfo = () => {
  userInfo.value.age++;
}

// //监视对象监视的是它的地址，而不是对象内部的数据
//加上深度监视是监视它的全部属性，不能做到针对哪一个属性进行监听
// watch(userInfo, (newValue, oldValue) => {
//   console.log('userInfo', newValue, oldValue);
// }, { deep: true });//深度监视

//5.对于对象中的某个属性进行监听
watch(() => 
userInfo.value.age,(newValue, oldValue) => {
  console.log(newValue, oldValue);
})
</script>

<template>
  <div>{{ count }}</div>
  <button @click="changeCount()">改数字</button>
  <div>{{ nickname }}</div>
  <button @click="changeNickname()">改昵称</button>
  <div>----------------------------</div>
  <div>{{ userInfo }}</div>
  <button>修改userInfo</button>
</template>
