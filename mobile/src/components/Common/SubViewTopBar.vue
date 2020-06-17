<template>
  <TopBar bg-color="#ffffff">
    <van-col span="9">
      <van-icon name="arrow-left" size="20" @click="back"/>
    </van-col>
    <van-col span="10" class="sticky-text">
      <slot></slot>
    </van-col>
  </TopBar>
</template>

<script>
  import TopBar from "./topBar/TopBar";

  export default {
    name: "SubViewTopBar",
    components: {TopBar},
    methods: {
      back() {
        this.$router.go(-1);
      }
    },
  }
</script>

<style scoped>
  .van-icon{
    color: #787878;
    margin: 16px 0 0 15px;
  }
  .sticky-text {
    margin-left: 5px;
    font-size: 16px;
    color: #787878;
  }
</style>