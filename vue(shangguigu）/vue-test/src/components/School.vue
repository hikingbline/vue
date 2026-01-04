<template>
  <div class ="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
export default {
  name: "School",
  data() {
    return {
      name: "徐雨亮好帅hahahahaha",
      address: "北京",
    };
  },
};
</script>

<!-- scoped 局部的 -->
<style scoped>
.demo {
  background-color: red;
}
</style>
