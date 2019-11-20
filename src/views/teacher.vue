<template>
  <div class="teacher">
    <el-form ref="searchForm" :inline="true" :model="searchObj" label-width="120px" size="medium">
      <el-form-item label="老师姓名：" prop="userName">
        <el-input v-model.trim="searchObj.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="老师手机号：" prop="userPhone">
        <el-input v-model.trim="searchObj.userPhone" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属单位：" prop="companyId" v-if="userInfo.roleId === '1'">
        <el-select v-model="searchObj.companyId" clearable placeholder="请选择" @change="change">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="年级：" prop="gradeId" v-if="userInfo.roleId === '1'">
        <el-select v-model="searchObj.gradeId" clearable placeholder="请选择" :disabled="!searchObj.companyId">
          <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
          :on-success="upload"
          action="/physical-report/teacher/upload">
          <el-button type="primary" size="medium">批量导入</el-button>
        </el-upload>
      </el-col>
      <el-col :span="4">
        <el-link type="primary" style="margin-left: 20px" href="https://www.edolphin.cn/physical-report/file/teacher_import_template.xls">下载模版</el-link>
      </el-col>
    </el-row>
    <el-table :data="tableData" border header-row-class-name="table-header" size="medium">
      <el-table-column prop="id" label="老师id"></el-table-column>
      <el-table-column prop="userName" label="老师姓名"></el-table-column>
      <el-table-column prop="userPhone" label="老师手机号(登录小程序手机号)"></el-table-column>
      <el-table-column prop="companyName" label="所在单位"></el-table-column>
      <el-table-column prop="gradeName" label="年级"></el-table-column>
      <el-table-column prop="className" label="班级"></el-table-column>
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
        userName: '',
        userPhone: '',
        companyId: '',
        gradeId: ''
      },
      companyList: [],
      gradeList: [],
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['page', 'userInfo'])
  },
  methods: {
    ...mapActions(['putPage']),
    upload (res) {
      if (res.success) {
        this.search()
        this.$message({ message: '导入成功', type: 'success' })
      } else {
        this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
      }
    },
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
      this.searchObj.gradeId = ''
      if (value) {
        this.getGradeList()
      } else {
        this.gradeList = []
        this.companyId = ''
      }
    },
    getDataList () {
      this.$api.post('/physical-report/teacher/list', {
        data: {
          userName: this.searchObj.userName || null,
          userPhone: this.searchObj.userPhone || null,
          companyId: this.searchObj.companyId || null,
          gradeId: this.searchObj.gradeId || null
        },
        page: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        }
      }).then(res => {
        if (res.code === '00000') {
          this.tableData = res.data
          this.putPage({ total: (res.page && res.page.count) || 0 })
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    getGradeList () {
      this.$api.post('/physical-report/class/list', {
        data: this.searchObj.companyId
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
    }
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
