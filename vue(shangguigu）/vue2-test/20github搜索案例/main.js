//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//关闭Vue的生产提示
Vue.config.productionTip = false

//创建vm
new Vue({
  el: "#app",
  //render函数:render函数接收到的createElement函数去指定具体内容。
  render: (h) => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});