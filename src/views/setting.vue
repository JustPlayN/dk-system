<template>
  <div class="setting">
    <el-form class="not-inline" ref="elForm" :rules="rules" :model="userInfo" label-width="240px" size="medium">
      <el-form-item label="姓名：" prop="userName">
        <el-input v-model.trim="userInfo.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio v-model="userInfo.sex" :label="1">男</el-radio>
        <el-radio v-model="userInfo.sex" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label.trim="手机号：" prop="userPhone">
        <el-input v-model="userInfo.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="所在省：" prop="provinceId">
        <el-select v-model="userInfo.provinceId" placeholder="请选择" @change="change($event, 1)">
          <el-option v-for="item in provinceList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在市：" prop="cityId">
        <el-select v-model="userInfo.cityId" placeholder="请选择" @change="change($event, 2)">
          <el-option v-for="item in cityList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在区：" prop="areaId">
        <el-select v-model="userInfo.areaId" placeholder="请选择">
          <el-option v-for="item in areaList" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址：" prop="addr">
        <el-input v-model.trim="userInfo.addr"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveUserInfo">提交</el-button>
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
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        areaId: [
          { required: true, message: '请选择区', trigger: 'change' }
        ],
        addr: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    getUserInfo () {
      this.$api.post('/physical-report/user/info', {
        data: {}
      }).then(res => {
        if (res.code === '00000') {
          this.userInfo = res.data
          this.getList(this.userInfo.provinceId, 1)
          this.getList(this.userInfo.cityId, 2)
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    change (value, type) {
      if ((!value)) {
        return
      }
      if (type === 1) {
        this.userInfo.cityId = ''
        this.userInfo.areaId = ''
      } else if (type === 2) {
        this.userInfo.areaId = ''
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
    },
    saveUserInfo () {
      this.$refs['elForm'].validate((valid) => {
        if (valid) {
          return true
        } else {
          return false
        }
      })
      this.$api.post('/physical-report/user/edit', {
        data: {
          id: this.userInfo.id,
          userPhone: this.userInfo.userPhone,
          userName: this.userInfo.userName,
          sex: this.userInfo.sex,
          provinceId: this.userInfo.provinceId,
          cityId: this.userInfo.cityId,
          areaId: this.userInfo.areaId,
          addr: this.userInfo.addr
        }
      }).then(res => {
        if (res.code === '00000') {
          this.$message({ message: '保存成功，请重新登录', type: 'success' })
          this.$utils.setCookie('userInfo', '')
          this.$utils.setCookie('token', '', 86400)
          this.$utils.setCookie('roleId', '', 86400)
          this.$store.dispatch('putUserInfo', {})
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    }
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    this.getUserInfo()
    this.getList(0, 0)
  }
}
</script>

<style lang="less" scoped>
.setting {
  padding-top: 80px;
}
</style>
