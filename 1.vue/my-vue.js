// 定义一个简单的Vue类，模拟Vue的核心功能
class Vue {
  // 构造函数，接收配置选项对象作为参数
  constructor(options) {
    //Vue内置属性不用加$符号
    debugger; // 调试断点，可用于观察实例化过程

    // 将用户传入的所有配置选项保存到实例的$options属性中
    this.$options = options;

    // 根据配置中的el选择器，获取页面上要挂载的目标DOM元素
    this.$el = document.querySelector(options.el);

    // 将用户传入的data数据对象保存到实例的$data属性中
    this.$data = options.data;

    //接收用户定义的方法
    this.$methods = options.methods;


    // 调用初始化方法，启动Vue实例的初始化流程
    this.init();
  }

  // Vue实例的初始化方法，负责启动各项初始化工作
  init() {
    debugger;
    // 1. 执行数据代理，让vm实例可以直接访问$data中的属性（如vm.msg）
    //vm.msg = options.data.msg
    this.proxyData();

    //2.方法代理    vm.say = options.methods.say
    this.proxyMethods();

    // 3. 执行模板编译，将模板渲染到页面
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

  proxyMethods() {
    //遍历methods对象上的所有方法属性
    for (let key in this.$methods) {
      //把每个方法先绑定死this 然后赋值给this[key]
      this[key] = this.$methods[key].bind(this);
      
    }
  }


  //编译模板 不但能编译自己 还能编译子节点或者说是下级节点
  compile(el) {
    const ELEMENT_NODE = 1;
    const TEXT_NODE = 3;
    //获取当前元素的子节点
    const { childNodes } = el;
    //遍历每一个子节点
    //v-pre 指令表示此节点及其子节点不需要编译
    [...childNodes].forEach((node) => {
      if (node.nodeType === ELEMENT_NODE && node.hasAttribute('v-pre')) {
        return;
      }
      //如果此子节点的类型是元素节点的话
      if (node.nodeType === ELEMENT_NODE) {
        //编译此子元素节点
        //获取此元素节点的属性
        const { attributes } = node;
        //遍历所有的属性
        [...attributes].forEach((attr) => {
          //如果属性名是以v-bind:开头的话
          if (attr.name.startsWith("v-bind:")) {
            //v-bind:title
            //v-bind绑的是属性
            //获取绑定的属性名
            const attrName = attr.name.slice(7); //从第7个字符开始截
            //获取属性的值 title
            const key = attr.value;
            //给DOM节点添加属性 setAttribute
            //node.title = '我是标题属性的值'
            node.setAttribute(attrName, this[key]);
          } else if (attr.name.startsWith("v-on:")) {
            //v-on绑的是事件
            //v-on:click
            //获取事件名称
            const eventName = attr.name.slice(5);
            //获取事件处理函数的方法名
            const methodName = attr.value;
            //给当前节点绑定事件处理函数addEventListener
            node.addEventListener(eventName, this[methodName]);
          }
        });
        //递归编译子节点
        this.compile(node);
      } //如果此子节点是一个文本子节点的话
      else if (node.nodeType === TEXT_NODE) {
        //获取文本节点的内容
        const { textContent } = node;
        //使用正则表达式匹配{{}}中的内容 并替换为对应的数据
        node.textContent = textContent.replace(/\{\{(.*?)\}\}/g, (_, key) => {
          return this[key.trim()];
        });
      }
    });
    //编译完成后 移除v-cloak属性
    el.removeAttribute('v-cloak');
  }
}
