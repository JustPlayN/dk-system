<template>
  <div class="class-radar">
    <div id="classRadar"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
let options = {
  title: {
    text: '概况评估',
    textStyle: {
      color: '#17AFF3',
      fontSize: 28,
      fontWeight: 'bold'
    },
    padding: 24
  },
  legend: {
    orient: 'horizontal',
    x: 'center',
    bottom: 10,
    itemGap: 80,
    itemWidth: 16,
    itemHeight: 16,
    borderRadius: 16,
    textStyle: {
      fontSize: 18
    }
  },
  radar: {
    radius: '72%',
    center: ['50%', '50%'],
    name: {
      textStyle: {
        color: '#9197A3',
        fontSize: 15,
        lineHeight: 20
      }
    }
  },
  series: [{
    type: 'radar',
    data: []
  }],
  color: ['#31BFFF', '#FF6889'],
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
      let myChart = echarts.init(document.getElementById('classRadar'))
      this.options.series[0].data = [
        {
          value: [5, 5, 4, 4, 3, 4, 5, 4],
          name: '班级平均'
        },
        {
          value: [3, 2, 3, 1, 2, 3, 4, 4],
          name: '园所平均'
        }
      ]
      this.options.radar.indicator = [
        { name: '平衡力(走平衡木)', max: 5 },
        { name: '灵敏\n(十米折返跑)', max: 5 },
        { name: '体重', max: 5 },
        { name: '下肢力量\n(立定跳远)', max: 5 },
        { name: '上肢力量(网球掷远)', max: 5 },
        { name: '协调性\n(双脚连续跳)', max: 5 },
        { name: '身高', max: 5 },
        { name: '柔韧\n(坐位体前屈)', max: 5 },
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
.class-radar {
  width: 530px;
  border-radius: 24px;
  background: #F5F8FF;
  #classRadar {
    height: 590px;
  }
  .desc {
    font-size: 22px;
    line-height: 38px;
  }
}
</style>
