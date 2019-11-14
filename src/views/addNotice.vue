<template>
  <div class="add-notice">
    <el-form class="not-inline" label-width="240px" size="medium">
      <el-form-item label="公告内容：" required>
        <el-input type="textarea" autosize placeholder="请输入内容" v-model.trim="notice" width="400px" clearable></el-input>
      </el-form-item>
      <el-form-item label="展示时间：" required>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="面向用户群：" required>
        <el-checkbox-group v-model="roleId">
          <el-checkbox :label="4">老师</el-checkbox>
          <el-checkbox :label="5">家长</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notice: '',
      date: null,
      roleId: []
    }
  },
  methods: {
    save () {
      if (!this.notice) {
        this.$message({ message: '请输入公告内容', type: 'error' })
        return
      } else if (!this.date) {
        this.$message({ message: '请输入公告内容', type: 'error' })
      } else if (!this.roleId || this.roleId.length === 0) {
        this.$message({ message: '请选择面向群体', type: 'error' })
      }
      this.$api.post('/physical-report/message/add', {
        data: {
          content: this.notice,
          messageTypes: this.roleId,
          startTime: this.date[0],
          endTime: this.date[1]
        }
      }).then(res => {
        if (res.code === '00000') {
          this.$message({ message: '保存成功', type: 'success' })
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
</style>
