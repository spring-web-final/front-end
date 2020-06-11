<script>
  import { Line, mixins } from 'vue-chartjs'
  const { reactiveProp } = mixins

  export default {
    extends: Line,
    mixins: [reactiveProp],
    props: {
      chartData: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      }
    },
    mounted () {
      // this.chartData 在 mixin 创建.
      // 如果你需要替换 options , 请创建本地的 options 对象
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style scoped>

</style>
