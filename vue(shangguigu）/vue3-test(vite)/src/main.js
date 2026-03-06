
//new Vue() 创建一个应用实例 => createApp() 创建一个应用实例
//createRouter() createStore() 等等函数也是用来创建对应的实例的 保证每个实例的独立封装性
import { createApp } from 'vue'
import App from './App.vue'

//mount 设置挂载点 #app(id为app的盒子)
createApp(App).mount('#app')
