import Vue from "vue";
import Vuex from "vuex";
// vuex是个对象，对象上有个store方法（是个构造函数）
Vue.use(Vuex);
import Home from "./Home";
import Search from "./Search";
import Detail from "./Detail";
import shopCart from "./shopCar";
import user from "./user";

export default new Vuex.Store({
  modules: {
    Home,
    Search,
    Detail,
    shopCart,
    user,
  },
});
