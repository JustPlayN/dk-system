<template>
  <div class="equip-list">
    商户设备列表
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('putDpath', this.$route.query.dpath || '1-1')
  }
}
</script>

<style lang="less" scoped>
</style>
