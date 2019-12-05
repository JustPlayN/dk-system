<template>
  <div class="class-table">
    <div class="table-title border-b">
      <div class="item-60">序号</div>
      <div class="item-60">姓名</div>
      <div class="item-60">年龄</div>
      <div class="item-60">性别</div>
      <div class="item-60">身高</div>
      <div class="item-60">体重</div>
      <div class="item-96">10m折返跑<br>(灵敏性/s)</div>
      <div class="item-96">立定跳远<br>(下肢力量/cm)</div>
      <div class="item-96">网球掷远<br>(上肢力量/m)</div>
      <div class="item-96">双脚连续跳<br>(上协调性/s)</div>
      <div class="item-96">坐位体前屈<br>(柔韧性/cm)</div>
      <div class="item-96">走平衡木<br>(平衡力/s)</div>
    </div>
    <div class="table-tr border-b" v-for="item in 27" :key="item">
      <div class="item-60">{{item}}</div>
      <div class="item-60">2</div>
      <div class="item-60">3</div>
      <div class="item-60">男</div>
      <div class="item-60">122</div>
      <div class="item-60">64</div>
      <div class="item-96">10</div>
      <div class="item-96">120</div>
      <div class="item-96">50</div>
      <div class="item-96">22</div>
      <div class="item-96">12</div>
      <div class="item-96">10</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
}
</script>

<style lang="less" scoped>
.class-table {
  .table-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 68px;
    background: #F5F8FF;
    font-size: 14px;
    line-height: 18px;
  }
  .item-60 {
    flex-shrink: 0;
    width: 60px;
  }
  .item-96 {
    flex-shrink: 0;
    width: 96px;
  }
  .table-tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    height: 48px;
    background: #EBF1FF;
    font-size: 14px;
    line-height: 18px;
    &:nth-of-type(2n + 1) {
      background: #F5F8FF;
    }
  }
}
</style>
