import { reqShopCarList, reqDeleteGoodsById, reqGoodsState } from "@/api";
const actions = {
  async getShopCarList({ commit }) {
    let res = await reqShopCarList();
    if (res.code === 200) {
      commit("GETSHOPCARLIST", res.data);
    }
  },
  // 删除购物车中的某个商品
  async deleteGoodsById({ commit }, goodsId) {
    let res = await reqDeleteGoodsById(goodsId);
    // 删除商品成功
    if (res.code === 200) {
      return "delete ok";
    } else {
      // 删除失败，返回失败的标记
      return Promise.reject(new Error("Fail"));
    }
  },
  // 切换商品中的选中状态
  async GoodsState({ commit }, { goodsId, isChecked }) {
    let res = await reqGoodsState(goodsId, isChecked);
    if (res.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("Fail"));
    }
  },
  // 删除所有选中的商品
  deleteAllCheckedGoods({ dispatch, getters }) {
    let promiseAll = [];
    // 遍历购物车中所有的商品
    getters.shopCarList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteGoodsById", item.skuId) : "";
      promiseAll.push(promise);
    });
    // 使用Promise.all方法判断成功与失败
    return Promise.all(promiseAll);
  },
  // 操作全选按钮
  updateAllIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.shopCarList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("GoodsState", { goodsId: item.skuId, isChecked });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const mutations = {
  GETSHOPCARLIST(state, shopCarList) {
    state.shopCarList = shopCarList;
  },
};
const state = {
  shopCarList: [],
};
const getters = {
  shopCarList(state) {
    return state.shopCarList[0] || {};
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
