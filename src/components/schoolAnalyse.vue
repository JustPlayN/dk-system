<template>
  <div class="anaylse-item">
    <div class="top border-b">
      <img class="icon" :src="obj.iconUrl" />
      <div class="name-box">
        <div class="name">{{obj.name}}</div>
        <span class="desc" v-if="obj.desc">（{{obj.desc}}）</span>
      </div>
      <div class="average bad" v-if="obj.qualifiedPercent < 60">平均{{obj.average}}{{obj.unit}}</div>
      <div class="average pass" v-else-if="obj.qualifiedPercent < 80">平均{{obj.average}}{{obj.unit}}</div>
      <div class="average good" v-else-if="obj.qualifiedPercent < 90">平均{{obj.average}}{{obj.unit}}</div>
      <div class="average" v-else>平均{{obj.average}}{{obj.unit}}</div>
      <div class="tag bad" v-if="obj.qualifiedPercent < 60">不合格</div>
      <div class="tag pass" v-else-if="obj.qualifiedPercent < 80">合格</div>
      <div class="tag good" v-else-if="obj.qualifiedPercent < 90">良好</div>
      <div class="tag" v-else>优秀</div>
    </div>
    <div class="bottom">
      <div class="content">
        <div class="progress-box" v-if="obj.elId !== 'sg' && obj.elId !== 'tz' && obj.elId !== 'bmi'">
          <div class="p-desc">
            全校合格人数<span class="red">{{obj.qualifiedNum}}人</span>，
            合格率<span class="red">{{obj.qualifiedPercent}}%</span>
          </div>
          <div class="process bad" v-if="obj.qualifiedPercent < 60">
            <div class="processer" :style="{width: `${obj.qualifiedPercent}%`}" />
          </div>
          <div class="process pass" v-else-if="obj.qualifiedPercent < 80">
            <div class="processer" :style="{width: `${obj.qualifiedPercent}%`}" />
          </div>
          <div class="process good" v-else-if="obj.qualifiedPercent < 90">
            <div class="processer" :style="{width: `${obj.qualifiedPercent}%`}" />
          </div>
          <div class="process" v-else>
            <div class="processer" :style="{width: `${obj.qualifiedPercent}%`}" />
          </div>
        </div>
        <div class="sg-chart-box" v-else-if="obj.elId === 'bmi'">
          <class-line :obj="obj" />
        </div>
        <div class="sg-chart-box" v-else>
          <class-bar :obj="obj" />
        </div>
        <div class="desc">{{obj.remark}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import classBar from '@/components/classBar'
import classLine from '@/components/classLine'
export default {
  components: {
    classBar,
    classLine
  },
  props: {
    obj: Object
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.anaylse-item {
  background: #F5F8FF;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 16px;
  .top {
    display: flex;
    align-items: center;
    height: 76px;
    margin: 0 32px;
    .icon {
      width: 32px;
      height: 32px;
      margin-right: 16px;
    }
    .name-box {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }
    .name {
      font-size: 26px;
      line-height: 36px;
      padding-bottom: 9px;
      font-weight: bold;
    }
    .desc {
      font-size: 18px;
      padding-bottom: 6px;
      font-weight: normal;
    }
    .average {
      margin-right: 16px;
      font-size: 26px;
      padding-bottom: 4px;
      line-height: 40px;
      font-weight: bold;
      color: #0DE18C;
      &.good {
        color: #17AFF3;
      }
      &.bad {
        color: #FF6889;
      }
      &.pass {
        color: rgba(255, 191, 11, 1);
      }
    }
    .tag {
      height: 28px;
      padding: 2px 12px 4px;
      color: #fff;
      border-radius: 5px;
      background: #0DE18C;
      font-size: 18px;
      line-height: 20px;
      &.good {
        background: #38A8FF;
      }
      &.bad {
        background: #FF6889;
      }
      &.pass {
        background: rgba(255, 191, 11, 1);
      }
    }
  }
  .bottom {
    .content {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 0 32px;
    }
    .progress-box {
      flex-shrink: 0;
      width: 500px;
      height: 200px;
      padding-right: 30px;
      padding-top: 32px;
      .p-desc {
        font-size: 22px;
        line-height: 38px;
      }
      .red {
        color: #FF3E6D;
      }
      .process {
        height: 16px;
        margin-top: 16px;
        background: rgba(13, 225, 140, .3);
        border-radius: 16px;
        position: relative;
        .processer {
          height: 16px;
          background: rgba(13, 225, 140, 1);
          border-radius: 16px;
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
    .sg-chart-box {
      height: 278px;
    }
    .desc {
      margin-top: 16px;
      padding-left: 30px;
      font-size: 22px;
      line-height: 38px;
    }
  }
}
</style>
