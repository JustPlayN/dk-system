<template>
  <div class="teacher">
    <el-form ref="searchForm" :inline="true" :model="searchObj" label-width="120px" size="medium">
      <el-form-item label="孩子姓名：" prop="studentName">
        <el-input v-model="searchObj.studentName"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-select v-model="searchObj.sex" clearable placeholder="请选择">
          <el-option label="男" :value="1"></el-option>
          <el-option label="女" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="家长手机号：" prop="parentPhone">
        <el-input v-model="searchObj.parentPhone"></el-input>
      </el-form-item>
      <el-form-item label="老师手机号：" prop="teacherPhone">
        <el-input v-model="searchObj.teacherPhone"></el-input>
      </el-form-item>
      <el-form-item label="所属单位" prop="schoolId" v-if="userInfo.roleId === '1'">
        <el-select v-model="searchObj.schoolId" clearable placeholder="请选择" @change="change">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级：" prop="gradeId" v-if="userInfo.roleId === '1'">
        <el-select v-model="searchObj.gradeId" clearable placeholder="请选择" :disabled="!searchObj.schoolId">
          <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年龄：" prop="beginAge">
        <el-select v-model="searchObj.beginAge" clearable placeholder="请选择">
          <el-option label="1岁" :value="1"></el-option>
          <el-option label="2岁" :value="2"></el-option>
          <el-option label="3岁" :value="3"></el-option>
          <el-option label="4岁" :value="4"></el-option>
          <el-option label="5岁" :value="5"></el-option>
        </el-select>
        <span>～</span>
        <el-select v-model="searchObj.endAge" clearable placeholder="请选择">
          <el-option label="1岁" :value="1"></el-option>
          <el-option label="2岁" :value="2"></el-option>
          <el-option label="3岁" :value="3"></el-option>
          <el-option label="5岁" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row v-if="userInfo.roleId === '1'">
      <el-col :span="2">
        <el-upload
          class="upload-demo"
          :show-file-list="false"
          :on-success="search"
          action="/physical-report/student/upload">
          <el-button type="primary" size="medium">批量导入</el-button>
        </el-upload>
      </el-col>
      <el-col :span="4">
        <el-link type="primary" style="margin-left: 20px" href="https://www.edolphin.cn/physical-report/file/student_template.xls">下载模版</el-link>
      </el-col>
    </el-row>
    <el-table :data="tableData" border header-row-class-name="table-header" size="medium">
      <el-table-column prop="id" label="孩子id"></el-table-column>
      <el-table-column prop="studentName" label="孩子姓名"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">{{scope.row.sex === 1 ? '男' : '女'}}</template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="teacherPhone" label="老师手机号"></el-table-column>
      <el-table-column prop="schoolName" label="所属单位"></el-table-column>
      <el-table-column prop="gradeName" label="所属年级"></el-table-column>
      <el-table-column prop="className" label="所属班级"></el-table-column>
      <el-table-column prop="studentNo" label="学号"></el-table-column>
      <el-table-column prop="handCode" label="绑定手环Id"></el-table-column>
      <el-table-column prop="parentPhone" label="家长手机号"></el-table-column>
      <el-table-column label="操作" width="120px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="click(scope.row)">换绑</el-button>
          <el-button type="text" size="small">手环二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      searchObj: {
        studentName: '',
        parentPhone: '',
        teacherPhone: '',
        sex: null,
        beginAge: '',
        endAge: '',
        schoolId: '',
        gradeId: ''
      },
      showDownload: true,
      tableData: [],
      gradeList: [],
      companyList: []
    }
  },
  computed: {
    ...mapGetters(['page', 'userInfo'])
  },
  methods: {
    ...mapActions(['putPage']),
    search () {
      this.putPage({ currentPage: 1 })
      this.getDataList()
    },
    reset () {
      this.$refs['searchForm'].resetFields()
      this.search()
    },
    click (obj) {
      console.log(obj)
    },
    handleSizeChange (val) {
      if (val !== this.page.pageSize) {
        this.putPage({ pageSize: val })
        this.search()
      }
    },
    handleCurrentChange (val) {
      if (val !== this.page.currentPage) {
        this.putPage({ currentPage: val })
        this.getDataList()
      }
    },
    change (value) {
      if (value) {
        this.getGradeList()
      } else {
        this.companyList = []
        this.schoolId = ''
      }
    },
    getDataList () {
      this.$api.post('/physical-report/student/list', {
        data: {
          studentName: this.searchObj.studentName || null,
          parentPhone: this.searchObj.pageSize || null,
          teacherPhone: this.searchObj.teacherPhone || null,
          sex: this.searchObj.sex || null,
          beginAge: this.searchObj.beginAge || null,
          endAge: this.searchObj.endAge || null,
          schoolId: this.searchObj.schoolId || null,
          gradeId: this.searchObj.gradeId || null
        },
        page: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        }
      }).then(res => {
        if (res.code === '00000') {
          this.tableData = res.data
          this.putPage({ total: res.page.count })
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    getGradeList () {
      this.$api.post('/physical-report/class/list', {
        data: this.searchObj.schoolId
      }).then(res => {
        if (res.code === '00000') {
          this.gradeList = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
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
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    this.getDataList()
    this.getCompanyList()
  }
}
</script>

<style lang="less" scoped>
</style>
