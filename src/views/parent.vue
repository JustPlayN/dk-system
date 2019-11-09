<template>
  <div class="teacher">
    <el-form ref="searchForm" :inline="true" :model="searchObj" label-width="120px" size="medium">
      <el-form-item label="家长手机号：" prop="phone">
        <el-input v-model.trim="searchObj.phone"></el-input>
      </el-form-item>
      <el-form-item label="孩子姓名：" prop="childName">
        <el-input v-model.trim="searchObj.childName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border header-row-class-name="table-header" size="medium">
      <el-table-column prop="parentId" label="家长id"></el-table-column>
      <el-table-column prop="phone" label="家长手机号"></el-table-column>
      <el-table-column prop="childName" label="孩子姓名"></el-table-column>
      <el-table-column prop="handCode" label="绑定手环id"></el-table-column>
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
        childName: '',
        phone: ''
      },
      tableData: []
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
      this.$api.post('/physical-report/parent/list', {
        data: {
          childName: this.search.childName || null,
          phone: this.search.phone || null
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
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    this.getDataList()
  }
}
</script>

<style lang="less" scoped>
</style>
