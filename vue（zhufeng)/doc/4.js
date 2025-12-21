// 可被订阅者
class Subscribable {
    constructor(value) {
        this.value = value;
        this.subscribers = [];//在被观察者定义一个数组,记录它的观察者,也就是订阅者
    }
    addSubscriber(subscriber) {
        this.subscribers.push(subscriber);
    }
    notify(newValue) {
        //当值变化的时候通知所有的订阅者
        this.subscribers.forEach(subscriber => subscriber.update(newValue));
        }
}


class Subscriber {
    constructor(name) {
        this.name = name;
    }
    update(newValue) {
        console.log(this.name,newValue);
    }
}
debugger

//创建一个可被订阅者
let subscribable = new Subscribable('A');
//创建二个订阅者
let subscriber1 = new Subscriber('1');
let subscriber2 = new Subscriber('2');
//订阅者订阅可被订阅者
subscribable.addSubscriber(subscriber1);
subscribable.addSubscriber(subscriber2);
//修改可被订阅者的值
subscribable.notify('B');