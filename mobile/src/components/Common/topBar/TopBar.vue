<template>
  <van-sticky>
    <van-row class="sticky-box" :style="{backgroundColor:bgColor}">
      <slot></slot>
    </van-row>
  </van-sticky>
</template>

<script>
  export default {
    name: "TopBar",
    props:{
      bgColor:{
        type:String,
        default(){
          return '#fa7298';
        }
      }
    }
  }
</script>

<style scoped>
  .sticky-box {
    height: 48px;
    line-height: 48px;
  }
</style>