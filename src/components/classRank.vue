<template>
  <div class="class-rank">
    <div class="rank-item" v-for="(item, index) in list" :key="item.classId">
      <div class="class-name clamp-1">{{index + 1}}.{{item.className}}</div>
      <div class="process-box">
        <div class="processer" :style="{width: `${item.rate * 100}%`}">{{item.rate * 100}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  }
}
</script>

<style lang="less" scoped>
.class-rank {
  background: #F5F8FF;
  border-radius: 16px;
  padding: 28px 32px;
  .rank-item {
    display: flex;
    align-items: center;
    margin-top: 34px;
    &:first-child {
      margin-top: 0
    }
    .class-name {
      width: 160px;
      font-size: 22px;
    }
    .process-box {
      height: 32px;
      flex-grow: 1;
      border-radius: 16px;
      background: rgba(49, 191, 255, 0.3);
      .processer {
        height: 32px;
        min-width: 40px;
        padding-right: 16px;
        border-radius: 16px;
        background: #31BFFF;
        font-size: 22px;
        line-height: 32px;
        color: #fff;
        text-align: right;
      }
    }
  }
}
</style>
