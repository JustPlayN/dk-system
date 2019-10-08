<template>
  <div class="setting">
    <el-form ref="searchForm" label-width="240px" size="medium">
      <el-form-item label="姓名：" prop="name" required>
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-radio v-model="userInfo.gender" label="1">男</el-radio>
        <el-radio v-model="userInfo.gender" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号：" prop="phone">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="所在省：" prop="province" required>
        <el-input v-model="userInfo.province"></el-input>
      </el-form-item>
      <el-form-item label="详细地址：" prop="address" required>
        <el-input v-model="userInfo.address"></el-input>
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
        name: '',
        gender: '',
        phone: '',
        province: '',
        address: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.setting {
  padding-top: 80px;
}
</style>
