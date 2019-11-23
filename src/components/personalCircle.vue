<template>
  <div class="circle">
    <div class="c-box">
      <div class="score">本次{{obj.score}}分</div>
      <div class="pre-score">上次{{obj.preScore}}分</div>
      <div class="c-one" :style="`transform: rotate(${obj.deg - 45}deg);`">
        <div class="c-two" :style="`transform: rotate(${obj.preDeg}deg);`"></div>
      </div>
    </div>
    <div class="c-name">总体测试对比扇形图</div>
    <div class="c-tips">注：总分由各单项分数之和组成，满分40分</div>
    <div class="c-btm">
      <img v-if="obj.segment === '优秀'" src="../assets/img/scoreyx.png" class="icon" />
      <img v-else-if="obj.segment === '合格'" src="../assets/img/scorehg.png" class="icon" />
      <img v-else-if="obj.segment === '良好'" src="../assets/img/scorelh.png" class="icon" />
      <img v-else src="../assets/img/scorebhg.png" class="icon" />
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
  border-radius: 24px;
  padding: 32px;
  width: 530px;
  height: 722px;
  background: #F5F8FF url(../assets/bgd.png) no-repeat;
  background-size: 532px 254px;
  background-position: bottom right;
  .c-box {
    display: flex;
    justify-content: center;
    height: 220px;
    overflow: hidden;
    padding-top: 73px;
    padding-right: 2px;
    background: url(../assets/img/circlebg.png) bottom /contain no-repeat;
    position: relative;
    .score,
    .pre-score {
      position: absolute;
      top: 80px;
      z-index: 10;
      left: 182px;
      width: 102px;
      text-align: center;
      font-size: 20px;
    }
    .pre-score {
      top: 120px;
    }
    .c-one {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 288px;
      width: 288px;
      border-radius: 50%;
      border: 36px solid #31BFFF;
      border-color: rgba(49, 191, 255, 0.1) rgba(49, 191, 255, 0.1) #31BFFF #31BFFF;
      transform: rotate(-225deg);
    }
    .c-two {
      height: 210px;
      width: 210px;
      border-radius: 50%;
      border: 36px solid #31BFFF;
      border-color:rgba(232, 235, 243, 0.3) rgba(232, 235, 243, 0.3) #E8EBF3 #E8EBF3;
    }
  }
  .c-name {
    font-size: 16px;
    margin-top: 16px;
    text-align: center;
  }
  .c-tips {
    font-size: 16px;
    margin-top: 4px;
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
      font-size: 22px;
      line-height: 38px;
      color: #9197A3;
    }
  }
}
</style>
