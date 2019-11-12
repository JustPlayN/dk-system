<template>
  <div class="equip-list">
    <el-table :data="tableData" border header-row-class-name="table-header" size="medium">
      <el-table-column prop="id" label="设备Id"></el-table-column>
      <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="cityName" label="所在城市"></el-table-column>
      <el-table-column prop="companyName" label="所属单位"></el-table-column>
      <el-table-column prop="deviceNum" label="设备数量"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getDeviceList () {
      this.$api.post('/physical-report/device/list', {
        data: {},
        page: {
          currentPage: 1,
          pageSize: 20
        }
      }).then(res => {
        if (res.code === '00000') {
          this.tableData = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    this.getDeviceList()
  }
}
</script>

<style lang="less" scoped>
</style>
