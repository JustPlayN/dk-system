<template>
  <el-container v-if="isLogin">
    <el-aside style="width: 200px">
      <div class="logo-box">
        <img class="logo" src="@/assets/logo.png" /><div class="title">享智云</div>
      </div>
      <el-menu
        :default-active="dpath"
        background-color="rgb(4, 17, 31)"
        text-color="#fff"
        active-text-color="#fff">
        <el-submenu v-for="(menu, index) in menu[roleId]" :key="index" :index="`${index + 1}`">
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
        <el-dropdown @command="signout">
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="name">王小虎</span>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <login @login="login" v-else />
</template>
<script>
import Login from './components/Login'
import { mapGetters } from 'vuex'
export default {
  components: {
    Login
  },
  data () {
    return {
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
        '2': [{
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
      },
      roleId: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'dpath'])
  },
  methods: {
    routerTo (obj, dpath) {
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
      this.$utils.setCookie('token', '')
      this.$store.dispatch('putIsLogin', false)
    },
    login () {
      this.roleId = this.$utils.getCookie('roleId')
    }
  },
  created () {
    let token = this.$utils.getCookie('token')
    if (token) {
      this.$store.dispatch('putIsLogin', true)
      this.roleId = this.$utils.getCookie('roleId')
    } else {
      this.$store.dispatch('putIsLogin', false)
    }
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
  background-color: #fff;
  text-align: right;
  font-size: 12px;
  line-height: 60px;
  .el-icon-setting {
    margin-right: 8px;
  }
  .name {
    padding-right: 20px;
  }
}
.el-aside {
  height: 100%;
  background: rgb(4, 17, 31);
  overflow: hidden;
}
.el-menu {
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
