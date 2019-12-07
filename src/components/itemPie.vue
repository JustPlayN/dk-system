<template>
  <div class="item-pie">
    <div class="pie-title">{{obj.className}}成绩分布</div>
    <div class="pie-box">
      <div class="pie-canvas" :id="obj.elId"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
let options = {
  legend: {
    orient: 'vertical',
    y: 'center',
    right: 10,
    itemGap: 32,
    itemWidth: 16,
    itemHeight: 16,
    borderRadius: 16,
    textStyle: {
      fontSize: 18
    }
  },
  color: ['#0DE18C', '#38A8FF', '#FFBF0B', '#FF6889'],
  series: [
    {
      type: 'pie',
      radius: ['48%', '60%'],
      center: ['43%', '50%'],
      top: 64,
      data: [],
      label: {
        formatter: '{b}：{c}人 \n{d}%',
        fontSize: 15,
        lineHeight: 20
      }
    }
  ]
}

export default {
  props: {
    obj: Object
  },
  data () {
    return {
      options
    }
  },
  methods: {
    paintChart () {
      let myChart = echarts.init(document.getElementById(this.obj.elId))
      this.options.series[0].data = [
        { value: this.obj.fineNum, name: '优秀' },
        { value: this.obj.goodNum, name: '良好' },
        { value: this.obj.qualifiedNum, name: '合格' },
        { value: this.obj.unQualifiedNum, name: '不合格' }
      ]
      myChart.setOption(this.options)
    }
  },
  mounted () {
    this.paintChart()
  }
}
</script>

<style lang="less" scoped>
.item-pie {
  flex-shrink: 0;
  width: 532px;
  margin-bottom: 16px;
  padding-bottom: 40px;
  border-radius: 20px;
  background: #F5F8FF;
  .pie-canvas {
    height: 270px;
  }
  .pie-title {
    padding: 20px 20px 0;
    font-size: 26px;
    line-height: 36px;
    font-weight: bold;
  }
}
</style>
