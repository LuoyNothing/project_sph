// 所有的api接口进行统一管理,这里的requests==axios的实例对象
import requests from "@/api/request";
import mockRequests from "@/api/mockAjax";
// 三级联动组件发请求：/api/product/getBaseCategoryList get
export const reqCategoryList = () =>
  requests({
    method: "get",
    url: "/product/getBaseCategoryList",
  });

// 获取轮播图的mock数据
export const reqBannerList = () =>
  mockRequests({
    method: "get",
    url: "/banner",
  });
// 获取floor组件的mock数据
export const reqFloorList = () =>
  mockRequests({
    method: "get",
    url: "/floor",
  });
// 获取搜索页面的数据,post /list 必须带参数【哪怕是空对象】
export const reqSearchList = (params) =>
  requests({
    method: "post",
    url: "/list",
    data: params,
  });
// 获取详情页的数据，传递一个goodsId,/item/{ skuId }
export const reqDetailList = (goodsId) => requests.get(`/item/${goodsId}`);

// 将商品添加到购物车，或是修改商品的个数 /cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCar = (goodsId, goodsNum) =>
  requests({
    method: "post",
    url: `/cart/addToCart/${goodsId}/${goodsNum}`,
  });
// 获取购物车列表数据，/cart/cartList GET
export const reqShopCarList = () => requests.get("/cart/cartList");

// 删除购物车商品的接口，/cart/deleteCart/{skuId} DELETE
export const reqDeleteGoodsById = (goodsId) =>
  requests({
    method: "delete",
    url: `/cart/deleteCart/${goodsId}`,
  });
// 购物车：切换商品的状态/cart/checkCart/{skuID}/{isChecked} GET
export const reqGoodsState = (goodsId, isChecked) =>
  requests({
    method: "get",
    url: `/cart/checkCart/${goodsId}/${isChecked}`,
  });
// 注册：获取验证码接口 /api/user/passport/sendCode/{phone} get
export const reqRegisterCode = (phone) =>
  requests({
    method: "get",
    url: `/user/passport/sendCode/${phone}`,
  });
// 注册：点击注册，将信息保存到服务器中 /user/passport/register POST phone password code
export const reqUserRegister = (data) =>
  requests({
    method: "post",
    data,
    url: "/user/passport/register",
  });
// 登陆：用户登陆接口  /user/passport/login POST phone password
export const reqUserLogin = (data) =>
  requests({
    method: "post",
    data,
    url: "/user/passport/login",
  });
// 首页：用户登陆之后要展示用户信息 /user/passport/auth/getUserInfo
export const reqUserInfo = () =>
  requests({
    method: "get",
    url: "/user/passport/auth/getUserInfo",
  });
