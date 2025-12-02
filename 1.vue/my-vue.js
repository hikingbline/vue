// 定义一个简单的Vue类，模拟Vue的核心功能
class Vue {
  constructor(options) {
    this.$options = options;
    this.$el = document.querySelector(options.el);
    this.$data = options.data;
    this.$methods = options.methods || {};
    this.init();
  }

  init() {
    this.proxyData();
    this.proxyMethods();
    this.compile(this.$el);
  }

  proxyData() {
    for (let key in this.$data) {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key];
        },
        set(newVal) {
          this.$data[key] = newVal;
          this.compile(this.$el);
        },
      });
    }
  }

  proxyMethods() {
    if (typeof this.$methods !== "object") return;
    for (let key in this.$methods) {
      this[key] = this.$methods[key].bind(this);
    }
  }

  compile(el) {
    //声明式渲染  vm = this
    const vm = this;
    const ELEMENT_NODE = 1;
    const TEXT_NODE = 3;
    const { childNodes } = el;

    [...childNodes].forEach((node) => {
      if (node.nodeType === ELEMENT_NODE && node.hasAttribute("v-pre")) {
        //跳过自己和子节点的编译过程
        return;
      }
      if (node.nodeType === ELEMENT_NODE) {
        //编译此元素节点的属性
        compileAttributes([...node.attributes],node,vm);
        //编译此子元素节点
        vm.compile(node);
        //如果节点是第一个文本子节点的话
      } else if (node.nodeType === TEXT_NODE) {
        //先尝试去获取此文本节点上的originalTextContent原始的文本内容
        let { originalTextContent } = node;
        //如果没有，则说明是第一次编译此文本节点
        if (!originalTextContent) {
          //去除此文本节点的内容
          originalTextContent = node.textContent;
          //然后赋给node.originalTextContent属性
          node.originalTextContent = originalTextContent;
        }

        //把文本节点的内容中的变量替换为实际数据对象的属性
        //{{msg}} => hello
        node.textContent = originalTextContent.replace(
          /\{\{(.*?)\}\}/g,
          (_, key) => {
            return vm[key.trim()];
          }
        );
      }
    });

     el.removeAttribute("v-cloak");
  }
}

function compileAttributes(attributes,node,vm) {
    attributes.forEach((attr) => {
      if (attr.name === "v-text") {
        handleVText(node, attr, vm); //node节点 attr属性 vm实例
      } else if (attr.name === "v-html") {
        handleVHtml(node, attr, vm); //node节点 attr属性 vm实例
      }
      //属性名以v-bind:开头的话
      if (attr.name.startsWith("v-bind:") || attr.name.startsWith(":")) {
        handleVBind(node, attr, vm);
      } else if (attr.name.startsWith("v-on:") || attr.name.startsWith("@")) {
        handleEvent(node, attr, vm);
      }
    });
}

function handleVText(node,attr,vm){
    //获取属性的值
    const expr = attr.value;
    //从当前的Vue实例属性上获取msg属性的值作为当前元素的文本内容
    node.textContent = vm[expr];
}

function handleVHtml(node,attr,vm){
    //获取属性的值
    const expr = attr.value;
    //从当前的Vue实例属性上获取msg属性的值作为当前元素的HTML内容
    node.innerHTML = vm[expr];
}

function handleVBind(node, attr, vm) {
  //获取属性名 :title v-bind:title  
  let attrName = attr.name;
  if (attrName.startsWith(':')) {
    attrName = `v-bind${attrName}`;//把 :title 转成 v-bind:title
  }
  //获取绑定的属性名和值
     attrName = attr.name.slice(7);
     const key = attr.value;
     node.setAttribute(attrName, vm[key]);
}

function handleEvent(node, attr, vm) {
  //获取属性名 @click v-on:click
  let attrName = attr.name;
  if (attrName.startsWith('@')) {
    attrName = `v-on:${attrName.slice(1)}`; // v-on:click
  }
  const eventName = attrName.slice(5);//click
  const methodName = attr.value;
  node.addEventListener(eventName, vm[methodName]);
}