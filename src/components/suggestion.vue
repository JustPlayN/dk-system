<template>
  <div class="suggestion">
    <div v-for="item in list" :key="item.id">
      <div class="suggest-item" v-if="obj[item.id]">
        <div class="top border-b">
          <img class="icon" :src="obj[item.id].iconUrl" crossOrigin='anonymous' />
          <div class="title">{{obj[item.id].name}}</div>
        </div>
        <div class="tips">相关训练</div>
        <div class="tag-box">
          <div class="tag" v-for="(tag, index) in obj[item.id].desc" :key="`tag${index}`">
            <div class="text">{{tag}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-if="list.length === 0">
      <img :src="suggestEmpty" class="empty-img" />
      <div class="empty-desc">
        恭喜！您的孩子所有项目表现均处于良好/优秀<br>
        暂无具体改进方案，继续巩固身体锻炼吧
      </div>
    </div>
  </div>
</template>

<script>
import wfp from '../assets/img/wfp.png'
import tiao from '../assets/img/tiao.png'
import wq from '../assets/img/wq.png'
import xtx from '../assets/img/xtx.png'
import rrx from '../assets/img/rrx.png'
import phm from '../assets/img/phm.png'
import suggestEmpty from '../assets/img/suggestEmpty.png'
export default {
  props: {
    list: Array
  },
  data () {
    return {
      suggestEmpty,
      obj: {
        3: {
          iconUrl: wfp,
          name: '十米折返跑（灵敏性）',
          desc: ['前滑步', '侧滑步', '原地拍球']
        },
        4: {
          iconUrl: tiao,
          name: '立定跳远（下肢力量）',
          desc: ['单脚跳', '前跨跳', '踢球']
        },
        5: {
          iconUrl: wq,
          name: '网球掷远（上肢力量）',
          desc: ['原地拍球', '双手接球', '地滚球']
        },
        6: {
          iconUrl: xtx,
          name: '双脚连续跳（协调性）',
          desc: ['单脚跳', '前滑步']
        },
        7: {
          iconUrl: rrx,
          name: '坐位体前屈（柔韧性）',
          desc: ['侧滑步']
        },
        8: {
          iconUrl: phm,
          name: '走平衡木（平衡力）',
          desc: ['单脚跳', '前滑步', '侧滑步']
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.suggestion {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.suggest-item {
  padding: 0 24px 16px;
  width: 532px;
  margin-top: 16px;
  background: #F5F8FF;
  border-radius: 16px;
  .top {
    display: flex;
    align-items: center;
    height: 76px;
  }
  .icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    margin-right: 16px;
  }
  .title {
    font-size: 26px;
    line-height: 36px;
  }
  .tips {
    margin-top: 22px;
    font-size: 22px;
    line-height: 32px;
    color: #9197A3;
  }
  .tag-box {
    display: flex;
    flex-wrap: wrap;
    .tag {
      height: 48px;
      padding: 0 24px;
      margin: 16px 16px 0 0 ;
      background: #31BFFF;
      border-radius: 24px;
      line-height: 42px;
      font-size: 18px;
      color: #fff;
    }
  }
}
.empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 120px 32px 0;
  width: 100%;
  .empty-img {
    width: 160px;
    height: 160px;
  }
  .empty-desc {
    margin-top: 32px;
    font-size: 28px;
    line-height: 40px;
    text-align: center;
    color: #9197A3;
  }
}
</style>
