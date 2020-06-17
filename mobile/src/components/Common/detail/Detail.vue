<template>
  <div>
    <SubViewTopBar>
      详细信息
    </SubViewTopBar>
    <Card>
      <van-cell title="编号" :value="getItem.id" />
      <van-cell title="姓名" :value="getItem.name" />
      <van-cell title="性别" :value="getItem.sex" />
      <van-cell title="登记日期" :value="getItem.time" />
      <van-cell title="航班号" :value="getItem.flight" />
      <van-cell title="列车号" :value="getItem.train" />
      <van-cell title="手机号" :value="getItem.phone" />
    </Card>
  </div>
</template>

<script>
  import Card from "../Card";
  import { mapGetters } from 'vuex'
  import SubViewTopBar from "../SubViewTopBar";

  export default {
    name: "Detail",
    components: {SubViewTopBar,  Card},
    data() {
      return {
        detailItem:{}
      }
    },
    mounted() {
      this.detailItem = this.getItem;
    },
    computed:{
      ...mapGetters(['getItem'])
    }
  }
</script>

<style scoped lang="scss">
</style>