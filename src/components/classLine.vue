<template>
  <div class="class-line">
    <div class="echart-box">
      <div class="echart-bar" :id="obj.elId"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
let options = {
  legend: {
    orient: 'horizontal',
    x: 'right',
    itemGap: 36,
    itemWidth: 12,
    itemHeight: 12,
    borderRadius: 6,
    icon: 'roundRect',
    tooltip: {
      show: true
    }
  },
  grid: {
    top: 40,
    bottom: 20,
    right: 0,
    left: 24
  },
  xAxis: {
    type: 'category',
    nameTextStyle: {
      color: '#9197A3',
      fontSize: 10
    },
    splitNumber: 3,
    axisLine: {
      lineStyle: {
        color: '#D8D8D8'
      }
    },
    axisLabel: {
      color: '#9197A3'
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#D8D8D8'
      }
    },
    data: ['偏瘦', '正常', '偏胖', '肥胖']
  },
  yAxis: {
    name: '人数',
    nameTextStyle: {
      color: '#9197A3',
      fontSize: 10,
      padding: [0, 0, 10, 0]
    },
    splitNumber: 3,
    boundaryGap: false,
    axisLine: {
      show: false
    },
    axisLabel: {
      color: '#9197A3'
    },
    axisTick: {
      show: false
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#D8D8D8'
      }
    }
  },
  color: ['#38A8FF', '#FF6889']
}
export default {
  props: {
    obj: Object
  },
  data () {
    return {
      options,
      ec: {}
    }
  },
  methods: {
    paintChart () {
      let myChart = echarts.init(document.getElementById(this.obj.elId))
      this.options.series = [
        {
          name: '男',
          type: 'line',
          data: [
            this.obj.maleThin,
            this.obj.maleNormal,
            this.obj.maleFatter,
            this.obj.maleObesity
          ]
        },
        {
          name: '女',
          type: 'line',
          data: [
            this.obj.femaleThin,
            this.obj.femaleNormal,
            this.obj.femaleFatter,
            this.obj.femaleObesity
          ]
        }
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
.class-line {
  width: 500px;
  padding-right: 30px;
  padding-top: 10px;
  .echart-bar {
    height: 230px;
  }
}
</style>
