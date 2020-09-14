<template>
  <div class="download-single">
    <el-form class="not-inline" label-width="240px" size="medium">
      <el-form-item label="选择学生：" required v-if="parentData.length">
        <el-select v-model="nowIdx" filterable placeholder="请选择">
          <el-option v-for="(item, index) in parentData" :key="index" :label="item.basicDto.studentName" :value="index"></el-option>
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
    <download v-if="nowParent" ref="download" :obj="nowParent" @painted="loading = null" />
    <div class="loading" v-if="loading">
      <i class="el-icon-loading"></i>
      <div class="text">{{loading === 1 ? '数据加载中' : 'PDF生成中'}}, 请等待</div>
    </div>
  </div>
</template>

<script>
import download from '@/components/singleDownload'
export default {
  components: {
    download
  },
  data () {
    return {
      parentData: [],
      nowIdx: 0,
      nowParent: null,
      loading: false
    }
  },
  methods: {
    getParentData () {
      this.loading = 1
      this.$api.post('/physical-report/parent/report/pdf', {
        data: {
          classId: this.$route.query.classId,
          date: this.$route.query.date
        }
      }).then(res => {
        this.loading = false
        if (res.code === '00000') {
          this.parentData = res.data || []
          if (this.parentData.length === 0) {
            this.$message({ message: '没有可下载的家长报告', type: 'error' })
          }
        } else {
          this.$message({ message: res.msg || '网络异常请稍后重试', type: 'error' })
        }
      })
    },
    createPdf () {
      if (this.parentData.length === 0) {
        this.$message({ message: '没有可下载的家长报告', type: 'error' })
        return
      }
      this.nowParent = null
      this.loading = true
      setTimeout(() => {
        this.nowParent = this.parentData[this.nowIdx]
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
    this.getParentData()
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
