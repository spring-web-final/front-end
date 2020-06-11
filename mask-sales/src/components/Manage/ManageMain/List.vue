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
          height="590"
          border
          style="width: 100%">
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
  import {getListData} from '../../../network/request'
  import XLSX from 'xlsx'

  export default {


    name: "List",
    created() {
      this.getList();
    },
    data() {
      return {
        mock: {
          "data": {
            "data": [
              {
                "id": "1",
                "name": "王五",
                "sex": "男",
                "time": "2017-4-4",
                "flight": "D301",
                "train": "G208",
                "phone": "13728365292"
              }
            ]
          },
          "totalNumber": 2,
          "resCode": "OK"
        },
        tableData: [],
      }
    },
    methods: {
      getList() {
        // getListData().then(res =>{
        //   this.tableData = res.data.data;
        // })
        this.tableData = this.mock.data.data;
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
    margin-top: 20px;
  }

  .el-card {
    margin: 0 30px 0 15px;
  }
</style>
