import axios from "axios";
// 这里是二次封装axios
// 创建一个axios实例，方便设置请求拦截器和响应拦截器
import nProgress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css";
const requests = axios.create({
  // 基础的url
  baseURL: "/mock",
  // 请求超时时间
  timeout: 5000,
});
// 请求拦截器
requests.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});

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
