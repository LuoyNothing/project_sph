<template>
  <div class="pagination">
    <button :disabled="pageNum == 1" @click="$emit('getPageNum', pageNum - 1)">
      上一页
    </button>
    <button
      v-if="startAndEndIndex.start > 1"
      @click="$emit('getPageNum', 1)"
      :class="{ active: pageNum == 1 }"
    >
      1
    </button>
    <button v-if="startAndEndIndex.start > 2">···</button>

    <button
      v-for="(page, index) in startAndEndIndex.end"
      :key="index"
      v-if="page >= startAndEndIndex.start"
      @click="$emit('getPageNum', page)"
      :class="{ active: pageNum == page }"
    >
      {{ page }}
    </button>

    <button v-if="startAndEndIndex.end < pageTotal - 1">···</button>
    <button
      v-if="startAndEndIndex.end < pageTotal"
      @click="$emit('getPageNum', pageTotal)"
      :class="{ active: pageNum == pageTotal }"
    >
      {{ pageTotal }}
    </button>
    <button
      :disabled="pageNum == pageTotal"
      @click="$emit('getPageNum', pageNum + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // 分别为：当前页码、每页放多少数据、一共多少数据、几个连续
  props: ["pageNum", "pageSize", "total", "continues"],
  computed: {
    // 计算一共有多少页
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页码的开始和结束索引，连续为5
    startAndEndIndex() {
      let start = 0;
      let end = 0;
      // 当页面不足5页时
      if (this.continues > this.pageTotal) {
        start = 1;
        end = this.pageTotal;
      } else {
        // 正常情况的处理
        let index = Math.floor(this.continues / 2);
        start = this.pageNum - index;
        end = this.pageNum + index;
        // 当前页为1、2的处理方式
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // 当前页为倒数1、2的处理方式
        if (end > this.pageTotal) {
          end = this.pageTotal;
          start = end - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style scoped lang="less">
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e1251b;
      color: #fff;
    }
  }
}
</style>
