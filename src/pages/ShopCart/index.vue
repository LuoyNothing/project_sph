<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(shopCar, index) in carInfoList"
          :key="shopCar.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="shopCar.isChecked == 1"
              @change="changeChecked(shopCar, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="shopCar.imgUrl" />
            <div class="item-msg">
              {{ shopCar.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ shopCar.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, shopCar)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="shopCar.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, shopCar)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, shopCar)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ shopCar.skuPrice * shopCar.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoodsById(shopCar)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 长度>0表示必须有商品，没有商品则不全选 -->
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && carInfoList.length > 0"
          @change="updateAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  // 组件一挂载就开始发情求
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getShopCarList");
    },
    // 用于处理购物车中商品数量的增加减少等操作
    // 如果用户操作过快，可能出现0或负数的情况，这是因为服务器未能及时返回数据的后果
    // 为了解决这个问题，这里采用节流操作
    handler: throttle(async function (type, updateNum, shopCar) {
      // type 用于区分操作：加1 减1 输入数量
      switch (type) {
        case "add":
          updateNum = 1;
          break;
        case "minus":
          updateNum = shopCar.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 处理输出的是特殊字符
          if (isNaN(updateNum) || updateNum < 1) {
            updateNum = 0;
          } else {
            updateNum = parseInt(updateNum) - shopCar.skuNum;
          }
          break;
      }
      // 继续发送请求
      try {
        await this.$store.dispatch("getAddShopCartState", {
          goodsId: shopCar.skuId,
          goodsNum: updateNum,
        });
        this.getData();
      } catch (error) {}
    }, 1000),
    // 用于删除购物车中的某个商品
    async deleteGoodsById(shopCar) {
      // 删除购物车中的某个商品
      try {
        await this.$store.dispatch("deleteGoodsById", shopCar.skuId);
        // 发送请求获取购物车数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 修改商品选中状态
    async changeChecked(shopCar, event) {
      try {
        let isChecked = event.target.checked ? 1 : 0;
        await this.$store.dispatch("GoodsState", {
          goodsId: shopCar.skuId,
          isChecked,
        });
        // 重新发送请求，获取购物车的商品列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除选中的所有商品【需要学习一下的，采用了Promise.all】
    async deleteAllGoods() {
      try {
        await this.$store.dispatch("deleteAllCheckedGoods");
        // 如果成功再获取购物车的商品列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 全选按钮的操作
    async updateAllChecked($event) {
      try {
        let isChecked = $event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateAllIsChecked", isChecked);
        // 获取购物车列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["shopCarList"]),
    // 购物车的商品数据
    carInfoList() {
      return this.shopCarList.cartInfoList || [];
    },
    // 购物车的总价
    totalPrice() {
      let sum = 0;
      this.carInfoList.forEach((goods) => {
        sum += goods.skuPrice * goods.skuNum;
      });
      return sum;
    },
    // 是否全选
    isAllChecked() {
      // 当商品前面全选，则全选，有一个取消选择则不全选
      return this.carInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
