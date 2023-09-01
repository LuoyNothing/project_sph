<template>
  <div>
    <TypeNav></TypeNav>
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 处理二三级列表 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 处理params参数 -->
            <li class="with-x" v-if="searchParams.keyWord">
              {{ searchParams.keyWord }}<i @click="removeKeyWord">×</i>
            </li>
            <!-- 处理品牌信息 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split("-")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 处理商品售卖属性【特殊-处理数组】 -->
            <li
              class="with-x"
              v-for="(attrlv, index) in searchParams.props"
              :key="index"
            >
              {{ attrlv.split(":")[1] }}<i @click="removeAttrProps(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector
          @tradeMarkInfo="tradeMarkInfo"
          @attrInfo="attrInfo"
        ></SearchSelector>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <!-- 排序 -->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 这一项的样式显示是根据order里的值来确定 -->
                <li :class="{ active: hasOne }" @click="changeOrder('1')">
                  <a>
                    综合
                    <!-- 表示升序↑，降序箭头↓ -->
                    <span
                      v-show="hasOne"
                      class="iconfont"
                      :class="{
                        'icon-arrowTop': isAsc,
                        'icon-arrowBottom': isDesc,
                      }"
                    >
                    </span>
                  </a>
                </li>
                <li :class="{ active: hasTwo }" @click="changeOrder('2')">
                  <a>
                    价格
                    <span
                      v-show="hasTwo"
                      class="iconfont"
                      :class="{
                        'icon-arrowTop': isAsc,
                        'icon-arrowBottom': isDesc,
                      }"
                    >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <!-- 产品图片 -->
                  <div class="p-img">
                    <!-- 跳转到detail组件，需要带产品的id -->
                    <router-link :to="`/detail/${goods.id}`"
                      ><img :src="goods.defaultImg"
                    /></router-link>
                  </div>
                  <!-- 产品价格 -->
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <!-- 产品title -->
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            :pageNum="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNum="getPageNum"
          ></Pagination>
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  props: ["keyWord"],
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        // header中搜索框的关键字
        keyWord: "",
        // 排序：比如价格排序，默认：综合-降序desc
        order: "1:asc",
        // 分页器：当前第几页
        pageNo: 1,
        // 每页展示多少数据
        pageSize: 10,
        // 平台售卖产品的属性
        props: [],
        // 选择的品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    // Object.assign() ES6中的语法，用于合并对象，这里值将后面两个参数值给第一个对象对应的key
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 当前只能发送一次请求
    this.getData();
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total: (state) => state.Search.searchList.total,
    }),
    // 排序中的样式操作
    hasOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    hasTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    // 排序中的升序降序样式操作
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
  },
  methods: {
    // 根据不同的参数来动态展示数据
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除面包屑操作
    removeCategoryName() {
      // 将名字置空就可以删除面包屑
      // this.searchParams.categoryName = "";
      // // 但是有其他ID残留，所以我们需要清空
      // this.searchParams.category1Id = "";
      // this.searchParams.category2Id = "";
      // this.searchParams.category3Id = "";
      // 对上面清空操作进行优化(节省宽带)：空字符串还是会将字段传给服务器，但是置为undefined就不会传字段了。
      this.searchParams.categoryName = undefined;
      // 但是有其他ID残留，所以我们需要清空
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 当删除面包屑就需要对展示的数据进行默认化
      // 【注】有多个面包屑，如果只删除一个，如果展示剩下面包屑的数据
      this.getData();

      // 地址也不能带参数，删除query参数
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removeKeyWord() {
      this.searchParams.keyWord = undefined;
      // 发送请求
      this.getData();
      // 通知header组件的搜索框清空内容，实现：兄弟通信（$bus）
      // 触发全局总线的自定义事件，第一个参数为自定义事件名，后面接传递参数
      this.$bus.$emit("clear");
      // 清除params参数
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 品牌加到面包屑上
    tradeMarkInfo(trademark) {
      // 整理参数发请求
      this.searchParams.trademark = `${trademark.tmId}-${trademark.tmName}`;
      // 发送请求
      this.getData();
    },
    // 删除面包屑-品牌
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 其他售卖属性的自定义事件回调：由searchselector子组件发过来的
    attrInfo(attr, vl) {
      // 判断当前props里有没有该数据，如果有则
      let attrItem = `${attr.attrId}:${vl}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(attrItem) === -1) {
        this.searchParams.props.push(attrItem);
        // 再次发送请求
        this.getData();
      }
    },
    removeAttrProps(index) {
      this.searchParams.props.splice(index, 1);
      // 重新发送请求
      this.getData();
    },
    // 排序的点击事件回调函数
    changeOrder(flag) {
      let originOrder = this.searchParams.order;
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      let newOrder = "";
      // 当点击的是当前页面的order，则修改顺便
      if (flag == originFlag) {
        newOrder = `${flag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 否则修改flag
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      // 发送请求
      this.getData();
    },
    // 搜索页-获取当前页数
    getPageNum(pageNum) {
      this.searchParams.pageNo = pageNum;
      // 发送请求
      this.getData();
    },
  },
  watch: {
    // 监听路由变换，在search页进行搜索就会发送一次请求
    $route(newValue, oldValue) {
      // 整理参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 发送请求
      this.getData();
      // 把一二三级的id清掉，因为不清掉，下次会有记录，没必要
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .selector {
      border: 1px solid #ddd;
      margin-bottom: 5px;
      overflow: hidden;
      .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;
        .key {
          padding-bottom: 87px !important;
        }
      }
      .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;
        .key {
          width: 100px;
          background: #f1f1f1;
          line-height: 26px;
          text-align: right;
          padding: 10px 10px 0 15px;
          float: left;
        }
        .value {
          overflow: hidden;
          padding: 10px 0 0 15px;
          color: #333;
          margin-left: 120px;
          padding-right: 90px;
          .logo-list {
            li {
              float: left;
              border: 1px solid #e4e4e4;
              margin: -1px -1px 0 0;
              width: 105px;
              height: 52px;
              text-align: center;
              line-height: 52px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
              color: #e1251b;
              font-style: italic;
              font-size: 14px;
              img {
                max-width: 100%;
                vertical-align: middle;
              }
            }
          }
          .type-list {
            li {
              float: left;
              display: block;
              margin-right: 30px;
              line-height: 26px;
              a {
                text-decoration: none;
                color: #666;
              }
            }
          }
        }
        .ext {
          position: absolute;
          top: 10px;
          right: 10px;
          .sui-btn {
            display: inline-block;
            padding: 2px 14px;
            box-sizing: border-box;
            margin-bottom: 0;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #d5d5d5;
          }
          a {
            color: #666;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
