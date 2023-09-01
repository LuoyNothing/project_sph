// 用户登陆和注册的仓库
import {
  reqRegisterCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
} from "@/api";

const actions = {
  // 注册：发送验证码
  async RegisterCode({ commit }, phone) {
    let res = await reqRegisterCode(phone);
    if (res.code === 200) {
      commit("REGISTERCODE", res.data);
      return "ok";
    } else {
      return Promise.reject(new Error("Fail"));
    }
  },
  // 注册：点击完成注册
  async getUserRegister({ commit }, data) {
    let res = await reqUserRegister(data);
    if (res.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  // 登陆
  async getUserLogin({ commit }, user) {
    let res = await reqUserLogin(user);
    if (res.code === 200) {
      // localStorage.setItem("token", res.data.token);
      commit("GETUSERLOGIN", res.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  // 首页：登陆成功在首页展示用户信息
  async getUserInfo({ commit }) {
    let res = await reqUserInfo();
    console.log(res);
  },
};
const mutations = {
  REGISTERCODE(state, code) {
    state.code = code;
  },
  GETUSERLOGIN(state, token) {
    state.token = token;
  },
};
const state = {
  code: "",
  token: "",
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
