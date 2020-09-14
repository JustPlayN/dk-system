<template>
  <div class="downloadPdf">
    <el-form class="not-inline" label-width="240px" size="medium">
      <el-form-item label="选择单位：" required v-if="userInfo.roleId === '1'">
        <el-select v-model="companyId" clearable placeholder="请选择" @change="change($event, 1)">
          <el-option v-for="item in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择年级：" required>
        <el-select v-model="gradeId" clearable placeholder="请选择" :disabled="!companyId && gradeList.length === 0" @change="change($event, 2)">
          <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择班级：" required>
        <el-select v-model="classId" clearable placeholder="请选择" :disabled="!gradeId" @change="change($event, 3)">
          <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="体测日期：" required>
        <el-select v-model="date" clearable placeholder="请选择" :disabled="!classId">
          <el-option v-for="item in dateList" :key="item.dateTime" :label="item.dateTime" :value="item.dateTime"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getParentData">下载</el-button>
        <el-button type="primary" @click="singleDownload">单个下载</el-button>
        <el-button type="primary" @click="setPdfText" v-if="userInfo.roleId === '2'">报告表头设置</el-button>
      </el-form-item>
    </el-form>
    <download v-if="dataIndex > -1 && downloading" :obj="parentData[dataIndex]" @over="getNowData()" />
    <div class="loading" v-if="loading || dataIndex > -1">
      <i class="el-icon-loading"></i>
      <div class="text">PDF生成中, 请等待</div>
    </div>
  </div>
</template>

<script>
import download from '@/components/download'
import { mapGetters } from 'vuex'
export default {
  components: {
    download
  },
  data () {
    return {
      companyList: [],
      companyId: '',
      gradeList: [],
      gradeId: '',
      classList: [],
      classId: '',
      dateList: [],
      date: '',
      parentData: [],
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
      if (this.dataIndex < this.parentData.length - 1) {
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
    change (val, type) {
      if (val) {
        if (type === 1) {
          this.gradeId = ''
          this.classId = ''
          this.date = ''
          this.gradeList = []
          this.getGradeList(val)
        } else if (type === 2) {
          this.classId = ''
          this.date = ''
          this.classList = []
          this.getClassList(val)
        } else {
          this.date = ''
          this.dateList = []
          this.getDateList(val)
        }
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
    getGradeList (val) {
      this.$api.post('/physical-report/class/list', {
        data: val
      }).then(res => {
        if (res.code === '00000') {
          this.gradeList = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    getClassList (val) {
      this.$api.post('/physical-report/class/list', {
        data: val
      }).then(res => {
        if (res.code === '00000') {
          this.classList = res.data
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    getDateList (val) {
      this.$api.post('/physical-report/mini/timeList', {
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
      if (!this.classId) {
        this.$message({ message: '请选择班级', type: 'error' })
        return
      } else if (!this.date) {
        this.$message({ message: '请选体测日期', type: 'error' })
        return
      }
      this.$router.push({
        path: '/downloadPdfSingle',
        query: {
          dpath: this.$route.query.dpath || '',
          classId: this.classId,
          date: this.date
        }
      })
    },
    getParentData () {
      if (this.loading) {
        return
      }
      if (!this.classId) {
        this.$message({ message: '请选择班级', type: 'error' })
        return
      } else if (!this.date) {
        this.$message({ message: '请选体测日期', type: 'error' })
        return
      }
      this.loading = true
      this.$api.post('/physical-report/parent/report/pdf', {
        data: {
          classId: this.classId,
          date: this.date
        }
      }).then(res => {
        if (res.code === '00000') {
          this.parentData = res.data || []
          if (this.parentData.length > 0) {
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
      this.getGradeList(this.userInfo.schoolId)
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
