import Vue from "vue";
import App from "./App.vue";
// 引入mock来模拟假数据
import "@/mock/mockServe";
Vue.config.productionTip = false;
// 引入路由
import router from "./router";
// 注册仓库
import store from "./store";
// 注册全局组件：三级联动组件、轮播图组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 参数1：组件名字，参数2：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

// 引入swiper样式：用于实现轮播图
import "swiper/css/swiper.css";

new Vue({
  // 注册路由：组件身上会有$route, $router
  router,
  // 注册仓库，组件实例上会有个$store属性
  store,
  // 注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
}).$mount("#app");
