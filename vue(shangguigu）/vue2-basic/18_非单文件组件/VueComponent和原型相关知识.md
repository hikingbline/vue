## 关于VueComponent：
1.school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的。

2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
即Vue帮我们执行的：new VueComponent(options)。

3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！

4.关于this指向：
(1).组件配置中：
data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例象】。
(2).new Vue(options)配置中：
data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。
Vue的实例对象，以后简称vm。

## 内置关系
函数里面的prototype(显式原型属性)
对象里面的__proto__(隐式原型属性)
这只是对属性的一个修饰，最终的原型对象只有一个
1.一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。