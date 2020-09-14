<template>
  <div class="download-single">
    <el-form class="not-inline" label-width="240px" size="medium">
      <el-form-item label="选择班级：" required v-if="classData.length">
        <el-select v-model="nowIdx" filterable placeholder="请选择">
          <el-option v-for="(item, index) in classData" :key="index" :label="item.basicDto.className" :value="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="温馨提示：" required v-else>
        没有可下载的PDF
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createPdf">生成PDF</el-button>
        <el-button type="primary" @click="createPdf">重新生成PDF</el-button>
        <el-button type="primary" @click="downloadPdf">下载PDF</el-button>
      </el-form-item>
    </el-form>
    <download v-if="nowClass" ref="download" :obj="nowClass" @painted="loading = null" />
    <div class="loading" v-if="loading">
      <i class="el-icon-loading"></i>
      <div class="text">{{loading === 1 ? '数据加载中' : 'PDF生成中'}}, 请等待</div>
    </div>
  </div>
</template>

<script>
import download from '@/components/singleClassDownload'
export default {
  components: {
    download
  },
  data () {
    return {
      classData: [],
      nowIdx: 0,
      nowClass: null,
      loading: false
    }
  },
  methods: {
    getClassData () {
      this.loading = 1
      this.$api.post('/physical-report/class/report/pdf', {
        data: {
          schoolId: this.$route.query.schoolId,
          date: this.$route.query.date,
        }
      }).then(res => {
        this.loading = false
        if (res.code === '00000') {
          this.classData = res.data || []
          if (this.classData.length === 0) {
            this.$message({ message: '没有可下载的班级报告', type: 'error' })
          }
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    createPdf () {
      if (this.classData.length === 0) {
        this.$message({ message: '没有可下载的班级报告', type: 'error' })
        return
      }
      this.nowClass = null
      this.loading = true
      setTimeout(() => {
        this.nowClass = this.classData[this.nowIdx]
      }, 100)
    },
    downloadPdf () {
      if (this.$refs.download) {
        this.$refs.download.downloadPdf()
      } else {
        this.$message({ message: '请先生成PDF', type: 'error' })
      }
    }
  },
  created () {
    this.getClassData()
  }
}
</script>

<style lang="less" scoped>
.download-single {
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
