import Mock from "mockjs";
// 引入JSON数据格式。webpack对外默认暴露：图片、JSON，不需要暴露
import banner from "./banner.json";
import floor from "./floor.json";

// mock方法有2个参数：第一个是请求地址，第二个是返回数据
Mock.mock("/mock/banner", { code: 200, data: banner });
Mock.mock("/mock/floor", { code: 200, data: floor });
