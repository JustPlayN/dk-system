<template>
  <div class="download-box">
    <div id="download">
      <div class="box-one">
        <div class="top">
          <div class="left">
            <div class="title">国民体质健康幼儿体质测试报告</div>
            <div class="title-text">
              智慧健康幼儿体测报告运用科学的方法对幼儿的形态、机能和身体素质等进行测试与评定，<br>
              并提供有效的课程训练方案；始终坚持科学、规范、安全、便民，只为中国幼儿体质与素质健康发展。
            </div>
          </div>
          <img class="logo" src="../assets/img/logo.png" />
        </div>
        <div class="content">
          <div class="school-title"><div>{{obj.basicDto.studentName}}</div><i class="iconfont iconnan" :class="{iconnan: obj.basicDto.sex === 1, iconnv: obj.basicDto.sex === 2}" /></div>
          <div class="school-info">
            <div class="name">班级：</div>
            <div class="desc">{{obj.basicDto.schoolName}}</div>
            <div class="name">班级：</div>
            <div class="desc">{{obj.basicDto.className}}</div>
            <div class="name">年龄：</div>
            <div class="desc">{{obj.basicDto.age}}岁</div>
            <div class="name">测试时间：</div>
            <div class="desc">{{obj.basicDto.date | formatDate('YYYY/MM/DD')}}</div>
          </div>
          <div class="chart-box">
            <div class="chart-item">
              <circle-chart v-if="circleData" :obj="circleData" />
            </div>
            <div class="chart-item">
              <parent-radar v-if="radarData" :obj="radarData" />
            </div>
          </div>
          <div class="single-data">
            <div class="single-title">单项分析</div>
            <div class="single-one">
              <parent-analyse-item v-if="singleAnalyseList.length > 0" :obj="singleAnalyseList[0]" />
            </div>
          </div>
        </div>
      </div>
      <div class="box-two" v-if="singleAnalyseList.length > 0">
        <parent-analyse-item :obj="singleAnalyseList[1]" />
        <parent-analyse-item :obj="singleAnalyseList[2]" />
        <parent-analyse-item :obj="singleAnalyseList[3]" />
        <parent-analyse-item :obj="singleAnalyseList[4]" />
        <parent-analyse-item :obj="singleAnalyseList[5]" />
      </div>
      <div class="box-three">
        <div class="top" v-if="singleAnalyseList.length > 0">
          <parent-analyse-item :obj="singleAnalyseList[6]" />
          <parent-analyse-item :obj="singleAnalyseList[7]" />
          <div class="title">方案建议</div>
          <suggestion :list="suggestionData" />
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
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import circleChart from '@/components/personalCircle'
import parentRadar from '@/components/parentRadar'
import parentAnalyseItem from '@/components/parentAnalyseItem'
import suggestion from '@/components/suggestion'

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
    circleChart,
    parentRadar,
    parentAnalyseItem,
    suggestion
  },
  data () {
    return {
      circleData: null,
      radarData: null,
      singleAnalyseList: [],
      suggestionData: []
    }
  },
  methods: {
    drawCanvas () {
      html2canvas(document.getElementById('download')).then(res => {
        this.downloadPdf(res, this.obj.basicDto.studentName)
      })
    },
    downloadPdf (canvas, fileName) {
      let contentWidth = canvas.width
      let contentHeight = canvas.height
      let pageHeight = contentWidth / 594 * 841.89
      let leftHeight = contentHeight
      let position = 0
      let imgWidth = 595.28
      let imgHeight = 595/contentWidth * contentHeight
      let pageData = canvas.toDataURL('image/jpeg', 1.0)
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
      pdf.save(`${fileName}.pdf`)
      this.$emit('over')
    },
    // download (canvasElement, fileName) {
    //   let MIME_TYPE = 'image/jpeg'
    //   let imgURL = canvasElement.toDataURL(MIME_TYPE)
    //   let dlLink = document.createElement('a')
    //   dlLink.download = fileName
    //   dlLink.href = imgURL
    //   dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

    //   document.body.appendChild(dlLink)
    //   dlLink.click()
    //   document.body.removeChild(dlLink)
    // }
  },
  created () {
    this.circleData = {
      segment: this.obj.basicDto.segment,
      score: this.obj.basicDto.score,
      preScore: this.obj.basicDto.preMeasureRecord.score,
      percent: this.obj.basicDto.percent,
    }
    if (this.circleData.score <= 20) {
      this.circleData.deg = this.circleData.score * 45 / 20
    } else if (this.circleData.score <= 28) {
      this.circleData.deg = (this.circleData.score - 20) * 45 / 8 + 45
    } else if (this.circleData.score <= 32) {
      this.circleData.deg = (this.circleData.score - 28) * 45 / 4 + 90
    } else {
      this.circleData.deg = (this.circleData.score - 32) * 45 / 8 + 135
    }
    if (this.circleData.preScore <= 20) {
      this.circleData.preDeg = this.circleData.preScore * 45 / 20
    } else if (this.circleData.preScore <= 28) {
      this.circleData.preDeg = (this.circleData.preScore - 20) * 45 / 8 + 45
    } else if (this.circleData.preScore <= 32) {
      this.circleData.preDeg = (this.circleData.preScore - 28) * 45 / 4 + 90
    } else {
      this.circleData.preDeg = (this.circleData.preScore - 32) * 45 / 8 + 135
    }
    this.circleData.preDeg = this.circleData.preDeg - this.circleData.deg
    this.radarData = {
      remark: this.obj.basicDto.remark,
      indicator: [
        { name: `平衡力(走平衡木)：${this.obj.basicDto.balanceDto.value}s`, max: 5 },
        { name: `灵敏\n(十米折返跑)\n${this.obj.basicDto.harmonyDto.value}s`, max: 5 },
        { name: `体重\n${this.obj.basicDto.weightDto.value}kg`, max: 5 },
        { name: `下肢力量\n(立定跳远)\n${this.obj.basicDto.legStrengthDto.value}cm`, max: 5 },
        { name: `上肢力量(网球掷远)：${this.obj.basicDto.limbStrengthDto.value}m`, max: 5 },
        { name: `协调性\n(双脚连续跳)\n${this.obj.basicDto.sensitivityDto.value}s`, max: 5 },
        { name: `身高\n${this.obj.basicDto.heightDto.value}cm`, max: 5 },
        { name: `柔韧\n(坐位体前屈)\n${this.obj.basicDto.flexDto.value}cm`, max: 5 },
      ],
      data: [{
        value: [
          this.obj.basicDto.balanceDto.score,
          this.obj.basicDto.harmonyDto.score,
          this.obj.basicDto.weightDto.score,
          this.obj.basicDto.legStrengthDto.score,
          this.obj.basicDto.limbStrengthDto.score,
          this.obj.basicDto.sensitivityDto.score,
          this.obj.basicDto.heightDto.score,
          this.obj.basicDto.flexDto.score
        ]
      }]
    }
    this.singleAnalyseList = [
      {
        ...this.obj.eachItemDto.heightDto,
        iconUrl: sg,
        name: '身高',
        desc: '',
        unit: 'cm',
        elId: 'sg'
      },
      {
        ...this.obj.eachItemDto.weightDto,
        iconUrl: tz,
        name: '体重',
        desc: '',
        unit: 'kg',
        elId: 'tz'
      },
      {
        ...this.obj.eachItemDto.balance,
        iconUrl: phm,
        name: '平衡力',
        desc: '走平衡木',
        unit: 's',
        elId: 'phm'
      },
      {
        ...this.obj.eachItemDto.harmony,
        iconUrl: xtx,
        name: '协调性',
        desc: '双脚连续跳',
        unit: 's',
        elId: 'xtx'
      },
      {
        ...this.obj.eachItemDto.upLimbStrength,
        iconUrl: wq,
        name: '上肢力量',
        desc: '网球掷远',
        unit: 'm',
        elId: 'wq'
      },
      {
        ...this.obj.eachItemDto.lowerLimbStrength,
        iconUrl: tiao,
        name: '下肢力量',
        desc: '立定跳远',
        unit: 'cm',
        elId: 'tiao'
      },
      {
        ...this.obj.eachItemDto.flex,
        iconUrl: rrx,
        name: '柔韧性',
        desc: '坐位体前屈',
        unit: 'cm',
        elId: 'rrx'
      },
      {
        ...this.obj.eachItemDto.sensitivity,
        iconUrl: wfp,
        name: '灵敏性',
        desc: '十米折返跑',
        unit: 's',
        elId: 'wfp'
      }
    ]
    this.obj.proposalList.map(item => {
      if (item.id && item.id !== 2 && item.id !== 1) {
        this.suggestionData.push(item)
      }
    })
  },
  mounted () {
    this.$nextTick(function () {
      setTimeout(() => {
        this.drawCanvas()
      }, 3000)
    })
  }
}
</script>

<style lang="less" scoped>
.download-box {
  position: fixed;
  width: 1190px;
  top: 0;
  left: 0;
  opacity: 0;
}
.box-one {
  width: 1190px;
  height: 1684px;
  flex-shrink: 0;
  overflow: hidden;
  color: #484D57;
  background: #fff;
  .top {
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
  .content {
    padding: 48px;
    .school-title {
      display: flex;
      align-items: center;
      font-size: 32px;
      line-height: 44px;
      color: #17AFF3;
      .iconfont {
        font-size: 32px;
        line-height: 32px;
        margin-left: 8px;
      }
      .iconnv {
        color: #FF6889;
      }
    }
    .school-info {
      display: flex;
      align-items: center;
      margin-top: 24px;
      font-size: 22px;
      line-height: 32px;
      .name {
        color: #9197A3;
      }
      .desc {
        margin-right: 48px;
      }
    }
    .chart-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 40px;
    }
    .single-data {
      padding-top: 40px;
      .single-title {
        font-size: 28px;
        line-height: 40px;
        font-weight: bold;
        color: #17AFF3;
      }
      .single-one {
        height: 402px;
        margin-top: 16px;
        border-radius: 16px;
        background: #F5F8FF;
      }
    }
  }
}
.box-two {
  width: 1190px;
  padding: 60px 48px 44px;
  color: #484D57;
  height: 1684px;
  background: #fff;
  overflow: hidden;
  flex-shrink: 0;
}
.box-three {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1190px;
  color: #484D57;
  height: 1684px;
  background: #fff;
  flex-shrink: 0;
  overflow: hidden;
  .top {
    padding: 60px 48px 0;
  }
  .title {
    font-size: 28px;
    line-height: 40px;
    font-weight: bold;
    color: #17AFF3;
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
</style>
