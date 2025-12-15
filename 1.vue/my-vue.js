const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const KeyMap = {
  enter: "Enter",
  delete: ["Backspace", "Delete"],
  up: "ArrowUp",
  down: "ArrowDown",
  left: "ArrowLeft",
  right: "ArrowRight",
  space: "Space",
};
//dependency 的意思，也就是被观察者 data对象的每个属性都对应一个Dep实例
//代表一个依赖 代表一个被观察的变量
class Dep {
  constructor() {
    this.subs = []; //观察者的数组
  }
  //添加订阅者
  addSub(sub) {
    this.subs.push(sub); //添加一个新的观察者
  }
  //更新所有的订阅者
  notify() {
    //通知所有的观察者去更新
    this.subs.forEach((sub) => sub.update());
  }
}

// 新增：全局标记当前正在收集依赖的Watcher
Dep.target = null;

// 订阅者
//在每一个用到data属性值的地方都对应一个观察者实例
//在data属性发生变化的时候都要更新，都会收到通知，然后被调用updata方法进行更新
class Watcher {
  // 新增：接收vm、表达式、更新回调
  constructor(vm, expr, updateCb) {
    this.vm = vm; //观察哪个对象，在这里其实就是Vue类的实例
    this.expr = expr; //观察哪个属性
    this.updateCb = updateCb; //观察到变量变化后执行的回调函数
    //只有在创建Watcher的时候才会给Dep.target赋值 才会在访问属性的时候添加依赖
    //只有在编译模板的时候才会创建Watcher 实例 而编译模板只有一次
    Dep.target = this; //把当前的Watch实例缓存到Dep.target,其实就是一个全局的临时变量
    this.oldValue = this.vm[this.expr]; //访问vm的expr属性值
    //访问完后清掉依赖
    Dep.target = null;
  }

  update() {
    const newValue = this.vm[this.expr];
    //如果老的值和新的值不一样
    if (this.oldValue !== newValue) {
      //就会执行回调，更新DOM
      this.updateCb(this.oldValue, newValue);
      //把新的值保存给老的值oldValue
      this.oldValue = newValue;
    }
  }
}

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
    // 调整顺序：先响应式处理数据，再编译模板（否则编译时无法收集依赖）
    this.observe(this.$data);
    this.compile(this.$el);
  }

  observe(obj) {
    for (let key in obj) {
      //遍历
      let value = obj[key]; //value = 0
      // 为每个属性创建独立的Dep实例，通过实例实现收集观察者和统计观察者的功能
      const dep = new Dep();
      //重新定义属性
      Object.defineProperty(obj, key, {
        get() {
          //如果Dep有值的话把Dep.target 也就是wachter添加到此依赖的subs订阅模式里
          if (Dep.target) {
            dep.addSub(Dep.target);
          }
          return value;
        },
        set(newVal) {
          if (newVal !== value) {
            value = newVal;
            // 新增：数据更新时通知所有订阅者
            dep.notify();
          }
        },
      });
    }
  } // 修复：补全observe方法的闭合大括号

  proxyData() {
    for (let key in this.$data) {
      //vm.msg this[key]
      //给this也就是当前的Vue类的实例定义key属性
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key];
        },
        set(newVal) {
          this.$data[key] = newVal;
          //这里问题非常大
          //1.性能问题
          //2·无限递归问题
          //3.事件重复绑定
          //vue的核心概念：响应式原理或者说叫靶向更新 细粒度更新 定向更新
          //更新数据的时候 只会影响使用到该数据的地方
          // 修复：移除全局compile，改为Watcher靶向更新
          // this.compile(this.$el);
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
    const { childNodes } = el;

    [...childNodes].forEach((node) => {
      if (node.nodeType === ELEMENT_NODE && node.hasAttribute("v-pre")) {
        //跳过自己和子节点的编译过程
        return;
      }
      if (node.nodeType === ELEMENT_NODE) {
        //编译此元素节点的属性
        compileAttributes([...node.attributes], node, vm);
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

        let reg = /\{\{(.*?)\}\}/g;
        //更新文本内容
        const updateTextContent = () => {
          node.textContent = originalTextContent.replace(reg, (_, key) => {
            return vm[key];
          });
        };
        updateTextContent();
        //进行依赖收集，创建观察者，观察counter1这个变量，以后当变量更新的时候，会通知此处进行更新，执行DOM
        let match;
        //依次匹配原始文本中所有的插值语法（{{变量名}}）
        // reg.exec()：每次执行返回一个匹配数组，无匹配时返回null，循环终止
        while ((match = reg.exec(originalTextContent)) !== null) {
          // 4. 提取插值中的变量名（去除首尾空格）
          // match[0]：完整匹配的字符串（如"{{counter1}}"）
          // match[1]：正则捕获组的内容（如"counter1"，对应{{}}包裹的部分）
          const key = match[1].trim();
          //为模板里面的每一个变量(也就是依赖)增加一个观察者的实例，负责监听此变量的变更
          //如果此变量更新了，则会执行回调函数，更新真实DOM
          new Watcher(vm, key, updateTextContent);
        }
      }
    });

    el.removeAttribute("v-cloak");
  }
}

//编译属性 识别指令进行处理
function compileAttributes(attributes, node, vm) {
  attributes.forEach((attr) => {
    if (attr.name === "v-text") {
      handleVText(node, attr, vm); //node节点 attr属性 vm实例
    } else if (attr.name === "v-html") {
      handleVHtml(node, attr, vm); //node节点 attr属性 vm实例
    }
    //属性名以v-bind:开头的话
      else if (attr.name.startsWith("v-bind:") || attr.name.startsWith(":")) {
      handleVBind(node, attr, vm);
    } else if (attr.name.startsWith("v-on:") || attr.name.startsWith("@")) {
      handleEvent(node, attr, vm);
    } else if (attr.name === "v-model") {
      handleVModel(node, attr, vm);
      
    }
  });
}

//处理v-model指令 让输入框和data对象的属性进行双向绑定
//node 当前的DOM节点 就是那个input输入框
//attr {v-model:'msg'}
//vm: Vue的实例
function handleVModel(node, attr, vm) { 
  node.value = vm[attr.value];//hello
  node.addEventListener("input", () => {
    vm[attr.value] = node.value;
  });

  new Watcher(vm, attr.value, () => {
    node.value = vm[attr.value];
  });
}
function handleVText(node, attr, vm) {
  //获取属性的值
  const expr = attr.value;
  // 新增：创建更新回调
  const updateVText = (newVal) => {
    //从当前的Vue实例属性上获取msg属性的值作为当前元素的文本内容
    node.textContent = newVal;
  };
  // 初始化
  updateVText(vm[expr]);
  // 新增：创建Watcher
  new Watcher(vm, expr, updateVText);
}

function handleVHtml(node, attr, vm) {
  //获取属性的值
  const expr = attr.value;
  // 新增：创建更新回调
  const updateVHtml = (newVal) => {
    //从当前的Vue实例属性上获取msg属性的值作为当前元素的HTML内容
    node.innerHTML = newVal;
  };
  // 初始化
  updateVHtml(vm[expr]);
  // 新增：创建Watcher
  new Watcher(vm, expr, updateVHtml);
}

function handleVBind(node, attr, vm) {
  let attrName = attr.name;
  // 处理 v-bind:xxx 或 :xxx，提取真正的属性名（如 title、src 等）
  if (attrName.startsWith("v-bind:")) {
    attrName = attrName.slice(7); // 从 v-bind: 后截取（长度7）
  } else if (attrName.startsWith(":")) {
    attrName = attrName.slice(1); // 从 : 后截取（长度1）
  }
  const key = attr.value;
  // 新增：创建更新回调
  const updateVBind = (newVal) => {
    node.setAttribute(attrName, newVal);
  };
  // 初始化
  updateVBind(vm[key]);
  // 新增：创建Watcher
  new Watcher(vm, key, updateVBind);
}

function handleEvent(node, attr, vm) {
  //获取属性名 @click v-on:click
  let attrName = attr.name;
  if (attrName.startsWith("@")) {
    attrName = `v-on:${attrName.slice(1)}`; // v-on:click
  }

  //获取要绑定的事件名 v-on:click.stop.prevent
  //第一个元素是事件名，后面的都是修饰符modifiers-['stop','prevent']
  const [eventName, ...modifiers] = attrName.slice(5).split("."); //click
  //获取方法表达式 sayHello sayHello(1,'a',$event,msg)
  const methodExpression = attr.value.trim();
  //先让方法名默认等于methodExpression
  let methodName = methodExpression;
  //方法形参
  let args = [];
  //查找左小括号的索引
  let parentIndex = methodExpression.indexOf("("); //8
  //说明有小括号，处理参数
  //-1就是没有的意思
  if (parentIndex !== -1) {
    methodName = methodExpression.substring(0, parentIndex).trim();
    //包前不包后，截取出方法名  methodName = sayHello
    const argsString = methodExpression
      .substring(
        //1,'a',$event,msg
        parentIndex + 1,
        methodExpression.length - 1
      )
      .trim();
    //args = ["1","'a'","$event","msg"]
    args = argsString.split(",").map((arg) => arg.trim());
  } else {
    //如果没有指定参数 则会传递默认参数 就是事件对象
    args = ["$event"];
  }

  let options = {
    capture: modifiers.includes("capture"), //如果有capture修饰符的话 就设置为true
    once: modifiers.includes("once"), //如果有once修饰符的话 就设置为true
    passive: modifiers.includes("passive"), //如果有passive修饰符的话 就设置为true
  };
  //给当前的dom元素绑定点击事件，当点击此DOM元素的时候执行vm.say方法
  node.addEventListener(
    eventName,
    function handler(event) {
      //如果有prevent修饰符的话 阻止执行默认事件
      if (modifiers.includes("prevent")) event.preventDefault(); //阻止默认行为
      //如果有stop修饰符的话 阻止冒泡
      if (modifiers.includes("stop")) event.stopPropagation(); //阻止事件传播，阻止冒泡
      //处理参数
      if (modifiers.includes("self")) {
        //只有在自己身上触发才可以
        //如果事件源对象不是我自己,那么说明此事件是儿子冒泡上的，自己不处理
        if (event.target !== event.currentTarget) return;
      } //event.keyCode
      //当前的按键编码

      let { key } = event;
      //获取本次绑定事件的时候指定了哪些按键修饰符 ['prev']
      // 兼容 KeyMap 中字符串/数组格式，替换 flat() 保证低版本兼容
      let modifierKeyCodes = modifiers
        .map((modifier) => {
          const val = KeyMap[modifier];
          return Array.isArray(val) ? val : [val]; // 统一转为数组
        })
        .filter(Boolean)
        .reduce((acc, val) => acc.concat(val), []); // 替代 flat() 兼容所有浏览器
      //如果发现本次按下的按键在按键修饰符中没有指定，那么直接return
      // 增加 “仅当有按键修饰符时才校验”：仅当有按键修饰符时才校验
      if (modifierKeyCodes.length > 0 && !modifierKeyCodes.includes(key)) {
        return;
      }

      let actualArgs = args.map((arg) => {
        //如果是数字的话
        if (!isNaN(arg)) return Number(arg); // 修复：数字参数转为Number类型
        if (arg === "$event") return event; //如果参数是 $event 则传递事件对象
        if (arg.startsWith("'") && arg.endsWith("'")) return arg.slice(1, -1); //1~-1是为了把单引号给断掉
        // 其他情况：把参数当成vm实例上的变量名，从vm中取值传递。
        return vm[arg]; //否则就当成变量名，从vm实例上取值
      });
      vm[methodName](...actualArgs);
      //如果说绑定事件的时候有once修饰符的话
      if (modifiers.includes("once")) {
        // 修复：仅当有once修饰符时才移除事件
        node.removeEventListener(eventName, handler);
      }
      // 用处理后的参数调用vm实例上的methodName方法（比如vm.say）。
      // 举个例子：如果args是[123, '$event', "'test'", 'msg']，
      // 处理后actualArgs会变成：[123, 事件对象, 'test', vm.msg的值]，
      // 然后执行vm.say(123, 事件对象, 'test', vm.msg)。
    },
    options
  );
}
