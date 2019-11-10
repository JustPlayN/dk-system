<template>
  <div class="circle">
    <div class="c-box">
      <div class="score">本次{{obj.score}}分</div>
      <div class="pre-score">上次{{obj.preScore}}分</div>
      <div class="c-one" :style="`transform: rotate(${-225 + 4.5 * obj.score}deg);`">
        <div class="c-two" :style="`transform: rotate(${4.5 * (obj.preScore - obj.score)}deg);`"></div>
      </div>
    </div>
    <div class="c-name">总体测试对比扇形图</div>
    <div class="c-tips">注：总分由各单项分数之和组成，满分40分</div>
    <div class="c-btm">
      <img :src="obj.segmentUrl" class="icon" />
      <div class="right" v-if="obj.segment === '优秀'">
        本次测量综合得分{{obj.score}}，{{obj.segment}}，超过了全班{{obj.percent}}%的同学，继续保持哦！
      </div>
      <div class="right" v-else>
        本次测量综合得分{{obj.score}}，{{obj.segment}}，超过了全班{{obj.percent}}%的同学，需要继续努力哦！
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: Object
  }
}
</script>

<style lang="less" scoped>
.circle {
  background: #fff;
  border-radius: 24px;
  padding: 32px;
  width: 530px;
  background: #F5F8FF;
  .c-box {
    display: flex;
    justify-content: center;
    margin-top: 78px;
    height: 266px;
    overflow: hidden;
    padding-top: 78px;
    background: url(https://www.edolphin.cn/img/circlebg.png) center /contain no-repeat;
    position: relative;
    .score,
    .pre-score {
      position: absolute;
      top: 82px;
      z-index: 10;
      left: 260px;
      width: 102px;
      text-align: center;
      font-size: 20px;
    }
    .pre-score {
      top: 124px;
    }
    .c-one {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 374px;
      width: 374px;
      border-radius: 50%;
      border: 36px solid #31BFFF;
      border-color: #31BFFF #31BFFF rgba(49, 191, 255, 0.1) rgba(49, 191, 255, 0.1);
      transform: rotate(-225deg);
    }
    .c-two {
      height: 290px;
      width: 290px;
      border-radius: 50%;
      border: 36px solid #31BFFF;
      border-color: #E8EBF3 #E8EBF3 rgba(232, 235, 243, 0.3) rgba(232, 235, 243, 0.3);
    }
  }
  .c-name {
    margin-top: 26px;
    text-align: center;
  }
  .c-tips {
    margin-top: 8px;
    color: #9197A3;
    text-align: center;
  }
  .c-btm {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 32px;
    .icon {
      width: 80px;
      height: 80px;
      margin-right: 24px;
      flex-shrink: 0;
    }
    .right {
      font-size: 28px;
      line-height: 40px;
      color: #9197A3;
    }
  }
}
</style>
