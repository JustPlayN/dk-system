<template>
  <div class="parent-radar">
    <div id="pRadar"></div>
    <div class="desc">{{obj.remark}}</div>
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
    padding: 0
  },
  // legend: {
  //   x: 'center',
  //   bottom: 12,
  //   itemGap: 36,
  //   itemWidth: 12,
  //   itemHeight: 12,
  //   borderRadius: 6
  // },
  radar: {
    radius: '72%',
    center: ['50%', '50%'],
    name: {
      textStyle: {
        color: '#9197A3'
      }
    }
  },
  series: [{
    type: 'radar',
    data: []
  }],
  color: ['#31BFFF'],
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
      let myChart = echarts.init(document.getElementById('pRadar'))
      this.options.series[0].data = this.obj.data
      this.options.radar.indicator = this.obj.indicator
      myChart.setOption(this.options)
    }
  },
  mounted () {
    this.paintChart()
  }
}
</script>

<style lang="less" scoped>
.parent-radar {
  padding: 32px;
  width: 530px;
  height: 722px;
  border-radius: 24px;
  background: #F5F8FF;
  #pRadar {
    height: 460px;
  }
  .desc {
    font-size: 22px;
    line-height: 38px;
  }
}
</style>
