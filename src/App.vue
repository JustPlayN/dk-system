<template>
  <el-container v-if="userInfo.roleId">
    <el-aside style="width: 200px">
      <div class="logo-box">
        <img class="logo" src="@/assets/logo.png" /><div class="title">享智云</div>
      </div>
      <el-menu
        :default-active="dpath"
        background-color="rgb(4, 17, 31)"
        text-color="#fff"
        active-text-color="#fff">
        <el-submenu v-for="(menu, index) in menu[userInfo.roleId]" :key="index" :index="`${index + 1}`">
          <template slot="title"><i class="icon" :class="menu.icon"></i>{{menu.title}}</template>
          <el-menu-item-group>
          <el-menu-item v-for="(child, num) in menu.children" :key="`${index + 1}${num + 1}`" :index="`${index + 1}-${num + 1}`" @click="routerTo(child, `${index + 1}-${num + 1}`)">
            {{child.title}}
          </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container class="inside-container">
      <el-header class="header">
        <!-- <div class="content" v-if="notice && userInfo.roleId === '1'">通知：{{notice}}</div> -->
        <div class="content"></div>
        <div class="right">
          <el-dropdown @command="signout">
            <i class="el-icon-setting"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span class="name" v-if="userInfo.roleId === '1'">admin</span>
          <span class="name" v-else>{{userInfo.userName}}</span>
        </div>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <login v-else />
</template>
<script>
import Login from './components/Login'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Login
  },
  data () {
    return {
      // notice: '',
      menu: {
        '1': [{
          title: '数据仪表盘',
          router: '',
          icon: 'el-icon-s-platform',
          children: [{
            title: '数据看板',
            router: '/'
          }, {
            title: '地图分布',
            router: '/map'
          }, {
            title: '可视化看板',
            router: 'http://datav.aliyuncs.com/share/50a41e1c4ae03fdffe1feb577557fa36'
          }]
        }, {
          title: '商户管理',
          router: '',
          icon: 'el-icon-s-shop',
          children: [{
            title: '商户列表',
            router: '/merchant'
          }]
        }, {
          title: '用户信息管理',
          router: '',
          icon: 'el-icon-s-custom',
          children: [{
            title: '老师列表',
            router: '/teacher'
          }, {
            title: '家长列表',
            router: '/parent'
          }, {
            title: '孩子列表',
            router: '/children'
          }]
        }, {
          title: '体测数据',
          router: '',
          icon: 'el-icon-s-data',
          children: [{
            title: '体测数据列表',
            router: '/test'
          }, {
            title: '家长pdf下载',
            router: '/pdf'
          }]
        }, {
          title: '公告管理',
          router: '',
          icon: 'el-icon-message-solid',
          children: [{
            title: '公告管理',
            router: '/addNotice'
          }]
        }, {
          title: '账号设置',
          router: '',
          icon: 'el-icon-s-tools',
          children: [{
            title: '修改密码',
            router: '/password'
          }]
        }],
        '2': [{
          title: '数据仪表盘',
          router: '',
          icon: 'el-icon-s-platform',
          children: [{
            title: '数据看板',
            router: '/'
          }]
        }, {
          title: '设备管理',
          router: '',
          icon: 'el-icon-s-order',
          children: [{
            title: '设备列表',
            router: '/equipList'
          }]
        }, {
          title: '用户信息管理',
          router: '',
          icon: 'el-icon-s-custom',
          children: [{
            title: '老师列表',
            router: '/teacher'
          }, {
            title: '家长列表',
            router: '/parent'
          }, {
            title: '孩子列表',
            router: '/children'
          }]
        }, {
          title: '体测数据',
          router: '',
          icon: 'el-icon-s-data',
          children: [{
            title: '体测数据列表',
            router: '/test'
          }, {
            title: '家长pdf下载',
            router: '/pdf'
          }]
        }, {
          title: '账号设置',
          router: '',
          icon: 'el-icon-s-tools',
          children: [{
            title: '基础信息',
            router: '/setting'
          }, {
            title: '修改密码',
            router: '/password'
          }]
        }],
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'dpath'])
  },
  methods: {
    ...mapActions(['putPage']),
    routerTo (obj, dpath) {
      this.putPage({
        pageSize: 10,
        currentPage: 1
      })
      if (obj.title === '可视化看板') {
        window.location.href = obj.router
      } else {
        this.$router.replace({
          path: obj.router,
          query: {
            dpath
          }
        })
      }
    },
    signout () {
      this.$router.replace({
        path: '/',
        query: {
          dpath: '1-1'
        }
      })
      this.$store.dispatch('putDpath', '1-1')
      this.$utils.setCookie('userInfo', '')
      this.$store.dispatch('putUserInfo', {})
    },
    // getNotice () {
    //   this.$api.post('/physical-report/message/get', {
    //     data: this.userInfo.roleId
    //   }).then(res => {
    //     if (res.success && res.data) {
    //       let time = + new Date()
    //       if (time < res.data.endTime && time > res.data.startTime) {
    //         this.notice = res.data.content
    //       }
    //     }
    //   })
    // }
  },
  created () {
    let userInfo = this.$utils.getCookie('userInfo')
    userInfo = userInfo ? JSON.parse(userInfo) : ''
    if (userInfo) {
      this.$store.dispatch('putUserInfo', userInfo)
    } else {
      this.$store.dispatch('putUserInfo', {})
    }
    // this.getNotice()
  }
}
</script>
<style lang="less">
.el-container {
  height: 100vh;
  border: 1px solid #eee;
  background: rgb(239, 239, 239);
  overflow: hidden;
}
.logo-box {
  display: flex;
  align-items: center;
  padding: 20px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  .logo {
    margin-right: 10px;
    width: 40px;
    height: 40px;
  }
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  text-align: right;
  font-size: 12px;
  line-height: 60px;
  .content {
    font-size: 16px;
    color: #f40;
  }
  .right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .el-icon-setting {
    margin-right: 8px;
  }
  .name {
    padding-right: 20px;
  }
}
.el-aside {
  min-height: 100%;
  background: rgb(4, 17, 31);
  overflow: auto;
  padding-bottom: 80px;
}
.el-menu {
  border-right: none !important;
  .el-menu-item.is-active {
    background: rgb(51, 126, 204) !important;
  }
  .icon {
    color: rgb(51, 126, 204);
    margin-right: 8px;
    font-size: 20px;
  }
}
.el-main {
  margin: 20px;
  background: #fff;
  border-radius: 4px;
}
</style>
