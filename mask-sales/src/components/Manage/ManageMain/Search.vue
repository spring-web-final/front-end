<template>
  <el-card>
    <div class="small">
      <line-chart :chartData="cdata" :options="chartOptions"/>
    </div>
  </el-card>
</template>

<script>
  import LineChart from "../../Common/LineChart";

  export default {
    name: "Search",
    components: {
      LineChart
    },
    data () {
      return {
        mydata: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
        cdata: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'GitHub Commits',
              backgroundColor: '#f87979',
              data:this.mydata
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    created() {
      this.fillData()
    },
    methods: {

    }
  }
</script>

<style scoped>
  .small {
    max-width: 400px;
    margin:  150px auto;
  }
</style>
