class Watcher {
  //global全局变量
  constructor() {
    global.temp = this;
    getter();
  }
}

function getter() {
  console.log(global.temp);
}

let watcher1 = new Watcher();
