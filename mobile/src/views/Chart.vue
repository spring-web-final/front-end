<template>
  <div>
    <TopBar>
      <van-col span="12" class="sticky-text">疫情图表</van-col>
    </TopBar>
    <div class="wrapper-chart">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <Card>
          <line-chart :chartData="deathdata" :options="chartOptions" class="item-chart"/>
        </Card>
        <Card>
          <line-chart :chartData="curesdata" :options="chartOptions" class="item-chart"/>
        </Card>
        <Card>
          <line-chart :chartData="suspecteddata" :options="chartOptions" class="item-chart"/>
        </Card>
        <Card>
          <line-chart :chartData="confirmeddata" :options="chartOptions" class="item-chart"/>
        </Card>
      </van-pull-refresh>
    </div>
    <div class="tab-bar">
      <TabBar/>
    </div>
  </div>
</template>

<script>
  import TabBar from "../components/Common/tabBar/TabBar";
  import TopBar from "../components/Common/topBar/TopBar";
  import LineChart from "../components/Chart/LineChart";
  import Card from "../components/Common/Card";


  import {Toast} from 'vant';
  import axios from "axios";


  export default {
    name: "Chart",
    components: {LineChart, Card, TopBar, TabBar},
    data() {
      return {
        isLoading: false,
        num: 5,
        dataList: [],
        latestList: [],
        deathList: [],
        curesList: [],
        suspectedList: [],
        confirmedList: [],
        dateList: [],
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                stepSize: 1
              }
            }]
          }
        }
      };
    },
    methods: {
      onRefresh() {
        this.deathList = [];
        this.curesList = [];
        this.suspectedList = [];
        this.confirmedList = [];
        this.dateList = [];
        this.getData();
      },
      async getData() {
        await axios.get("http://www.dzyong.top:3005/yiqing/history")
            .then(res => {
              this.dataList = res.data.data;
              Toast('数据已更新');
              this.isLoading = false;
            })
        this.latestList = this.dataList.slice(this.dataList.length - this.num);
        this.analyzeData(this.latestList);
      },
      analyzeData(list) {
        list.forEach(item => {
          this.deathList.push(item.deathsNum);
          this.curesList.push(item.curesNum);
          this.suspectedList.push(item.suspectedNum);
          this.confirmedList.push(item.confirmedNum - item.curesNum - item.deathsNum);
          this.dateList.push(item.date);
        })
      },
    },
    mounted() {
      this.getData();
    },
    computed: {
      deathdata() {
        return {
          labels: this.dateList,
          datasets: [
            {
              label: '死亡人数',
              backgroundColor: '#5d7091',
              data: this.deathList
            }
          ]
        }
      },
      curesdata() {
        return {
          labels: this.dateList,
          datasets: [
            {
              label: '治愈人数',
              backgroundColor: '#28b7a3',
              data: this.curesList
            }
          ]
        }
      },
      suspecteddata() {
        return {
          labels: this.dateList,
          datasets: [
            {
              label: '新增疑似',
              backgroundColor: '#f88207',
              data: this.suspectedList
            }
          ]
        }
      },
      confirmeddata() {
        return {
          labels: this.dateList,
          datasets: [
            {
              label: '现存确诊',
              backgroundColor: '#a25a4e',
              data: this.confirmedList
            }
          ]
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

  .wrapper-chart {
    margin-bottom: 45px;
  }

  .item-chart{
    height: 240px;
  }
</style>