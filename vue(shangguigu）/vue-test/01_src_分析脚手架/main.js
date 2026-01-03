
//这个Vue不是完整的Vue文件，只是包含了核心功能，不含有模板解析器和一些与浏览器相关的API
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

new Vue({
	el:'#app',
	//render函数完成了这个功能：将App组件放入容器中
    render: h => h(App),
	// render:q=> q('h1','你好啊')
	// template:`<h1>你好啊</h1>`,
	// components:{App},
})