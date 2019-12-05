<template>
  <div class="class-download">
    <div id="download">
      <div class="pdf-card">
        <div class="pdf-header">
          <div class="left">
            <div class="title">享智云幼儿体质测评报告</div>
            <div class="title-text">我们将针对不同年龄段的孩子提供定制化的精准体质测试，该测试目前主要包含8大项，此外我们 <br>还为您的孩子提供了科学的训练方案。</div>
          </div>
          <img class="logo" src="../assets/img/logo.png" />
        </div>
        <div class="school-title">杭州舒小幼儿园</div>
        <div class="school-info">
          <div class="name">班级：</div>
          <div class="desc">第一幼儿园</div>
          <div class="name">测试时间：</div>
          <div class="desc">{{1575297748511 | formatDate('YYYY/MM/DD')}}</div>
        </div>
        <div class="content">
          <div class="top">
            <class-pie />
            <class-radar />
          </div>
          <div class="remark">冯绍峰水电费水电费水电费就是大幅减少冯绍峰水电费水电费水电费就是大幅减少冯绍峰水电费水电费水电费就是大幅减少冯绍峰水电费水电费水电费就是大幅减少冯绍峰水电费水电费水电费就是大幅减少</div>
          <div class="sub-title">单项分析</div>
          <analyse-item v-if="analyseList.length > 0" :obj="analyseList[0]" />
        </div>
      </div>
      <div class="pdf-card analyse-card">
        <div class="text-card">本班参评幼儿18人，其中男生11人，占比本班参评幼儿18人，其中男生11人，占比本班参评幼儿18人，其中男生11人，占比其中男生11人，占比本班参评幼儿18人，其中男生11人，占比其中男生11人，占比本班参评幼儿18人，其中男生11人，占比</div>
        <template v-for="(item, index) in analyseList">
          <analyse-item  :key="item.elId" :obj="item" v-if="index > 0 && index < 4" />
        </template>
      </div>
      <div class="pdf-card analyse-card">
        <template v-for="(item, index) in analyseList">
          <analyse-item  :key="item.elId" :obj="item" v-if="index > 4" />
        </template>
      </div>
      <div class="pdf-card sugegest-card">
        <div class="sub-title">方案建议</div>
        <suggestion :list="suggestionData" />
      </div>
      <div class="pdf-card table-card">
        <div class="top">
          <div class="sub-title">附表</div>
          <class-table />
        </div>
        <div class="bottom">
          <img class="wx-code" src="../assets/wxcod.jpg" />
          <div class="center">
            <div class="c-name">扫码关注小程序</div>
            <div class="c-desc">获取电子报告和更多优质课程</div>
          </div>
          <div class="right">
            <img class="logo" src="../assets/img/logo.png" />
            <div class="r-name">技术支持：享智云</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import classPie from '@/components/classPie'
import classRadar from '@/components/classRadar'
import analyseItem from '@/components/classAnalyse'
import suggestion from '@/components/suggestion'
import classTable from '@/components/classTable'
export default {
  components: {
    classPie,
    classRadar,
    analyseItem,
    suggestion,
    classTable
  },
  data () {
    return {
      suggestionData: [
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
        { id: '7' },
        { id: '8' },
      ],
      analyseList: [{
        iconUrl: 'https://www.edolphin.cn/img/sg.png',
        name: '身高',
        desc: '',
        average: 10,
        unit: 'cm',
        elId: 'bmi'
      }, {
        iconUrl: 'https://www.edolphin.cn/img/sg.png',
        name: '身高',
        desc: '',
        average: 10,
        unit: 'cm',
        elId: 'sg'
      },
      {
        iconUrl: 'https://www.edolphin.cn/img/tz.png',
        name: '体重',
        desc: '',
        average: 12,
        unit: 'kg',
        elId: 'tz'
      },
      {
        iconUrl: 'https://www.edolphin.cn/img/phm.png',
        name: '平衡力',
        desc: '走平衡木',
        average: 12,
        unit: 's',
        elId: 'phm'
      },
      {
        qualifiedNum: 10,
        qualifiedPercent: 20,
        iconUrl: 'https://www.edolphin.cn/img/xtx.png',
        name: '协调性',
        desc: '双脚连续跳',
        average: 12,
        unit: 's',
        elId: 'xtx'
      },
      {
        iconUrl: 'https://www.edolphin.cn/img/wq.png',
        name: '上肢力量',
        desc: '网球掷远',
        average: 12,
        unit: 'm',
        elId: 'wq'
      },
      {
        iconUrl: 'https://www.edolphin.cn/img/tiao.png',
        name: '下肢力量',
        desc: '立定跳远',
        average: 12,
        unit: 'cm',
        elId: 'tiao'
      },
      {
        iconUrl: 'https://www.edolphin.cn/img/rrx.png',
        name: '柔韧性',
        desc: '坐位体前屈',
        average: 12,
        unit: 'cm',
        elId: 'rrx'
      },
      {
        iconUrl: 'https://www.edolphin.cn/img/wfp.png',
        name: '灵敏性',
        desc: '十米折返跑',
        average: 12,
        unit: 's',
        elId: 'wfp'
      }]
    }
  },
}
</script>

<style lang="less" scoped>
.class-download {
  width: 1190px;
}
.pdf-card {
  width: 1190px;
  height: 1684px;
  color: #484D57;
  background: #fff;
  border: 1px solid red;
  .content {
    padding: 40px 48px;
    .top {
      display: flex;
      flex-wrap: wrap;
      background: #F5F8FF;
      border-radius: 16px 16px 0 16px;
      overflow: hidden;
    }
    .remark {
      padding: 32px 28px;
      font-size: 22px;
      line-height: 38px;
      border-radius: 16px 0 16px 16px;
      background: #F5F8FF;
    }
    .sub-title {
      margin-bottom: 16px;
    }
  }
  .sub-title {
    margin-top: 40px;
    font-size: 28xp;
    line-height: 40px;
    font-weight: bold;
    color: #17AFF3;
  }
}
.analyse-card {
  padding: 48px;
  .text-card {
    padding: 24px 28px;
    margin-bottom: 16px;
    font-size: 22px;
    line-height: 38px;
    border-radius: 16px;
    background: #F5F8FF;
  }
}
.sugegest-card {
  padding: 1px 48px;
}
.table-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    padding: 0 48px;
  }
  .bottom {
    display: flex;
    align-items: center;
    height: 176px;
    background: #31BFFF;
    color: #fff;
    padding: 0 32px 0 48px;
    .wx-code {
      width: 114px;
      height: 114px;
      margin-right: 22px;
    }
    .center {
      flex-grow: 1;
      .c-name {
        font-size: 26px;
        line-height: 38px;
      }
      .c-desc {
        font-size: 22px;
        line-height: 30px;
        margin-top: 8px;
        color: rgba(255, 255, 255, .8);
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      .logo {
        width: 88px;
        height: 88px;
      }
      .r-name {
        margin-top: 16px;
        font-size: 14px;
        line-height: 18px;
        color: rgba(255, 255, 255, .8);
      }
    }
  }
}
.pdf-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 48px;
  background: #31BFFF;
  color: #fff;
  .title {
    font-size: 36px;
    line-height: 50px;
  }
  .title-text {
    margin-top: 16px;
    font-size: 20px;
    line-height: 28px;
  }
  .logo {
    width: 112px;
    height: 112px;
    flex-shrink: 0;
  }
}
.school-title {
  display: flex;
  align-items: center;
  margin: 48px 48px 0;
  font-size: 32px;
  line-height: 44px;
  color: #17AFF3;
}
.school-info {
  display: flex;
  align-items: center;
  margin: 24px 48px 0;
  font-size: 22px;
  line-height: 32px;
  .name {
    color: #9197A3;
  }
  .desc {
    margin-right: 48px;
  }
}
</style>
