//引入的不再是Vue的构造函数了，而是名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

//创建应用实例对象——app(类似于之前vue2中的vm，但app比vm更“轻”)
const app = createApp(App)
app.mount('#app')

//unmount卸载
// setTimeout(() => {
//   app.unmount('#app')
// }, 1000)