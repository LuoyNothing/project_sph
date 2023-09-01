import Home from "../pages/Home";
import Search from "../pages/Search";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddCartSuccess from "../pages/AddCartSuccess";
import ShopCart from "../pages/ShopCart";

export default [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { isShow: true },
  },
  {
    name: "search",
    path: "/search/:keyWord?",
    component: Search,
    meta: { isShow: true },
    // props在路由组件传递参数
    // props: true,
    // props对象写法：额外的给路由组件传递一些props
    // props: {
    //   a: 1,
    //   b: 2,
    // },
    // props的函数写法：可以传递query params props等
    // props: ($route) => ({
    //   q: $route.query,
    //   p: $route.params,
    //   a: 1,
    // }),
  },
  {
    path: "/detail/:goodsId",
    name: "detail",
    component: Detail,
    // 这是控制footer组件的显示与隐藏
    meta: { isShow: true },
  },
  {
    // 由于是展示是否成功加入购物车，所以不需要传递参数
    path: "/addCartSuccess",
    name: "addCartSuccess",
    component: AddCartSuccess,
    // 这是控制footer组件的显示与隐藏
    meta: { isShow: true },
  },
  {
    // 购物车组件
    path: "/shopCart",
    name: "shopCart",
    component: ShopCart,
    // 这是控制footer组件的显示与隐藏
    meta: { isShow: true },
  },
  {
    path: "/login",
    component: Login,
    meta: { isShow: false },
  },
  {
    path: "/register",
    component: Register,
    meta: { isShow: false },
  },
  {
    path: "*",
    redirect: "/home",
  },
];
