<template>
  <div>
    <TopBar>
      <van-col span="12" class="sticky-text">我的</van-col>
    </TopBar>
    <div class="profile-main">
      <van-cell title="查看二维码" is-link to="index"/>
      <van-cell title="修改密码" is-link to="index"/>
      <van-cell title="退出登录" is-link to="index"/>
      <van-cell title="关于我们" is-link to="index"/>


    </div>
    <div class="tab-bar">
      <TabBar/>
    </div>
  </div>
</template>

<script>
  import TopBar from "../components/Common/topBar/TopBar";
  import TabBar from "../components/Common/tabBar/TabBar";

  export default {
    name: "Profile",
    components: {TabBar, TopBar},
    data() {
      return {
        cellList: [
          {
            title: '查看二维码',
            to: '/qrcode'
          },
          {
            title: '修改密码',
            to: '/change'
          },
          {
            title: '退出登录',
            to: '/logout'
          },
          {
            title: '关于我们',
            to: '/ourselves'
          },
        ]
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
</style>