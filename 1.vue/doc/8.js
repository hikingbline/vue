class Watcher {
  constructor(vm, expr, updateCb) {
    this.vm = vm;
    this.expr = expr;
    this.updateCb = updateCb;
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
let originalTextContent = "counter1:{{counter1}},counter2:{{counter2}}";
let match = null;
let vm = {counter1:0}
let reg = /\{\{(.*?)\}\}/g;
const updateTextContent = () => console.log('updateTextContent');
//先把结果给他再判断是不是null
while ((match = reg.exec(originalTextContent)) !== null) {
  console.log(match);
  //第一次匹配 match[1]   
  const key = match[1].trim();//counter1
  //观察Vm的counter属性 
  new Watcher(vm, key, updateTextContent);
  //第二次是counter2
}
