<template>
  <el-container v-if="isLogin">
    <el-aside style="width: 200px">
      <el-menu
        background-color="rgb(4, 17, 31)"
        text-color="#fff"
        active-text-color="#fff">
        <el-submenu v-for="(menu, index) in menuList" :key="index" :index="`${index} + 1`">
          <template slot="title"><i class="el-icon-message"></i>{{menu.title}}</template>
          <el-menu-item-group>
          <el-menu-item v-for="(child, num) in menu.children" :key="`${index + 1}${num + 1}`" :index="`${index + 1}-${num + 1}`" @click="routerTo(child)">
            {{child.title}}
          </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container class="inside-container">
      <el-header class="header">
        <el-dropdown>
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="name">王小虎</span>
      </el-header>
      
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <login v-else @login="isLogin = true" />
</template>
<script>
import Login from './components/Login'
export default {
  components: {
    Login
  },
  data () {
    return {
      isLogin: !!this.$utils.getCookie('token'),
      menuList: [{
        title: '数据仪表盘',
        router: '',
        children: [{
          title: '数据看版',
          router: '/'
        }, {
          title: '地图分布',
          router: '/map'
        }]
      }, {
        title: '商户管理',
        router: '',
        children: [{
          title: '商户列表',
          router: '/merchant'
        }]
      }, {
        title: '用户信息管理',
        router: '',
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
        children: [{
          title: '体测数据列表',
          router: '/test'
        }]
      }, {
        title: '账号设置',
        router: '',
        children: [{
          title: '基础信息',
          router: '/setting'
        }, {
          title: '修改密码',
          router: '/password'
        }]
      }]
    }
  },
  methods: {
    routerTo (obj) {
      this.$router.push({
        path: obj.router
      })
    }
  }
}
</script>
<style lang="less">
.el-container {
  height: 100vh;
  border: 1px solid #eee;
  background: rgb(239, 239, 239);
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
}
.el-menu {
  .el-menu-item.is-active {
    background: rgb(51, 126, 204) !important;
  }
}
.el-main {
  margin: 20px;
  background: #fff;
  border-radius: 4px;
}
</style>
