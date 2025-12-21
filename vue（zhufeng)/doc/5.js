class Dep {
  constructor() {
    this.subs = []; 
  }
  //添加订阅者
  addSub(sub) {
    this.subs.push(sub); 
  }
  //更新所有的订阅者
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

class Watcher {
  constructor(vm, expr, updateCb) {
    this.vm = vm;
    this.expr = expr;
    this.updateCb = updateCb;
      Dep.target = this;
      this.vm[this.expr];
      Dep.target = null;
  }

    update() {
        this.updateCb();
  }
}

let obj = {
  counter1: 0,
  counter2: 0,
  counter3: 0,
};

debugger
for (let key in obj) {
  const dep = new Dep();
  let value = obj[key]; //value=0
  Object.defineProperty(obj, key, {
    get() {
      //这个对象和属性名可以随便写，没有什么实际意义
          if (Dep.xxx) {
              dep.addSub(Dep.xxx);
          }
      return value;
    },
    set(newVal) {
      if (newVal !== value) {
          value = newVal;
          dep.notify();
      }
    },
  });
}

//在编译模板的时候，如果遇到了{{counter1}}插件表达式，就需要添加依赖了，
//为counter1属性添加观察者了
//观察obj对象的counter1这个属性，当obj.counter1属性发生变化的时候，执行哪个回调函数
const watcher1 = new Watcher(obj,'counter1',()=>{
    console.log('观察者1号接收到通过啦,我要更新DOM了')
})
const watcher2 = new Watcher(obj,'counter1',()=>{
    console.log('观察者2号接收到通过啦,我要更新DOM了')
})
obj.counter1 = 1;