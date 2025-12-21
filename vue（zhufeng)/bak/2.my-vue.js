// 定义一个简单的Vue类，模拟Vue的核心功能
class Vue {
  // 构造函数，接收配置选项对象作为参数
  constructor(options) {
    debugger; // 调试断点，可用于观察实例化过程

    // 将用户传入的所有配置选项保存到实例的$options属性中
    this.$options = options;

    // 根据配置中的el选择器，获取页面上要挂载的目标DOM元素
    this.$el = document.querySelector(options.el);

    // 将用户传入的data数据对象保存到实例的$data属性中
    this.$data = options.data;

    // 调用初始化方法，启动Vue实例的初始化流程
    this.init();
  }

  // Vue实例的初始化方法，负责启动各项初始化工作
  init() {
    debugger;
    // 1. 执行数据代理，让vm实例可以直接访问$data中的属性（如vm.msg）
    this.proxyData();

    // 2. 执行模板编译，将模板渲染到页面
    this.compile(this.$el);
  }

  // 数据代理方法：实现vm.xxx -> vm.$data.xxx的映射
  proxyData() {
    // 遍历$data对象上的所有属性名（如msg）
    for (let key in this.$data) {
      // 使用Object.defineProperty为Vue实例添加同名属性
      Object.defineProperty(this, key, {
        // 当访问vm.key时触发的getter方法
        get() {
          // 返回$data中对应属性的值，实现读取代理
          return this.$data[key];
        },
        // 当给vm.key赋值时触发的setter方法
        set(newVal) {
          // 将新值赋给$data中对应的属性，实现写入代理
          this.$data[key] = newVal;
          // 数据更新时重新编译模板
          this.compile();
        },
      });
    }
  }
  compile(el) {
    //el.childNodes 获取当前elDOM子元素的集合
    //通过Array.from变成数组
    //nodeType值 1 元素 2 属性 3 文本
    //再根据节点的类型进行过滤 得到一个文本节点的数组
    const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === 3);
    //遍历文本节点的数组
    textNodes.forEach(node => {
      //获取文本节点的内容
      const { textContent } = node;
      //把文本节点中的内容替换为实际数据对象的属性
      console.log(textContent);
      node.textContent = textContent.replace(/\{\{(.*?)\}\}/g, (_, key) => {
        return this[key.trim()]; // 通过数据代理获取实际值
      });
    });
    //等替换完所有的变量了 也就是说Vue已经编译结束了 就可以移除v-cloak属性了
    el.removeAttribute('v-cloak');
}
}