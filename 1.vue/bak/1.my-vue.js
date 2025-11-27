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
    this.compile();
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

  // 模板编译方法：解析模板内容并渲染到页面
  compile() {
    // 从配置选项中解构出用户传入的模板字符串
    const { template } = this.$options;

    // 使用正则表达式匹配模板中的{{变量}}语法，并替换为$data中的实际数据
    // /\{\{(.*?)\}\}/g：匹配{{}}包裹的内容，.*?是非贪婪匹配
    // key.trim()：去除变量名前后的空格（如{{ msg }}中的空格）
    const html = template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
      return this[key.trim()]; // 通过数据代理获取实际值
    });

    // 创建一个临时的DOM容器，用于解析HTML字符串为真实DOM节点
    const tempContainer = document.createElement("div");
    //把转换成的html变成临时容器里的innerHTML这样就可以得到span的真实DOM
    tempContainer.innerHTML = html;
    //在临时容器中寻找拥有v-text属性的DOM元素
    debugger
    const hasVTexts = tempContainer.querySelectorAll('[v-text]');
    if (hasVTexts && hasVTexts.length > 0) {
      for (const hasVText of hasVTexts) {
        //获取此DOM元素上的v-text属性值
        let textBinding = hasVText.getAttribute("v-text"); //msg
        //给此DOM元素的文本属性赋值为此实例的变量属性 this=vm textBinding = msg vm.msg
        hasVText.textContent = this[textBinding];
      }
    }

    //在临时容器中寻找拥有v-html属性的DOM元素
    const hasVHTMLs = tempContainer.querySelectorAll("[v-html]");
     if (hasVHTMLs && hasVHTMLs.length > 0) {
       for (const hasVHTML of hasVHTMLs) {
         //获取此DOM元素上的v-text属性值
         let htmlBinding = hasVHTML.getAttribute("v-html"); //msg
         //给此DOM元素的文本属性赋值为此实例的变量属性 this=vm textBinding = msg vm.msg
         hasVHTML.innerHTML = this[htmlBinding];//vm.msg
       }
     }
   
    //获取的是临时容器的第一个儿子
    const newEl = tempContainer.firstChild;
    //然后就可以把第一个儿子，也就是span替换掉老的el
    document.body.replaceChild(newEl, this.$el);
    //渲染完成之后把此新的el赋值给this.$el，成为下一次被更新的DOM元素
    this.$el = newEl;

  }
}
