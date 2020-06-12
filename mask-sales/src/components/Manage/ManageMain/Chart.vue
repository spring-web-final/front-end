<template>
  <el-card class="wrapper-card">
    <el-row>
      <el-col :span="24">
        <el-button icon="el-icon-refresh" @click="refresh">刷新数据</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <el-card class="item-card" shadow="hover">
          <line-chart :chartData="deathdata" :options="chartOptions" class="item-chart"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="item-card" shadow="hover">
          <line-chart :chartData="curesdata" :options="chartOptions" class="item-chart"/>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <el-card class="item-card" shadow="hover">
          <line-chart :chartData="suspecteddata" :options="chartOptions" class="item-chart"/>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="item-card" shadow="hover">
          <line-chart :chartData="confirmeddata" :options="chartOptions" class="item-chart"/>
        </el-card>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
  import axios from "axios";
  import LineChart from "../../Common/LineChart";

  export default {
    name: "Chart",
    components: {LineChart},
    data() {
      return {
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
                stepSize:1
              }
            }]
          }
        }
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        await axios.get("http://www.dzyong.top:3005/yiqing/history")
          .then(res => {
            this.dataList = res.data.data;
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
      refresh(){
        location.reload();
      }
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
      suspecteddata(){
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
      confirmeddata(){
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

<style scoped lang="scss">
  .wrapper-card {
    height: 760px;
    margin: 0 20px 0 5px;
  }
  .item-card{
    height: 310px;
    width: 740px;
    margin: 20px 0 0 0;
  }
  .item-chart {
    height: 250px;
    width: 700px;
  }
</style>
