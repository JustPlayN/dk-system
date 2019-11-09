<template>
  <div class="map">
    <div id="mapBox" ref="map"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tMap: null,
      map: null,
      cityList: [],
      cityNum: 0,
      totalDevice: 0
    }
  },
  methods: {
    createMap () {
      this.tMap = window.qq.maps
      let center = new this.tMap.LatLng(38, 116)       // 设置中心点坐标
      // 初始化地图
      this.map = new this.tMap.Map(this.$refs.map, {
        center: center,
        zoom: 4
      })
    },
    addMarkers () {
      let _this = this
      let marker = null
      this.cityList.forEach(item => {
        marker = new this.tMap.Marker({
          // 设置Marker的位置坐标
          position: new _this.tMap.LatLng(item.lat, item.lng),
          map: _this.map,
          // Marker的覆盖内容
          decoration: new _this.tMap.MarkerDecoration(`<div style='color:#fff;font-size:12px;padding-bottom: 16px'>${item.deviceNum}</div>`),
          // 自定义Marker图标样式
          icon: new _this.tMap.MarkerImage('../position.png')
        })
      })
      console.log(marker)
    },
    getList () {
      this.$api.post('/physical-report/firstPage/cityMap', {
        data: {}
      }).then(res => {
        if (res.code === '00000') {
          this.cityList = res.data.cityList
          this.cityNum = res.data.cityNum
          this.totalDevice = res.data.totalDevice
          this.addMarkers()
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
  },
  mounted () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    this.createMap()
    this.getList()
  }
}
</script>

<style lang="less" scoped>
#mapBox {
  height: 600px;
}
#marker {
  background: red;
  width: 30px;
  height: 30px;
}
</style>
