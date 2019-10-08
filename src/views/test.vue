<template>
  <div class="test">
    <el-form ref="searchForm" :inline="true" :model="searchObj" label-width="120px" size="medium">
      <el-form-item label="孩子姓名：" prop="name">
        <el-input v-model="searchObj.name"></el-input>
      </el-form-item>
      <el-form-item label="家长手机号：" prop="phone">
        <el-input v-model="searchObj.phone"></el-input>
      </el-form-item>
      <el-form-item label="老师手机号：" prop="teacherPhone">
        <el-input v-model="searchObj.teacherPhone"></el-input>
      </el-form-item>
      <el-form-item label="所属单位" prop="company">
        <el-select v-model="searchObj.company" clearable placeholder="请选择">
          <el-option label="1岁" :value="1"></el-option>
          <el-option label="2岁" :value="2"></el-option>
          <el-option label="3岁" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测试范围：" prop="range">
        <el-select v-model="searchObj.range" clearable placeholder="请选择">
          <el-option label="10米折返跑" :value="1"></el-option>
          <el-option label="2岁" :value="2"></el-option>
          <el-option label="3岁" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="得分：" prop="score">
        <el-select v-model="searchObj.score" clearable placeholder="请选择">
          <el-option label="10分" :value="1"></el-option>
          <el-option label="2分" :value="2"></el-option>
          <el-option label="3分" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="测试时间：" prop="date">
        <el-date-picker
          v-model="searchObj.date"
          type="daterange"
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
      <el-table-column prop="id" label="记录id"></el-table-column>
      <el-table-column prop="name" label="孩子姓名"></el-table-column>
      <el-table-column prop="range" label="测试范围"></el-table-column>
      <el-table-column prop="grade" label="成绩"></el-table-column>
      <el-table-column prop="score" label="得分"></el-table-column>
      <el-table-column prop="phone" label="家长手机号"></el-table-column>
      <el-table-column prop="teachrePhone" label="老师手机号"></el-table-column>
      <el-table-column prop="company" label="所属单位"></el-table-column>
      <el-table-column prop="time" label="体测时间"></el-table-column>
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
        name: '',
        phone: '',
        teacherPhone: '',
        range: '',
        company: '',
        score: '',
        date: ''
      },
      tableData: [{
        id: '1',
        name: 'Justin',
        range: '测试项目名称',
        grade: '3',
        score: '99',
        phone: '18990090000',
        teacherPhone: '18990090000',
        company: '杭州幼儿园',
        time: '2018/12/12'
      }]
    }
  },
  computed: {
    ...mapGetters(['page'])
  },
  methods: {
    ...mapActions(['putPage']),
    search () { console.log('search') },
    reset () {
      this.$refs['searchForm'].resetFields()
    },
    click (obj) {
      console.log(obj)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
