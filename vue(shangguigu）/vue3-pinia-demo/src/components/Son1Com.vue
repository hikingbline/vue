<script setup>
import { useCounterStore } from "@/store/counter.js";
const store = useCounterStore();
</script>

<template>
 <div>
  我是Son1Com - {{ store.count }}- {{ store.doubleCount }} <button @click="store.addcount">+</button>
 </div>
</template>

<style scoped></style>
