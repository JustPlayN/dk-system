<template>
  <div class="class-rank">
    <div class="rank-item" v-for="(item, index) in list" :key="item.classId">
      <div class="class-name clamp-1">{{index + 1}}.{{item.className}}</div>
      <div class="process-box bad" v-if="item.rate < 0.6">
        <div class="processer" :style="{width: `${item.rate * 100}%`}">{{item.rate * 100}}%</div>
      </div>
      <div class="process-box pass" v-else-if="item.rate < 0.8">
        <div class="processer" :style="{width: `${item.rate * 100}%`}">{{item.rate * 100}}%</div>
      </div>
      <div class="process-box good" v-else-if="item.rate < 0.9">
        <div class="processer" :style="{width: `${item.rate * 100}%`}">{{item.rate * 100}}%</div>
      </div>
      <div class="process-box" v-else>
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
      background: rgba(13, 225, 140, .3);
      .processer {
        height: 32px;
        min-width: 40px;
        padding-right: 16px;
        border-radius: 16px;
        background: rgba(13, 225, 140, 1);
        font-size: 22px;
        line-height: 32px;
        color: #fff;
        text-align: right;
      }
      &.good {
        background: rgba(59, 131, 165, .3);
        .processer {
          background: #31BFFF;
        }
      }
      &.bad {
        background: rgba(255, 104, 137, .3);
        .processer {
          background: rgba(255, 104, 137, 1);
        }
      }
      &.pass {
        background: rgba(255, 191, 11, .3);
        .processer {
          background: rgba(255, 191, 11, 1);
        }
      }
    }
  }
}
</style>
