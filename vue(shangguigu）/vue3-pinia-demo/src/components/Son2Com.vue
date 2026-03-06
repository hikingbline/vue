<script setup>
import { useCounterStore } from "@/store/counter.js";
const store = useCounterStore();
</script>

<template>
 <div>
  我是Son2Com - {{ store.count }}<button @click="store.subcount">-</button>
 </div>
</template>

<style scoped></style>
