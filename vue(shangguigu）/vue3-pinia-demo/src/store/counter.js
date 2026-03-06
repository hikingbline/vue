import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from "vue";


//定义store
//defineStore(仓库的唯一标识，() => {.....})
//这是一个函数 要用的时候直接导出调用即可
export const useCounterStore = defineStore(
  "counter",
  () => {
    //声明数据 state
    const count = ref(100);

    //声明操作数据的方法 action
    const addcount = () => {
      count.value++;
    };

    const subcount = () => {
      count.value--;
    };

    //声明基于数据派生的计算属性 getters 用computed来声明
    const doubleCount = computed(() => count.value * 2);

    //声明数据 state - msg
    const msg = ref("hello pinia");

    return { count, addcount, subcount, doubleCount, msg };
  },
    {
        persist: {
            key: 'hm-counter',//本地存储的唯一标识
            paths: ['count']//存储的是哪些数据
      }
  } //开启当前模块的数据持久化
);
