<template>

  <div class="container">
   <header class="header">
     <div class="logo" :class="collapsed?'collapsed':'open'">
       {{collapsed?'':sysName}}
     </div>
     <div class="tool">
       <div class="menu" @click="collapse()"><i class="el-icon-s-fold"></i></div>
       <div class="user">
         <el-dropdown @command="handleCommand">
           <span class="el-dropdown-link">
             <i class="el-icon-s-custom"></i> Hi！Eric <i class="el-icon-arrow-down el-icon--right"></i>
           </span>
           <el-dropdown-menu slot="dropdown">
             <el-dropdown-item command="a">清除缓存 <i class="el-icon-refresh"></i></el-dropdown-item>
             <el-dropdown-item command="b" disabled>我的消息 <i class="el-icon-bell"></i></el-dropdown-item>
             <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
           </el-dropdown-menu>
         </el-dropdown>
       </div>
     </div>
   </header>
   <div class="main">
     <aside class="aside" :class="collapsed?'collapsed':'open'">
       <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="collapsed"
          background-color="#eef1f6">
         <el-submenu v-for="item in navlist" :index="item.id" :key="item.id">
           <template slot="title">
             <i :class="item.icon"></i>
             <span slot="title">{{ item.category }}</span>
           </template>
           <el-menu-item-group>
             <!--<span slot="title">分组一</span>-->
             <el-menu-item v-for="sub in item.list" :index="sub.id" @click="go(sub.route)" :key="sub.id">{{ sub.title }}</el-menu-item>
           </el-menu-item-group>
         </el-submenu>

       </el-menu>
     </aside>
     <section class="section"><router-view/></section>
   </div>
 </div>


</template>

<script>
  export default {
    name: "home",
    data (){
      return {
        collapsed: false,
        sysName: 'VUE-Management',
        navlist: [{
          id: "0",
          category: '首页',
          icon: 'el-icon-location',
          list: [{
            id: "10",
            title: '统计',
            route: '/home/index'
          },{
            id: "11",
            title: '轮播',
            route: '/home/carousel'
          }]
        },{
          id: "1",
          category: '用户列表',
          icon: 'el-icon-menu',
          list: [{
            id: "13",
            title: '表单',
            route: '/home/user'
          },{
            id: "14",
            title: '用户',
            route: '/home/list'
          }]
        },{
          id: "2",
          category: '文章管理',
          icon: 'el-icon-document',
          list: [{
            id: "20",
            title: '分享文章',
            route: '/home/articles'
          },{
            id: "21",
            title: '富文本',
            route: '/home/editor'
          }]
        },{
          id: "3",
          category: '系统管理',
          icon: 'el-icon-setting',
          list: [{
            id: "22",
            title: '图片列表',
            route: '/home/none'

          }]
        }]
      }
    },
    methods: {
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      go: function (e){
        this.$router.push(e)
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    .header{
      display: flex;
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      height: 60px;
      line-height: 60px;
      .logo {
        flex: none;
        width: 230px;
        font-weight: bold;
        border-right: 1px solid hsla(62,77%,76%,.3);
      }
      .open {
        width: 230px;
      }
      .collapsed {
        width: 64px;
      }
      .tool {
        flex: auto;
        display: flex;
        justify-content: space-between;
        .menu {
          padding: 0 23px;
          width: 14px;
          height: 60px;
          line-height: 60px;
          cursor: pointer;
        }
        .user {
          padding: 0 23px;
          height: 60px;
          line-height: 60px;
          cursor: pointer;
        }
      }

    }
    .main {
      position: absolute;
      top: 60px;
      bottom: 0;
      width: 100%;
      display: flex;
      .open {
        width: 230px;
      }
      .collapsed {
        width: 64px;
      }
      .aside {
        flex: none;
        overflow-y: auto;
        .el-menu-vertical-demo {
          height: 100%;
        }
        .el-menu-vertical-demo:not(.el-menu--collapse) {
          width: 230px;
        }
      }
      .section{
        flex: auto;
        padding: 20px;
        overflow: auto;
      }
    }

  }



</style>
