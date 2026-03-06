import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { computed } from "vue";
export const useChannelStore = defineStore('channel', () => {
  //声明数据
  const channelList = ref([]);
  //声明操作数据的方法
  const getList = async () => {
    //支持异步
    //res默认会包装一层，会解构出data
      try {
        // Axios 的响应对象默认有一个外层包装（即 response.data）。
        // 接口返回的实际业务数据通常嵌套在 response.data.data 中，因此需要两次解构。
      const {
        data: { data },
          } = await axios.get("https://geek.itheima.net/v1_0/channels");
        // 发起一个 GET 请求，访问地址为 'https://geek.itheima.net/v1_0/channels'。
        // Axios 返回的是一个 Promise 对象，await 等待其解析完成。
        // 解构赋值提取响应体中的 data 字段：
        // 外层 data 是 Axios 响应的标准字段（response.data）。
        // 内层 data 是接口实际返回的业务数据对象。
        // 最终得到的 data 就是接口返回的具体内容。
      channelList.value = data.channels;
    } catch (error) {
      console.error("获取频道列表失败:", error);
    }
  };
    //声明getters相关
    const channelIds = computed(() => channelList.value.map(item => item.id))

  return {
    channelList,
    getList,
    channelIds
  };
})