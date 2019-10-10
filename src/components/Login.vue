<template>
  <div class="login">
    <div class="login-box">
      <el-input v-model="phone" prefix-icon="el-icon-user" clearable></el-input>
      <el-input v-model="password" type="password" prefix-icon="el-icon-lock" clearable></el-input>
      <div class="tips">商户初始密码为手机号后4位，如忘记密码可联系平台客服</div>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      password: '',
      loginType: 1
    }
  },
  methods: {
    login () {
      this.$api.post('/physical-report/login', {
        data: {
          pwd: this.password,
          phone: this.phone
        }
      }).then(res => {
        if (res.code === '00000') {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$utils.setCookie('phone', this.phone, 86400)
          this.$utils.setCookie('roleId', res.data.roleId, 86400)
          this.$utils.setCookie('token', res.data.token, 86400)
          this.$utils.setCookie('userName', res.data.userName, 86400)
          this.$store.dispatch('putIsLogin', true)
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  height: 100vh;
  padding-left: 60%;
  background: url('../assets/bg.jpg') no-repeat;
  background-size: cover;
}
.login-box {
  width: 360px;
  padding: 60px 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px 2px #aaa;
}
.el-input {
  margin-top: 30px;
  width: 100%;
  &:first-child {
    margin-top: 0;
  }
}
.el-button {
  width: 100%;
}
.tips {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 12px;
  color: #969696;
}
</style>
