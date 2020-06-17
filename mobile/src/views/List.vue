<template>
  <div>
    <TopBar>
      <van-col span="12" class="sticky-text">来访人员列表</van-col>
      <van-col span="7" offset="3" class="sticky-btn">
        <van-button color="#fa7298" size="small" @click="download">下载所有记录</van-button>
      </van-col>
    </TopBar>
    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="加载完毕"
                @load="onLoad">
          <div v-for="item in list">
            <Card>
              <van-cell class="list-item"
                        :key="item.id" :title="item.name"
                        is-link :to="{ name: 'detail', params: { id: item.id }}"
                        @click="commitData(item)"/>
            </Card>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="tab-bar">
      <TabBar/>
    </div>
  </div>
</template>

<script>
  import TabBar from "../components/Common/tabBar/TabBar";

  import {mapMutations} from 'vuex'

  import XLSX from 'xlsx'
  import TopBar from "../components/Common/topBar/TopBar";
  import Card from "../components/Common/Card";
  import axios from 'axios'

  export default {
    name: "List",
    components: {Card, TopBar, TabBar},
    data() {
      return {
        // mock: {
        //   "data": {
        //     "data": [
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       },
        //       {
        //         "id": "1",
        //         "name": "王五",
        //         "sex": "男",
        //         "time": "2017-4-4",
        //         "flight": "D301",
        //         "train": "G208",
        //         "phone": "13728365292"
        //       }
        //     ]
        //   },
        //   "totalNumber": 50,
        //   "resCode": "OK"
        // },
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
      };
    },
    created() {

    },
    methods: {
      ...mapMutations([
        'saveItem'
      ]),
      async onLoad() {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        // 数据请求
        await axios.post('http://localhost:8081/ssm/news/getList')
            .then(res => {
              this.list = res.data.data.data;
            })
        this.loading = false
        this.finished = true;
      },
      async onRefresh() {
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        await this.onLoad();
      },
      download() {
        let ws_name = "People"
        let ws = XLSX.utils.json_to_sheet(this.list);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, "List.xlsx");
      },
      commitData(item) {
        this.saveItem(item);
      }
    },
  }
</script>

<style scoped lang="scss">
  .sticky-box {
    background-color: #fa7298;
  }

  .sticky-text {
    margin-left: 15px;
    font-size: 18px;
    color: #ffffff;
  }

  .list {
    margin-bottom: 45px;

    .list-item {
      /*border-top: #F4F4F4 solid 2px;*/
    }
  }


</style>