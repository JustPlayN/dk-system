<template>
  <div class="teacher-detail">
    <el-form class="not-inline" ref="detailForm" :rules="rules" :model="detail" label-width="240px" size="medium">
      <el-form-item label="孩子姓名：" prop="studentName">
        <el-input v-model.trim="detail.studentName"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="userName">
        <el-radio v-model="detail.sex" :label="1">男</el-radio>
        <el-radio v-model="detail.sex" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="出生日期：" prop="birthday">
        <el-date-picker
          v-model="detail.birthday"
          type="date"
          value-format="timestamp"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属学校：" prop="schoolId" v-if="userInfo.roleId === '1'">
        <el-select v-model="detail.schoolId" clearable placeholder="请选择" @change="getCompanyList(1)">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级：" prop="gradeId">
        <el-select v-model="detail.gradeId" clearable placeholder="请选择" @change="getCompanyList(2)">
          <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班级：" prop="classId">
        <el-select v-model="detail.classId" clearable placeholder="请选择">
          <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学号：" prop="studentNo">
        <el-input v-model.trim="detail.studentNo"></el-input>
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
        studentNo: '',    // 学生学号
        studentName: '',  // 学生姓名
        sex: 1,           // 1：男，2：女
        birthday: null,      // 精确到毫秒
        gradeId: '',      // 年级
        classId: '',      // 班级
      },
      companyList: [],
      gradeList: [],
      classList: [],
      rules: {
        studentNo: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        studentName: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择生日', trigger: 'change' }
        ],
        gradeId: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        schoolId: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ],
        classId: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getCompanyList (val) {
      let id = 0
      if (val === 1) {
        id = this.detail.schoolId
      } else if (val === 2) {
        id = this.detail.gradeId
      }
      this.$api.post('/physical-report/class/list', {
        data: id
      }).then(res => {
        if (res.code === '00000') {
          if (val === 0) {
            this.companyList = res.data
          } else if (val === 1) {
            this.gradeList = res.data
          } else {
            this.classList = res.data
          }
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
      this.$api.post('/physical-report/student/info', {
        data: { id }
      }).then(res => {
        if (res.code === '00000') {
          this.detail = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    addChild () {
      this.$api.post('/physical-report/student/edit', {
        data: {
          id: this.$route.query.id || '',
          schoolId: this.detail.schoolId || this.userInfo.schoolId,
          studentNo: this.detail.studentNo,
          studentName: this.detail.studentName,
          sex: this.detail.sex,
          birthday: this.detail.birthday,
          gradeId: this.detail.gradeId,
          classId: this.detail.classId,
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
      this.addChild()
    }
  },
  created () {
    if (this.userInfo.roleId === '1') {
      this.getCompanyList(0)
    } else {
      this.getCompanyList(1)
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
