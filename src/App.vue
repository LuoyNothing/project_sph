<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Home,
  },
  mounted() {
    // 发送请求，获取数据，存储于仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
