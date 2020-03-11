<template>
  <div class="class-download">
    <div id="download">
      <div class="pdf-card">
        <div class="pdf-header">
          <div class="left">
            <div class="title">国民体质健康幼儿体质测试报告</div>
            <div class="title-text">{{obj.title}}</div>
          </div>
          <img class="logo" src="../assets/img/logo.png" />
        </div>
        <div class="school-title">{{obj.schoolName}}</div>
        <div class="school-info">
          <div class="name">参评班级：</div>
          <div class="desc">{{obj.classNum}}个</div>
          <div class="name">参评幼儿人数：</div>
          <div class="desc">{{obj.studentNum}}人</div>
          <div class="name">测试时间：</div>
          <div class="desc">{{obj.date}}</div>
        </div>
        <div class="content">
          <div class="top">
            <school-pie v-if="schoolPieData.length > 0" :list="schoolPieData" />
            <school-radar v-if="schoolRadarData.length > 0" :list="schoolRadarData" />
          </div>
          <div class="remark">{{obj.remark}}</div>
          <div class="sub-title">班级测评概况</div>
          <div class="pie-cantainer">
            <item-pie v-for="item in analyseListData.slice(0, 2)" :key="item.elId" :obj="item" />
          </div>
        </div>
      </div>
      <div class="pdf-card pie-card" v-if="analyseListData.length > 2">
        <div class="item-box">
          <item-pie v-for="item in analyseListData.slice(2, 10)" :key="item.elId" :obj="item" />
        </div>
      </div>
      <div class="pdf-card pie-card" v-if="analyseListData.length > 12">
        <div class="item-box">
          <item-pie v-for="item in analyseListData.slice(10, 18)" :key="item.elId" :obj="item" />
        </div>
      </div>
      <div class="pdf-card pie-card" v-if="analyseListData.length > 22">
        <div class="item-box">
          <item-pie v-for="item in analyseListData.slice(18, 26)" :key="item.elId" :obj="item" />
        </div>
      </div>
      <div class="pdf-card pie-card" v-if="analyseListData.length > 32">
        <div class="item-box">
          <item-pie v-for="item in analyseListData.slice(26, 34)" :key="item.elId" :obj="item" />
        </div>
      </div>
      <div class="pdf-card rank-card">
        <div class="sub-title">班级合格率排名</div>
        <div class="rank-box">
          <class-rank :list="passRateList" />
        </div>
      </div>
      <div class="pdf-card analyse-card">
        <div class="sub-title">单项分析</div>
        <template v-for="item in analyseList.slice(0, 4)">
          <analyse-item :key="item.elId" :obj="item" />
        </template>
      </div>
      <div class="pdf-card analyse-card">
        <template v-for="item in analyseList.slice(4, 8)">
          <analyse-item  :key="item.elId" :obj="item" />
        </template>
        <div class="bottom" v-if="suggestionData.length === 0">
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
      <div class="pdf-card suggestion-card" v-if="suggestionData.length > 0">
        <div class="sub-title">方案建议</div>
        <suggestion :list="suggestionData" />
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
import schoolPie from '@/components/schoolPie'
import schoolRadar from '@/components/schoolRadar'
import itemPie from '@/components/itemPie'
import analyseItem from '@/components/schoolAnalyse'
import classRank from '@/components/classRank'
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
    schoolPie,
    schoolRadar,
    itemPie,
    analyseItem,
    classRank,
    suggestion
  },
  data () {
    return {
      schoolPieData: [],
      schoolRadarData: [],
      passRateList: [],
      suggestionData: [],
      analyseList: [],
      analyseListData: []
    }
  },
  methods: {
    drawCanvas () {
      html2canvas(document.getElementById('download')).then(res => {
        this.downloadPdf(res, this.obj.schoolName)
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
  },
  created () {
    this.schoolPieData = [
      { value: this.obj.fineNum, name: '优秀' },
      { value: this.obj.goodNum, name: '良好' },
      { value: this.obj.qualifiedNum, name: '合格' },
      { value: this.obj.unQualifiedNum, name: '不合格' }
    ]
    this.schoolRadarData = [
      {
        value: [
          this.obj.baseReportDto.balanceScore,
          this.obj.baseReportDto.shuttleRunScore,
          this.obj.baseReportDto.weightScore,
          this.obj.baseReportDto.standJumpScore,
          this.obj.baseReportDto.tennisAwayScore,
          this.obj.baseReportDto.bothLegsJumpScore,
          this.obj.baseReportDto.heightScore,
          this.obj.baseReportDto.sitBendScore
        ],
        name: '园所平均'
      }
    ]
    this.analyseListData = this.obj.classAnalysisList.map((item, index) => {
      return {
        ...item,
        elId: `classPie${index}`
      }
    })
    this.passRateList = this.obj.passRateList
    this.analyseList = [
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
.class-download {
  position: fixed;
  width: 1190px;
  top: 0;
  left: 0;
  opacity: 0;
}
.pdf-card {
  width: 1190px;
  height: 1684px;
  color: #484D57;
  background: #fff;
  position: relative;
  overflow: hidden;
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
  .pie-cantainer {
    display: flex;
    justify-content: space-between;
  }
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
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
.pie-card {
  padding: 60px 48px 0;
  .item-box {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
  }
}
.rank-card {
  padding: 0 48px;
  .rank-box {
    margin-top: 16px;
  }
}
.analyse-card {
  padding: 48px;
  .sub-title {
    margin: 0 0 16px;
  }
  .text-card {
    padding: 24px 28px;
    margin-bottom: 16px;
    font-size: 22px;
    line-height: 38px;
    border-radius: 16px;
    background: #F5F8FF;
  }
}
.suggestion-card {
  padding: 0 48px;
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
