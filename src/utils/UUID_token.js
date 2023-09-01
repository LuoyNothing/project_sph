import { v4 as uuidv4 } from "uuid";
// 暴露一个getUUID函数
// 该函数返回一个临时的用户id，且每次执行都是一样的id，持久化保存
export const getUUID = () => {
  // 查看本地存储有没有，没有就新生成id并保存
  let uuid_token = localStorage.getItem("UUID_TOKEN");
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem("UUID_TOKEN", uuid_token);
  }
  return uuid_token;
};
