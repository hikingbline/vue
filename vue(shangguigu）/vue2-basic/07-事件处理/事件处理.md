## 事件的基本使用：
1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
2.事件的回调需要配置在methods对象中，最终会在vm上；
3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；
4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

## Vue中的事件修饰符：
1.prevent：阻止默认事件（常用）；
2.stop：阻止事件冒泡（常用）；
3.once：事件只触发一次（常用）；
4.capture：使用事件的捕获模式；
5.self：只有event.target是当前操作的元素时才触发事件；
6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

## Vue中的按键修饰符：
1.Vue中常用的按键别名：
                回车 => enter
                删除 => delete (捕获“删除”和“退格”键)
                退出 => esc
                空格 => space
                换行 => tab (特殊，必须配合keydown去使用)
                上 => up
                下 => down
                左 => left
                右 => right

2.Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

3.系统修饰键（用法特殊）： tab ctrl、alt、shift、meta
(1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
//按下就触发 keydown
(2).配合keydown使用：正常触发事件。

//基本上已被淘汰
//推荐使用按键的名字去绑定 而不是通过它的编码
4.也可以使用keyCode去指定具体的按键（不推荐）

5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名