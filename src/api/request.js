import axios from "axios";
// 这里是二次封装axios
// 创建一个axios实例，方便设置请求拦截器和响应拦截器
import nProgress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css";
// 引入仓库的数据，目的是为了获取uuid
import store from "@/store";
const requests = axios.create({
  // 基础的url
  baseURL: "/api",
  // 请求超时时间
  timeout: 5000,
});
// 请求拦截器
// 这里需要在请求前将uuid传到服务器，数据放在请求头中
requests.interceptors.request.use((config) => {
  // 查看用户是否有Id,有就带上
  if (store.state.Detail.uuid_token) {
    // 这里请求头的字段不能随便取名，需和后端老师商量
    config.headers.userTempId = store.state.Detail.uuid_token;
  }
  // 在发送请求之前加token
  // if (localStorage.getItem("token")) {
  //   config.headers.token = localStorage.getItem("token");
  // }
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  nProgress.start();
  return config;
});
// 请求拦截器
requests.interceptors.response.use(
  (res) => {
    nProgress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error("fail"));
  }
);

export default requests;
