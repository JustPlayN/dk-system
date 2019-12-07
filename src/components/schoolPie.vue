<template>
  <div class="school-pie">
    <div class="pie-box">
      <div id="schoolPie"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
let options = {
  legend: {
    orient: 'horizontal',
    x: 'center',
    bottom: 90,
    itemGap: 60,
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
      radius: ['36%', '48%'],
      center: ['50%', '40%'],
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
    list: Array
  },
  data () {
    return {
      options
    }
  },
  methods: {
    paintChart () {
      let myChart = echarts.init(document.getElementById('schoolPie'))
      this.options.series[0].data = this.list
      myChart.setOption(this.options)
    }
  },
  mounted () {
    this.paintChart()
  }
}
</script>

<style lang="less" scoped>
.school-pie {
  width: 560px;
  border-radius: 16px 0 16px 0;
  background: #fff;
  .pie-box {
    width: 530px;
    border-radius: 16px;
    background: #F5F8FF;
  }
  #schoolPie {
    height: 560px;
  }
}
</style>
