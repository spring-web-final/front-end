<template>
  <el-card>
    <el-row>
      <el-col :span="24">
        <el-button @click="download" icon="el-icon-download">下载所有记录</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          height="530"
          border
          style="width: 95%">
          <el-table-column
            prop="id"
            label="编号"
            width="130">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="160">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            width="130">
          </el-table-column>
          <el-table-column
            prop="time"
            label="登记时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="flight"
            label="航班号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="train"
            label="列车号"
            width="160">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import XLSX from 'xlsx'
  import axios from 'axios'

  export default {
    name: "List",
    created() {
      this.getList();
    },
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      async getList() {
        await axios.post('http://localhost:8081/ssm/news/getList').then(res =>{
          this.tableData = res.data.data.data;
        })
      },
      download() {
        let ws_name = "People"
        let ws = XLSX.utils.json_to_sheet(this.tableData);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        XLSX.writeFile(wb, "List.xlsx");
      }
    }
  }
</script>

<style scoped>
  .el-table {
    margin-top: 10px;
  }

  .el-card {
    height: 760px;
    margin: 0 20px 0 5px;
  }

  .el-button{
    margin-bottom: 10px;
  }
</style>
