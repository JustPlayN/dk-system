<template>
  <div class="home">
    <el-row :gutter="20" v-if="userInfo.roleId === '1'">
      <el-col :span="6" v-for="(e, index) in equipments" :key="index">
        <div class="item-box">
          <el-col :span="8" class="item-icon"><i :class="e.icon"></i></el-col>
          <el-col :span="16">
            <div class="name">{{e.name}}</div>
            <div class="value">{{e.value}}</div>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <template v-for="(m, index) in merchants">
        <el-col :span="6" :key="index" v-if="!m.hide">
          <div class="item-box merchants">
            <el-col :span="8" class="item-icon"><i :class="m.icon"></i></el-col>
            <el-col :span="16">
              <div class="name">{{m.name}}</div>
              <div class="value">{{m.value}}</div>
            </el-col>
          </div>
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(d, index) in dataList" :key="index">
        <div class="item-box data">
          <el-col :span="8" class="item-icon"><i :class="d.icon"></i></el-col>
          <el-col :span="16">
            <div class="name">{{d.name}}</div>
            <div class="value">{{d.value}}</div>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapGetters } from 'vuex'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      equipments: [],
      merchants: [],
      dataList: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getData () {
      this.$api.post('/physical-report/firstPage/datakanban', { data: {} }).then(res => {
        if (res.code === '00000') {
          this.equipments = [
            { name: '当前设备（台）', value: res.data.totalDeviceNum, icon: 'el-icon-s-order' },
            { name: '设备覆盖城市（个）', value: res.data.cityNum, icon: 'el-icon-s-order' },
            { name: '本月新设备（台）', value: res.data.newDeviceMonth, icon: 'el-icon-s-order' }
          ]
          this.merchants = [
            { name: '累计服务园所（个）', value: res.data.totalCompanyNum, icon: 'el-icon-user', hide: this.userInfo.roleId !== '1' },
            { name: '累计服务老师（个）', value: res.data.teacherNum, icon: 'el-icon-user' },
            { name: '累计服务家长（个）', value: res.data.parentNum, icon: 'el-icon-user' },
            { name: '累计服务孩子（个）', value: res.data.studentNum, icon: 'el-icon-user' }
          ]
          this.dataList = [
            { name: '累计体测次数（次）', value: res.data.recordNum, icon: 'el-icon-s-data' },
            { name: '本月体测次数（次）', value: res.data.newRecordMonth, icon: 'el-icon-s-data' },
            { name: '今日体测次数（次）', value: res.data.todayRecord, icon: 'el-icon-s-data' }
          ]
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    }
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    this.getData()
  }
}
</script>
<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}
.item-box {
  display: flex;
  align-items: center;
  height: 120px;
  background: #409EFF;
  border-radius: 4px;
  color: #fff;
  .item-icon {
    text-align: center;
  }
  i {
    font-size: 40px;
  }
  .name {
    font-size: 14px;
  }
  .value {
    font-size: 36px;
  }
  &.merchants {
    background: #67C23A;
  }
  &.data {
    background: rgb(254, 195, 10);
  }
}
</style>
