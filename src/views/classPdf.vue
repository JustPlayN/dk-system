<template>
  <div class="downloadPdf">
    <el-form class="not-inline" label-width="240px" size="medium">
      <el-form-item label="选择单位：" required v-if="userInfo.roleId === '1'">
        <el-select v-model="companyId" clearable placeholder="请选择" @change="change($event)">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="体测日期：" required>
        <el-select v-model="date" clearable placeholder="请选择" :disabled="!companyId && userInfo.roleId === '1'">
          <el-option v-for="item in dateList" :key="item.dateTime" :label="item.dateTime" :value="item.dateTime"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getClassData">下载</el-button>
        <el-button type="primary" @click="singleDownload">单个下载</el-button>
        <el-button type="primary" @click="setPdfText" v-if="userInfo.roleId === '2'">报告表头设置</el-button>
      </el-form-item>
    </el-form>
    <download v-if="dataIndex > -1 && downloading" :obj="classData[dataIndex]" @over="getNowData()" />
    <div class="loading" v-if="loading || dataIndex > -1">
      <i class="el-icon-loading"></i>
      <div class="text">PDF生成中, 请等待</div>
    </div>
  </div>
</template>

<script>
import download from '@/components/classDownload'
import { mapGetters } from 'vuex'
export default {
  components: {
    download
  },
  data () {
    return {
      companyList: [],
      companyId: '',
      dateList: [],
      date: '',
      classData: [],
      dataIndex: -1,
      downloading: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    setPdfText () {
      this.$router.push({
        path: '/title',
        query: {
          dpath: this.$route.query.dpath || ''
        }
      })
    },
    getNowData () {
      if (this.dataIndex < this.classData.length - 1) {
        this.downloading = false
        setTimeout(() => {
          this.dataIndex ++
          this.downloading = true
        })
      } else {
        this.dataIndex = -1
        this.downloading = false
      }
    },
    change (val) {
      if (val) {
        this.date = ''
        this.dateList = []
        this.getDateList(val)
      }
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
    getDateList (val) {
      this.$api.post('/physical-report/merchant/timeList', {
        data: val
      }).then(res => {
        if (res.code === '00000') {
          this.dateList = res.data || []
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    singleDownload () {
      if (!this.date) {
        this.$message({ message: '请选体测日期', type: 'error' })
        return
      }
      this.$router.push({
        path: '/classPdfSingle',
        query: {
          dpath: this.$route.query.dpath || '',
          schoolId: this.companyId || this.userInfo.schoolId,
          date: this.date
        }
      })
    },
    getClassData () {
      if (this.loading) {
        return
      }
      if (!this.date) {
        this.$message({ message: '请选体测日期', type: 'error' })
        return
      }
      this.loading = true
      this.$api.post('/physical-report/class/report/pdf', {
        data: {
          schoolId: this.companyId || this.userInfo.schoolId,
          date: this.date
        }
      }).then(res => {
        if (res.code === '00000') {
          this.classData = res.data || []
          if (this.classData.length > 0) {
            this.dataIndex = 0
            this.downloading = true
          }
          this.loading = false
        } else {
          this.loading = false
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    }
  },
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
    if (this.userInfo.roleId === '1') {
      this.getCompanyList()
    } else {
      this.getDateList(this.userInfo.schoolId)
    }
  }
}
</script>

<style lang="less" scoped>
.downloadPdf {
  padding-top: 80px;
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .6);
  z-index: 1000;
  color: #fff;
  .el-icon-loading {
    font-size: 60px;
  }
  .text {
    margin-top: 10px;
    font-size: 20px;
  }
}
</style>
