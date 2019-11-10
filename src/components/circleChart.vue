<template>
  <div class="circle-chart" id="circleChart">
  </div>
</template>

<script>
import echarts from 'echarts'
let cirleOption = {
  legend: {
    orient: 'horizontal',
    x: 'center',
    bottom: 12,
    itemGap: 20,
    itemWidth: 12,
    itemHeight: 12,
    borderRadius: 6
  },
  color: ['#0DE18C', '#38A8FF', '#FFBF0B', '#FF6889'],
  series: [
    {
      type: 'pie',
      radius: ['40%', '52%'],
      center: ['50%', '40%'],
      avoidLabelOverlap: false,
      top: 64,
      data: [
        { value: 100, name: '优秀 12人 40%' },
        { value: 60, name: '良好 12人 25%' },
        { value: 80, name: '合格 30人 20%' },
        { value: 129, name: '不合格 40人 20%' },
      ]
    }
  ]
}
export default {
  methods: {
    paintChart () {
      var myChart = echarts.init(document.getElementById('circleChart'))
      myChart.setOption(cirleOption)
    }
  },
  mounted () {
    this.paintChart()
  }
}
</script>

<style lang="less" scoped>
.circle-chart {
  width: 532px;
  height: 560px;
}
</style>
