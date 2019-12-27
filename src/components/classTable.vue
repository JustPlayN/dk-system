<template>
  <div class="class-table">
    <div class="table-title border-b">
      <div class="item-60">序号</div>
      <div class="item-60">姓名</div>
      <div class="item-60">年龄</div>
      <div class="item-60">性别</div>
      <div class="item-60">成绩</div>
      <div class="item-60">评估</div>
      <div class="item-60">身高<br>(cm)</div>
      <div class="item-60">体重<br>(kg)</div>
      <div class="item-96">10m折返跑<br>(灵敏性/s)</div>
      <div class="item-96">立定跳远<br>(下肢力量/cm)</div>
      <div class="item-96">网球掷远<br>(上肢力量/m)</div>
      <div class="item-96">双脚连续跳<br>(上协调性/s)</div>
      <div class="item-96">坐位体前屈<br>(柔韧性/cm)</div>
      <div class="item-96">走平衡木<br>(平衡力/s)</div>
    </div>
    <div class="table-tr border-b" v-for="(item, num) in list" :key="`record${num}`">
      <div class="item-60">{{num + 27 * (index - 1) + 1}}</div>
      <div class="item-60">{{item.studentName}}</div>
      <div class="item-60">{{item.age}}</div>
      <div class="item-60">{{item.sex}}</div>
      <div class="item-60">{{item.score}}</div>
      <div class="item-60">{{item.level}}</div>
      <div class="item-60">{{item.height}}</div>
      <div class="item-60">{{item.weight}}</div>
      <div class="item-96">{{item.shuttleRun}}</div>
      <div class="item-96">{{item.standJump}}</div>
      <div class="item-96">{{item.tennisAway}}</div>
      <div class="item-96">{{item.bothLegsJump}}</div>
      <div class="item-96">{{item.sitBend}}</div>
      <div class="item-96">{{item.balanceBean}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
    index: {      // 第index张表
      type: Number,
      default: 1
    }
  }
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
