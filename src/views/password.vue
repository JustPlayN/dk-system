<template>
  <div class="setting">
    <el-form ref="searchForm" label-width="240px" size="medium">
      <el-form-item label="登录手机号：" prop="name" required>
        {{userInfo.phone}}
      </el-form-item>
      <el-form-item label="原密码：" prop="password">
        <el-input v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input v-model="userInfo.newPassword"></el-input>
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
        phone: '1889997988',
        password: '12121',
        newPassword: '1212'
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
