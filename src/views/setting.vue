<template>
  <div class="setting">
    <el-form ref="searchForm" :model="userInfo" label-width="240px" size="medium">
      <el-form-item label="姓名：" prop="userName" required>
        <el-input v-model="userInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio v-model="userInfo.sex" :label="1">男</el-radio>
        <el-radio v-model="userInfo.sex" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号：" prop="userPhone">
        <el-input v-model="userInfo.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="所在省：" prop="provinceId" required>
        <el-select v-model="userInfo.provinceId" placeholder="请选择" @change="change($event, 1)">
          <el-option v-for="item in provinceList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在市：" prop="cityId" required>
        <el-select v-model="userInfo.cityId" placeholder="请选择" @change="change($event, 2)">
          <el-option v-for="item in cityList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在区：" prop="areaId" required>
        <el-select v-model="userInfo.areaId" placeholder="请选择">
          <el-option v-for="item in areaList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址：" prop="addr" required>
        <el-input v-model="userInfo.addr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >提交</el-button>
        <el-button>取消并返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        userName: '',
        sex: 1,
        userPhone: '',
        provinceId: null,
        cityId: null,
        areaId: null,
        addr: ''
      },
      provinceList: [],
      cityList: [],
      areaList: [],
    }
  },
  methods: {
    getUserInfo () {
      this.$api.post('/physical-report/user/info', {
        data: {}
      }).then(res => {
        if (res.code === '00000') {
          this.userInfo = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    change (value, type) {
      console.log(value)
      if ((!value)) {
        return
      }
      this.getList(value, type)
    },
    getList (value, type) {
      this.$api.post('/physical-report/region/list', {
        data: {
          parentId: value
        }
      }).then(res => {
        if (res.code === '00000') {
          if (type === 0) {
            this.provinceList = res.data
          } else if (type === 1) {
            this.cityList = res.data
          } else {
            this.areaList = res.data
          }
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    }
  },
  created () {
    this.getList(0, 0)
  }
}
</script>

<style lang="less" scoped>
.setting {
  padding-top: 80px;
}
</style>
