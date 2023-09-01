// 这里是home的仓库
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api";

const actions = {
  // 通过api里的函数向服务器发请求，参数解构出commit
  async categoryList({ commit }) {
    let res = await reqCategoryList();
    if (res.code === 200) {
      // 参数1：提交到哪个函数，提交的数据
      commit("CATEGORYLIST", res.data);
    }
  },
  async getBannerList({ commit }) {
    let res = await reqBannerList();
    if (res.code === 200) {
      commit("BANNERLIST", res.data);
    }
  },
  async getFloorList({ commit }) {
    let res = await reqFloorList();
    if (res.code === 200) {
      commit("FLOORLIST", res.data);
    }
  },
};
const mutations = {
  // 这里有两个参数，一个表示仓库数据，一个表示传递过来的数据
  CATEGORYLIST(store, categoryList) {
    store.categoryList = categoryList;
  },
  BANNERLIST(store, bannerList) {
    store.bannerList = bannerList;
  },
  FLOORLIST(store, floorList) {
    store.floorList = floorList;
  },
};
const state = {
  // 需要初始化数据，根据接口的返回值进行初始化。
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // 获取floor数据
  floorList: [],
};
const getters = {};
export default {
  actions,
  mutations,
  state,
  getters,
};
