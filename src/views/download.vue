<template>
  <div class="download">
    <div id="download" class="box-one">
      <div class="top">
        <div class="left">
          <div class="title">享智云幼儿体质测评报告</div>
          <div class="title-text">我们将针对不同年龄段的孩子提供定制化的精准体质测试，该测试目前主要包含8大项，此外我们还为您的孩子提供了科学的训练方案。</div>
        </div>
        <img class="logo" src="../assets/logo.png" />
      </div>
      <div class="content">
        <div class="school-title">杭州市树小幼儿园</div>
        <div class="school-info">
          <div class="name">班级：</div>
          <div class="desc">第一幼儿园</div>
          <div class="name">班级：</div>
          <div class="desc">第一幼儿园</div>
        </div>
        <circle-chart :obj="circleData" />
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import circleChart from '@/components/personalCircle'
export default {
  components: {
    circleChart
  },
  data () {
    return {
      circleData: {
        segmentUrl: 'https://www.edolphin.cn/img/lh.png',
        segment: 90,
        percent: 80,
        score: 30 || 0,
        preScore: 20,
      }
    }
  },
  methods: {
    drawCanvas () {
      html2canvas(document.getElementById('download'), {
        canvas: document.getElementById('downloadBox')
      }).then(res => {
        this.download(res, 'download')
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
  mounted () {
    // this.drawCanvas()
  }
}
</script>

<style lang="less" scoped>
.box-one {
  width: 1190px;
  color: #484D57;
  .top {
    display: flex;
    align-items: center;
    padding: 48px;
    background: #31BFFF;
    color: #fff;
    .title {
      font-size: 36px;
      line-height: 50px;
    }
    .title-text {
      margin-top: 16px;
      font-size: 20px;
      line-height: 28px;
    }
    .logo {
      width: 112px;
      height: 112px;
      flex-shrink: 0;
    }
  }
  .content {
    padding: 48px;
    .school-title {
      font-size: 32px;
      line-height: 44px;
      color: #17AFF3;
    }
    .school-info {
      display: flex;
      align-items: center;
      margin-top: 24px;
      font-size: 22px;
      line-height: 32px;
      .name {
        color: #9197A3;
      }
      .desc {
        margin-right: 100px;
      }
    }
  }
}
</style>
