<template>
  <div class="show-code" @click="$emit('close')">
    <div class="qrcode-box">
      <div id="qrCode"></div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  props: {
    code: String
  },
  methods: {
    initQrCode () {
      let _this = this
      let qrcode = new QRCode('qrCode', {
        width: 360,
        height: 360,
        text: _this.code,
        colorDark: '#17AFF3',
        colorLight: '#fff'
      })
      console.log(qrcode)
    }
  },
  mounted () {
    this.initQrCode()
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
.qrcode-box {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}
.qrCode {
  padding: 20px;
  width: 360px;
  height: 360px;
}
</style>
