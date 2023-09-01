// 这里是搜索的仓库
import { reqSearchList } from "@/api";
const actions = {
  async getSearchList({ commit }, params = {}) {
    let res = await reqSearchList(params);
    if (res.code === 200) {
      commit("GETSEARCHLIST", res.data);
    }
  },
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const state = {
  searchList: {},
};
// 计算属性，在项目中，简化数据而生
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
};
export default {
  actions,
  mutations,
  state,
  getters,
};
