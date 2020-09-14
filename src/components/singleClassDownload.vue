<template>
  <div>
    <div class="class-download">
      <div id="download">
        <div class="pdf-card">
          <div class="pdf-header">
            <div class="left">
              <div class="title">国民体质健康幼儿体质测试报告</div>
              <div class="title-text">{{obj.basicDto.title}}</div>
            </div>
            <img class="logo" src="../assets/img/logo.png" />
          </div>
          <div class="school-title">{{obj.basicDto.schoolName}}</div>
          <div class="school-info">
            <div class="name">班级：</div>
            <div class="desc">{{obj.basicDto.className}}</div>
            <div class="name">测试时间：</div>
            <div class="desc">{{obj.basicDto.testTime}}</div>
            <div class="name">学生总数：</div>
            <div class="desc">{{obj.basicDto.studentNum}}人</div>
          </div>
          <div class="content">
            <div class="top">
              <class-pie v-if="classPieData.length > 0" :list="classPieData" />
              <class-radar v-if="classRadarData.length > 0" :list="classRadarData" />
            </div>
            <div class="remark">{{obj.basicDto.summary}}</div>
            <div class="sub-title">单项分析</div>
            <analyse-item v-if="analyseList.length > 0" :obj="analyseList[0]" />
          </div>
        </div>
        <div class="pdf-card analyse-card">
          <div class="text-card" v-if="bmiExplain">{{bmiExplain}}</div>
          <template v-for="item in analyseList.slice(1, 5)">
            <analyse-item  :key="item.elId" :obj="item" />
          </template>
        </div>
        <div class="pdf-card analyse-card">
          <template v-for="item in analyseList.slice(5, 9)">
            <analyse-item  :key="item.elId" :obj="item" />
          </template>
          <template v-if="suggestionData.length > 0 && suggestionData.length < 3">
            <div class="sub-title">方案建议</div>
            <suggestion :list="suggestionData" />
          </template>
        </div>
        <div class="pdf-card sugegest-card" v-if="suggestionData.length > 2">
          <div class="sub-title">方案建议</div>
          <suggestion :list="suggestionData" />
        </div>
        <div class="pdf-card table-card">
          <div class="top">
            <div class="sub-title">附表</div>
            <class-table :list="recordList.slice(0, 27)" />
          </div>
          <div class="bottom" v-if="recordList.length < 28">
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
        <div class="pdf-card table-card" v-if="recordList.length > 27">
          <div class="top">
            <div class="sub-title">附表</div>
            <class-table :list="recordList.slice(27, 54)" :index="2" />
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
    <div id="donwloadCanvas"></div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import classPie from '@/components/classPie'
import classRadar from '@/components/classRadar'
import analyseItem from '@/components/classAnalyse'
import suggestion from '@/components/suggestion'
import classTable from '@/components/classTable'

// 图片
import sg from '../assets/img/sg.png'
import tz from '../assets/img/tz.png'
import wfp from '../assets/img/wfp.png'
import tiao from '../assets/img/tiao.png'
import wq from '../assets/img/wq.png'
import xtx from '../assets/img/xtx.png'
import rrx from '../assets/img/rrx.png'
import phm from '../assets/img/phm.png'
export default {
  props: {
    obj: Object
  },
  components: {
    classPie,
    classRadar,
    analyseItem,
    suggestion,
    classTable
  },
  data () {
    return {
      classPieData: [],
      classRadarData: [],
      bmiExplain: '',
      suggestionData: [],
      analyseList: [],
      recordList: [],
      canvas: null
    }
  },
  methods: {
    drawCanvas () {
      html2canvas(document.getElementById('download')).then(res => {
        this.canvas = res
        document.getElementById('donwloadCanvas').appendChild(res)
        this.$emit('painted')
      })
    },
    downloadPdf () {
      if (!this.canvas) {
        return
      }
      let contentWidth = this.canvas.width
      let contentHeight = this.canvas.height
      let pageHeight = contentWidth / 594 * 841.89
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = 595.28
      let imgHeight = 595/contentWidth * contentHeight
      let pageData = this.canvas.toDataURL('image/jpeg', 1.0)
      let pdf = new JsPDF('', 'pt', 'a4')
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          if (leftHeight > 0) {
            pdf.addPage()
          }
        }
      }
      setTimeout(() => {
        pdf.save(`${this.obj.basicDto.className}.pdf`)
        this.$emit('download')
      }, 400)
    },
  },
  created () {
    this.classPieData = [
      { value: this.obj.basicDto.excellentNum, name: '优秀' },
      { value: this.obj.basicDto.goodNum, name: '良好' },
      { value: this.obj.basicDto.qualifiedNum, name: '合格' },
      { value: this.obj.basicDto.unQualifiedNum, name: '不合格' }
    ]
    this.classRadarData = [
      {
        value: [
          this.obj.basicDto.classAverageBalance,
          this.obj.basicDto.classAverageSensitivity,
          this.obj.basicDto.classAverageWeight,
          this.obj.basicDto.classAverageLegStrength,
          this.obj.basicDto.classAverageLimbStrength,
          this.obj.basicDto.classAverageHarmony,
          this.obj.basicDto.classAverageHeight,
          this.obj.basicDto.classAverageFlex
        ],
        name: '班级平均'
      },
      {
        value: [
          this.obj.basicDto.schoolAverageBalance,
          this.obj.basicDto.schoolAverageSensitivity,
          this.obj.basicDto.schoolAverageWeight,
          this.obj.basicDto.schoolAverageLegStrength,
          this.obj.basicDto.schoolAverageLimbStrength,
          this.obj.basicDto.schoolAverageHarmony,
          this.obj.basicDto.schoolAverageHeight,
          this.obj.basicDto.schoolAverageFlex
        ],
        name: '园所平均'
      }
    ]
    this.bmiExplain = this.obj.eachDto.bmi.remark
    this.analyseList = [
      {
        ...this.obj.eachDto.bmi,
        average: this.obj.eachDto.bmi.average,
        iconUrl: sg,
        name: '身体形态-BMI分布',
        desc: '',
        unit: 'kg/m²',
        elId: 'bmi',
        remark: this.obj.eachDto.bmi.bmiExplain,
      },
      {
        ...this.obj.eachDto.heightDto,
        average: this.obj.eachDto.heightDto.averageHeight,
        iconUrl: sg,
        name: '身高',
        desc: '',
        unit: 'cm',
        elId: 'sg'
      },
      {
        ...this.obj.eachDto.weightDto,
        average: this.obj.eachDto.weightDto.averageWeight,
        iconUrl: tz,
        name: '体重',
        desc: '',
        unit: 'kg',
        elId: 'tz'
      },
      {
        ...this.obj.eachDto.balance,
        iconUrl: phm,
        name: '平衡力',
        desc: '走平衡木',
        unit: 's',
        elId: 'phm'
      },
      {
        ...this.obj.eachDto.harmony,
        iconUrl: xtx,
        name: '协调性',
        desc: '双脚连续跳',
        unit: 's',
        elId: 'xtx'
      },
      {
        ...this.obj.eachDto.upLimbStrength,
        iconUrl: wq,
        name: '上肢力量',
        desc: '网球掷远',
        unit: 'm',
        elId: 'wq'
      },
      {
        ...this.obj.eachDto.lowerLimbStrength,
        iconUrl: tiao,
        name: '下肢力量',
        desc: '立定跳远',
        unit: 'cm',
        elId: 'tiao'
      },
      {
        ...this.obj.eachDto.flex,
        iconUrl: rrx,
        name: '柔韧性',
        desc: '坐位体前屈',
        unit: 'cm',
        elId: 'rrx'
      },
      {
        ...this.obj.eachDto.sensitivity,
        iconUrl: wfp,
        name: '灵敏性',
        desc: '十米折返跑',
        unit: 's',
        elId: 'wfp'
      }
    ]
    this.obj.list.map(item => {
      if (item.id && item.id !== 2 && item.id !== 1) {
        this.suggestionData.push(item)
      }
    })
    this.recordList = this.obj.recordList || []
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.drawCanvas()
      }, 5000)
    })
  }
}
</script>

<style lang="less" scoped>
.class-download {
  position: fixed;
  width: 1190px;
  top: 8000px;
  left: 0;
  opacity: 0;
}
.pdf-card {
  width: 1190px;
  height: 1684px;
  color: #484D57;
  background: #fff;
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
    padding-right: 100px;
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
