<template>
  <div class="title">
    <el-form class="not-inline" label-width="240px" size="medium">
      <el-form-item label="报告表头：" required="">
        <el-input v-model.trim="title" type="textarea" :rows="3" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setPdfText">提交</el-button>
        <el-button @click="$router.back()">取消并返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    setPdfText () {
      if (!this.title) {
        this.$message({ message: '请先输入表头', type: 'error' })
        return
      }
      this.$confirm('说明：一次设置，家长/班级/园所同时生效，不超过100字', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if (value) {
          this.$api.post('/physical-report/merchant/pdf/title', {
            data: {
              title: value
            }
          }).then(res => {
            if (res.code === '00000') {
              this.$router.back()
              this.$message({ message: '设置成功', type: 'success' })
            } else {
              this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
            }
          })
        }
      })
    },
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
  }
}
</script>

<style lang="less" scoped>
.title {
  padding-top: 80px;
}
</style>
