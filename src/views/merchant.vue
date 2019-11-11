<template>
  <div class="merchant">
    <el-form ref="searchForm" :inline="true" :model="searchObj" label-width="120px" size="medium">
      <el-form-item label="姓名：" prop="userName">
        <el-input v-model.trim="searchObj.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="userPhone">
        <el-input v-model.trim="searchObj.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="所在城市：" prop="cityId">
        <el-select v-model="searchObj.cityId" clearable placeholder="请选择">
          <el-option v-for="city in cityList" :label="city.cityName" :value="city.cityId" :key="city.cityId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button type="primary" @click="click()" size="medium">新增商户</el-button>
    </el-row>
    <el-table :data="tableData" border header-row-class-name="table-header" size="medium">
      <el-table-column prop="id" label="商户id" width="70px"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="80px"></el-table-column>
      <el-table-column prop="companyName" label="单位名称"></el-table-column>
      <el-table-column prop="userPhone" label="手机号" width="120px"></el-table-column>
      <el-table-column prop="cityName" label="所在城市" width="80px"></el-table-column>
      <el-table-column prop="addr" label="详细地址"></el-table-column>
      <el-table-column prop="deviceNum" label="设备"></el-table-column>
      <el-table-column prop="pwd" label="商户后台密码" width="120px"></el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="click(scope.row.id, 1)">查看</el-button>
          <el-button type="text" size="small" @click="click(scope.row.id)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
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
        userName: '',
        userPhone: '',
        cityId: ''
      },
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['page', 'cityList'])
  },
  methods: {
    ...mapActions(['putPage', 'getCityList']),
    search () {
      this.putPage({ currentPage: 1 })
      this.getDataList()
    },
    reset () {
      this.$refs['searchForm'].resetFields()
      this.search()
    },
    click (id, type) {
      this.$router.push({
        path: '/addMerchant',
        query: {
          id,
          type,
          dpath: this.$route.query.dpath || ''
        }
      })
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
      this.$api.post('/physical-report/supplier/list', {
        data: {
          userName: this.searchObj.userName || null,
          userPhone: this.searchObj.userPhone || null,
          cityId: this.searchObj.cityId || null
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
    deleteItem (id) {
      this.$confirm('确定删除该商户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/physical-report/supplier/list', {
          data: { id }
        }).then(res => {
          if (res.code === '00000') {
            this.$message({ message: '删除成功', type: 'success' })
          } else {
            this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
          }
        })
      })
    }
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    this.getDataList()
    if (this.cityList.length === 0) {
      this.getCityList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
