<template>
  <div>
    <TopBar>
      <van-col span="12" class="sticky-text">我的</van-col>
    </TopBar>
    <div class="profile-main">
      <van-cell v-for="(item,index) in cellList" :title="item.title" is-link
                :to="item.to" :key="index" :class="item.style" @click="logout(item.title)"/>
    </div>
    <div class="tab-bar">
      <TabBar/>
    </div>
  </div>
</template>

<script>
  import TopBar from "../../components/Common/topBar/TopBar";
  import TabBar from "../../components/Common/tabBar/TabBar";

  export default {
    name: "Profile",
    components: {TabBar, TopBar},
    data() {
      return {
        cellList: [
          {
            title: '查看二维码',
            to: '/qrcode',
            style:'cell-qrcode'
          },
          {
            title: '修改密码',
            to: '/change',
            style:'cell-change'
          },
          {
            title: '退出登录',
            to: '/login',
            style:'cell-logout'
          },
          {
            title: '关于我们',
            to: '/ourselves',
            style:'cell-ourselves'
          },
        ]
      }
    },
    methods:{
      logout(title){
        if (title === '退出登录'){
          window.sessionStorage.clear();
        }
      }
    }
  }
</script>

<style scoped>
  .sticky-text {
    margin-left: 15px;
    font-size: 18px;
    color: #ffffff;
  }

  .profile-main {
    margin-top: 30px;
  }

  .cell-change,
  .cell-ourselves{
    margin-top: 10px;
  }
</style>