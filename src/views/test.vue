<template>
  <div class="test">
    <el-form ref="searchForm" :inline="true" :model="searchObj" label-width="120px" size="medium">
      <el-form-item label="孩子姓名：" prop="studentName">
        <el-input v-model.trim="searchObj.studentName" clearable></el-input>
      </el-form-item>
      <el-form-item label="家长手机号：" prop="parentPhone">
        <el-input v-model.trim="searchObj.parentPhone" clearable></el-input>
      </el-form-item>
      <el-form-item label="老师手机号：" prop="teacherPhone">
        <el-input v-model.trim="searchObj.teacherPhone" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属单位" prop="companyId">
        <el-select v-model="searchObj.companyId" clearable placeholder="请选择">
          <el-option v-for="item in companyList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测试范围：" prop="fieldId">
        <el-select v-model="searchObj.fieldId" clearable placeholder="请选择">
          <el-option v-for="a in equipments" :label="a.deviceType" :value="a.id" :key="a.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="得分：" prop="score">
        <el-select v-model="searchObj.score" clearable placeholder="请选择">
          <el-option label="1分" :value="1"></el-option>
          <el-option label="2分" :value="2"></el-option>
          <el-option label="3分" :value="3"></el-option>
          <el-option label="4分" :value="4"></el-option>
          <el-option label="5分" :value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测试时间：" prop="date">
        <el-date-picker
          v-model="searchObj.date"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="reset">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border header-row-class-name="table-header" size="medium">
      <el-table-column prop="studentNo" label="记录id" width="80px"></el-table-column>
      <el-table-column prop="studentName" label="孩子姓名" width="100px"></el-table-column>
      <el-table-column prop="fieldName" label="测试范围"></el-table-column>
      <el-table-column prop="fieldValue" label="成绩" width="100px"></el-table-column>
      <el-table-column prop="score" label="得分" width="80px"></el-table-column>
      <el-table-column prop="parentPhone" label="家长手机号" width="110px"></el-table-column>
      <el-table-column prop="teachrePhone" label="老师手机号" width="110px"></el-table-column>
      <el-table-column prop="schoolName" label="所属单位"></el-table-column>
      <el-table-column label="体测时间" width="100px">
        <template slot-scope="scope">
          <div v-if="scope.row.date">{{scope.row.date | formatDate('YYYY/MM/DD')}}</div>
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
        companyId: '',
        fieldId: '',
        score: '',
        date: null
      },
      tableData: [],
      equipments: [],
      companyList: []
    }
  },
  computed: {
    ...mapGetters(['page'])
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
    getDataList () {
      this.$api.post('/physical-report/record/list', {
        data: {
          studentName: this.searchObj.studentName || null,
          parentPhone: this.searchObj.parentPhone || null,
          teacherPhone: this.searchObj.teacherPhone || null,
          companyId: this.searchObj.companyId || null,
          fieldId: this.searchObj.fieldId || null,
          score: this.searchObj.score || null,
          startTime: this.searchObj.date && this.searchObj.date.length > 0 ? this.searchObj.date[0] : null,
          endTime: this.searchObj.date && this.searchObj.date.length > 0 ? this.searchObj.date[1] : null
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
    getEquipments () {
      this.$api.post('/physical-report/device/attribute/list', {
        data: {}
      }).then(res => {
        if (res.code === '00000') {
          this.equipments = res.data
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
    this.getDataList()
    this.getEquipments()
    this.getCompanyList()
  }
}
</script>

<style lang="less" scoped>
</style>
