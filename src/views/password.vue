<template>
  <div class="setting">
    <el-form class="not-inline" ref="searchForm" label-width="240px" size="medium">
      <el-form-item label="登录手机号：" prop="name" required>
        {{userInfo.phone}}
      </el-form-item>
      <el-form-item label="原密码：" prop="password">
        <el-input type="password" v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input type="password" v-model="userInfo.newPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePsd">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        phone: this.$utils.getCookie('phone'),
        password: '',
        newPassword: ''
      }
    }
  },
  methods: {
    changePsd () {
      if (!this.userInfo.password) {
        this.$message({ message: '请输入原密码', type: 'error' })
        return
      } else if (!this.userInfo.newPassword) {
        this.$message({ message: '请输入新密码', type: 'error' })
        return
      }
      this.$api.post('/physical-report/user/editPwd', {
        data: {
          oldPwd: this.userInfo.password,
          newPwd: this.userInfo.newPassword
        }
      }).then(res => {
        if (res.code === '00000') {
          this.$message({ message: '修改成功', type: 'success' })
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    }
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
  }
}
</script>

<style lang="less" scoped>
.setting {
  padding-top: 80px;
}
</style>
