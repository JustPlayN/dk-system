<template>
  <div class="teacher-detail">
    <el-form class="not-inline" ref="detailForm" :rules="rules" :model="detail" label-width="240px" size="medium">
      <el-form-item label="老师姓名：" prop="userName">
        <el-input v-model.trim="detail.userName"></el-input>
      </el-form-item>
      <el-form-item label="老师手机号：" prop="phone">
        <el-input v-model.trim="detail.phone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="所属单位：" prop="schoolId" v-if="userInfo.roleId === '1'">
        <el-select v-model="detail.schoolId" clearable placeholder="请选择">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级：" prop="gradeName">
        <el-select v-model="detail.gradeName" placeholder="请选择">
          <el-option value="大班">大班</el-option>
          <el-option value="中班">中班</el-option>
          <el-option value="小班">小班</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级：" prop="userName">
        <el-input v-model.trim="detail.className"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="$router.back()">取消并返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      detail: {
        phone: '',
        userName: '',
        schoolId: '',
        gradeName: '',
        className: ''
      },
      companyList: [],
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        schoolId: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        gradeName: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        className: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getCompanyList () {
      this.$api.post('/physical-report/class/list', {
        data: 0
      }).then(res => {
        if (res.code === '00000') {
          this.companyList = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    getTeacherInfo () {
      let id = this.$route.query.id
      if (!id) {
        return
      }
      this.$api.post('/physical-report/teacher/info', {
        data: { id }
      }).then(res => {
        if (res.code === '00000') {
          this.detail = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    addTeacher () {
      if (!/^1\d{10}/.test(this.detail.phone)) {
        this.$message({ message: '请输入正确的手机号', type: 'error' })
        return
      }
      this.$api.post('/physical-report/teacher/edit', {
        data: {
          id: this.$route.query.id || '',
          userName: this.detail.userName,
          phone: this.detail.phone,
          schoolId: this.detail.schoolId || this.userInfo.schoolId,
          gradeName: this.detail.gradeName,
          className: this.detail.className,
        }
      }).then(res => {
        if (res.code === '00000') {
          this.$router.back()
          this.$message({ message: '提交成功', type: 'success' })
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    submit () {
      this.$refs['detailForm'].validate((valid) => {
        if (valid) {
          return true
        } else {
          return false
        }
      })
      this.addTeacher()
    }
  },
  created () {
    if (this.userInfo.roleId === '1') {
      this.getCompanyList()
    }
    if (this.$route.query.id) {
      this.getTeacherInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.teacher-detail {
  padding-top: 80px;
}
.equip-row {
  display: flex;
  align-items: center;
}
</style>
