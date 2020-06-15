<template>
  <div>
    <TopBar bg-color="#ffffff">
      <van-col span="9">
        <van-icon name="arrow-left" size="20" @click="back"/>
      </van-col>
      <van-col span="5" class="sticky-text">
        详细信息
      </van-col>
    </TopBar>
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
  import TopBar from "../topBar/TopBar";

  export default {
    name: "Detail",
    components: {TopBar, Card},
    data() {
      return {
        detailItem:{}
      }
    },
    mounted() {
      this.detailItem = this.$store.getters.getItem;
    },
    methods: {
      back() {
        this.$router.push('/list');
      }
    },
    computed:{
      ...mapGetters(['getItem'])
    }
  }
</script>

<style scoped lang="scss">
  .sticky-box {
    background-color: #ffffff;

    .van-icon{
      color: #787878;
      margin: 16px 0 0 15px;
    }
    .sticky-text {
      margin-left: 5px;
      font-size: 16px;
      color: #787878;
    }
  }

</style>