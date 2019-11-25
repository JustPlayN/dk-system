<template>
  <div class="personal-anaylse-item">
    <div class="top border-b">
      <img class="icon" :src="obj.iconUrl" />
      <div class="name-box">
        <div class="name">{{obj.name}}</div>
        <div class="desc" v-if="obj.desc">（{{obj.desc}}）</div>
      </div>
      <div class="average bad" v-if="obj.segment === '需努力'">{{obj.value}}{{obj.unit}}</div>
      <div class="average pass" v-else-if="obj.segment === '合格'">{{obj.value}}{{obj.unit}}</div>
      <div class="average good" v-else-if="obj.segment === '良好'">{{obj.value}}{{obj.unit}}</div>
      <div class="average" v-else>{{obj.value}}{{obj.unit}}</div>
      <div class="tag bad" v-if="obj.segment === '需努力'">不合格</div>
      <div class="tag pass" v-else-if="obj.segment === '合格'">合格</div>
      <div class="tag good" v-else-if="obj.segment === '良好'">良好</div>
      <div class="tag" v-else>优秀</div>
    </div>
    <div class="bottom">
      <div class="content">
        <div class="left">
          <div class="tip">
            全班排名第<span class="red">{{obj.rank}}</span>名（班级平均<span class="red">{{obj.averageValue}}{{obj.unit}}</span>）
            <span v-if="obj.incNum">较上次测量</span>
            <span class="red" v-if="obj.incNum < 0">{{obj.incNum}}{{obj.unit}}</span>
            <span class="red" v-else-if="obj.incNum > 0">+{{obj.incNum}}{{obj.unit}}</span>
            <span v-if="obj.incNum === 0">与上次无差异</span>
          </div>
          <div class="info" v-if="obj.elId !== 'tz'">
            <div class="tp">
              <div class="tp-text" v-for="(r, index) in obj.range" :key="`range${index}`">{{r}}</div>
            </div>
            <div class="center">
              <div class="one">
                <img v-if="obj.segment === '需努力'" src="../assets/img/emojibhg.png" class="icon" />
                </div>
              <div class="two">
                <img v-if="obj.segment === '合格'" src="../assets/img/emojihg.png" class="icon" />
              </div>
              <div class="three">
                <img v-if="obj.segment === '良好'" src="../assets/img/emojilh.png" class="icon" />
              </div>
              <div class="four">
                <img v-if="obj.segment === '优秀'" src="../assets/img/emojiyx.png" class="icon" />
              </div>
            </div>
            <div class="btm">
              <div class="btm-text">需努力</div>
              <div class="btm-text">合格</div>
              <div class="btm-text">良好</div>
              <div class="btm-text">优秀</div>
            </div>
          </div>
          <div class="info tz-info" v-else>
            <div class="tp">
              <div class="tp-text" v-for="(r, index) in obj.range" :key="`range${index}`">{{r}}</div>
            </div>
            <div class="center">
              <div class="one">
                <img v-if="obj.segment === '需努力' && obj.value < obj.range[1]" src="../assets/img/emojibhg.png" class="icon" />
              </div>
              <div class="two">
                <img v-if="obj.segment === '合格' && obj.value < obj.range[2]" src="../assets/img/emojihg.png" class="icon" />
              </div>
              <div class="four">
                <img v-if="obj.segment === '优秀'" src="../assets/img/emojiyx.png" class="icon" />
              </div>
              <div class="two">
                <img v-if="obj.segment === '合格' && obj.value > obj.range[1]" src="../assets/img/emojihg.png" class="icon" />
              </div>
              <div class="one">
                <img v-if="obj.segment === '需努力' && obj.value > obj.range[2]" src="../assets/img/emojibhg.png" class="icon" />
              </div>
            </div>
            <div class="btm">
              <div class="btm-text">需努力</div>
              <div class="btm-text">合格</div>
              <div class="btm-text">优秀</div>
              <div class="btm-text">合格</div>
              <div class="btm-text">需努力</div>
            </div>
          </div>
        </div>
        <div class="desc">{{obj.remark}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: Object
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.personal-anaylse-item {
  background: #F5F8FF;
  border-radius: 24px;
  height: 300px;
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
      padding: 0 32px 32px;
    }
    .left {
      width: 500px;
      padding-right: 30px;
      flex-shrink: 0;
    }
    .tip {
      padding-top: 16px;
      font-size: 22px;
      line-height: 38px;
      .red {
        color: #FF3E6D;
      }
    }
    .info {
      .tp {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 66px 16px;
        font-size: 20px;
        color: #9197A3;
        .tp-text {
          width: 100px;
          text-align: center;
        }
      }
      .center {
        display: flex;
        justify-content: space-between;
        .one, .two, .three, .four {
          width: 111px;
          height: 8px;
          position: relative;
        }
        .one {
          background: #FF6889;
        }
        .two {
          background: #FFBF0B;
        }
        .three {
          background: #38A8FF;
        }
        .four {
          background: #0DE18C;
        }
        .icon {
          position: absolute;
          left: 38px;
          top: -15px;
          width: 36px;
          height: 36px;
        }
      }
      .btm {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        font-size: 20px;
        color: #9197A3;
        .btm-text {
          width: 148px;
          text-align: center;
        }
      }
    }
    .tz-info {
      .tp {
        padding: 16px 44px;
      }
      .center {
        .one, .two, .three, .four {
          width: 88px;
        }
        .icon {
          left: 26px;
        }
      }
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
