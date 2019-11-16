<template>
  <div class="setting">
    <el-form class="not-inline" ref="searchForm" label-width="240px" size="medium">
      <el-form-item label="登录手机号：" prop="name" required>
        {{userInfo.phone}}
      </el-form-item>
      <el-form-item label="原密码：" prop="password">
        <el-input type="password" v-model="userObj.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input type="password" v-model="userObj.newPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePsd">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      userObj: {
        password: '',
        newPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    changePsd () {
      if (!this.userObj.password) {
        this.$message({ message: '请输入原密码', type: 'error' })
        return
      } else if (!this.userObj.newPassword) {
        this.$message({ message: '请输入新密码', type: 'error' })
        return
      }
      this.$api.post('/physical-report/user/editPwd', {
        data: {
          oldPwd: this.userObj.password,
          newPwd: this.userObj.newPassword
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
