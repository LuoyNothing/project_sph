import { reqDetailList, reqAddOrUpdateShopCar } from "@/api";
import { getUUID } from "@/utils/UUID_token";
const actions = {
  async getDetailList({ commit }, params) {
    let res = await reqDetailList(params);
    if (res.code === 200) {
      commit("GETDETAILLIST", res.data);
    }
  },
  // 加入到购物车，返回状态是否成功，因此这个不需要三连环
  async getAddShopCartState({ commit }, { goodsId, goodsNum }) {
    let res = await reqAddOrUpdateShopCar(goodsId, goodsNum);
    // 加入购物车成功，返回非空字符串
    if (res.code === 200) {
      return "ok";
    } else {
      // 加入购物车失败，返回失败的标记
      return Promise.reject(new Error("Fail"));
    }
  },
};
const mutations = {
  GETDETAILLIST(state, detailList) {
    state.detailList = detailList;
  },
};
const state = {
  detailList: {},
  // 用户的临时身份
  uuid_token: getUUID(),
};
const getters = {
  categoryView(state) {
    return state.detailList.categoryView || {};
  },
  skuInfo(state) {
    return state.detailList.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || [];
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
