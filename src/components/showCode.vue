<template>
  <div class="show-code" @click="close">
    <div class="content" v-if="show">
      <div class="qrcode-box" id="qrCodeBox">
        <div id="qrCode"></div>
        <div class="name">{{codeObj.studentName}}</div>
        <div class="code">手环ID：{{codeObj.handCode}}</div>
      </div>
      <el-button type="primary" size="middle" @click.stop="drawCanvas(codeObj.handCode)">下载二维码</el-button>
    </div>
    <div class="content" v-else>
      <div class="notShow">
        <div class="qrcode-box" id="qrCodeBox">
          <div id="qrCode"></div>
          <div class="name">{{codeObj.studentName}}</div>
          <div class="code">ID：{{codeObj.handCode}}</div>
        </div>
      </div>
      <div class="loading">
        <i class="el-icon-loading"></i>
        <div class="text">二维码生成中, 请等待</div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'
export default {
  props: {
    codeObj: Object,
    name: String,
    show: Boolean
  },
  data () {
    return {
      qrcode: null
    }
  },
  methods: {
    close () {
      if (this.show) {
        this.$emit('over')
      }
    },
    initQrCode (code) {
      let _this = this
      if (_this.qrcode) {
        this.qrcode.clear()
        this.qrcode.makeCode(code)
      } else {
        _this.qrcode = new QRCode('qrCode', {
          width: 240,
          height: 240,
          text: code,
          colorLight: '#fff'
        })
      }
    },
    drawCanvas (code) {
      html2canvas(document.getElementById('qrCodeBox')).then(res => {
        this.download(res, code)
      })
    },
    download (canvasElement, fileName) {
      let MIME_TYPE = 'image/jpeg'
      let imgURL = canvasElement.toDataURL(MIME_TYPE)
      let dlLink = document.createElement('a')
      dlLink.download = fileName
      dlLink.href = imgURL
      dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

      document.body.appendChild(dlLink)
      dlLink.click()
      document.body.removeChild(dlLink)
      this.$emit('over')
    }
  },
  watch: {
    codeObj () {
      if (this.show) {
        this.initQrCode(this.codeObj.handCode)
      } else {
        this.initQrCode(this.codeObj.handCode)
        setTimeout(() => {
          this.drawCanvas(this.codeObj.handCode)
        })
      }
    }
  },
  mounted () {
    if (this.show) {
      this.initQrCode(this.codeObj.handCode)
    } else {
      this.initQrCode(this.codeObj.handCode)
      setTimeout(() => {
        this.drawCanvas(this.codeObj.handCode)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.show-code {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .6);
  z-index: 1000;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.qrcode-box {
  padding: 20px 20px 10px;
  margin-bottom: 20px;
  background: #fff;
  border-radius: 8px;
}
.notShow {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.name {
  margin-top: 8px;
  text-align: center;
  font-size: 20px;
}
.code {
  text-align: center;
  margin-top: 2px;
  font-size: 20px;
}
.qrCode {
  padding: 20px;
  width: 240px;
  height: 240px;
}
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
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
