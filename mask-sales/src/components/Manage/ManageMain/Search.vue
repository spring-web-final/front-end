<template>
  <el-card>
    <el-row>
      <el-col :span="10">
        <el-input placeholder="请输入条件" v-model="searchData">
          <el-select v-model="select" slot="prepend" placeholder="请选择条件">
            <el-option label="编号" value="id"></el-option>
            <el-option label="姓名" value="name"></el-option>
            <el-option label="手机号" value="phone"></el-option>
            <el-option label="日期" value="date"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="search">查询</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="result-text">
      <el-col :span="10">
        {{res}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          height="470"
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
  import LineChart from "../../Common/LineChart";
  import {searchByOption} from "../../../network/request";


  export default {
    name: "Search",
    components: {
      LineChart
    },
    data() {
      return {
        searchData: '',
        select: '',
        tableData: [],
        res: '搜索到共 0 条记录',
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
              },
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
      };
    },
    created() {
    },
    methods: {
      async search() {
        let select = this.select;
        let data = this.searchData;
        let url = '';
        if (select === '' || data === '') {
          return;
        } else if (select === 'id') {
          url = `/news/getUser?id=${data}`;
        } else {
          url = `/users/getList/${select}?${select}=${data}`;
        }
        // await searchByOption(url, data).then(res => {
        //   if (res.data.totalNumber){
        //     this.tableData.push(res.data);
        //     this.res = '搜索到共 1 条记录'
        //   }else {
        //     this.tableData = res.data.data.data;
        //     this.res = `搜索到共 ${res.data.totalNumber} 条记录`
        //   }
        // })


        // this.tableData = this.mock.data.data;
        // this.res = `搜索到共 ${this.mock.totalNumber} 条记录`
      }
    }
  }
</script>

<style scoped>
  .el-select {
    width: 90px;
  }

  .el-card {
    height: 760px;
    margin: 0 20px 0 5px;
  }

  .result-text {
    margin: 20px 0 0 5px;
    font-size: 16px;
    color: #606266;
  }

  .el-table {
    margin-top: 20px;
  }
</style>
