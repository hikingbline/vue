<script setup>
import { storeToRefs } from "pinia";
import Son1Com from "./components/Son1Com.vue";
import Son2Com from "./components/Son2Com.vue";
import { useCounterStore } from "@/store/counter.js";
import { useChannelStore } from "@/store/channel.js";
const store = useCounterStore();
const channelStore = useChannelStore();

//解构响应式数据
//数据解构的时候要加storeToRefs
//方法解构的时候不用加
const { count, msg } = storeToRefs(store);
const { channelList } = storeToRefs(channelStore);
const { getList } = channelStore;
</script>

<template>
  <div>
    <h3>App.vue根组件 - {{count }} - {{ msg }}</h3>
    <Son1Com></Son1Com>
    <Son2Com></Son2Com>
    <hr>
    <button @click="getList">获取频道的数据</button>
    <ul>
        <li v-for="item in channelList" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
