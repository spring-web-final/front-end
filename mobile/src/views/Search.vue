<template>
  <div>
    <TopBar>
      <van-col span="12" class="sticky-text">搜索来访人员</van-col>
    </TopBar>
    <div class="wrapper-search">
      <van-row>
        <van-tabs
                v-model="activeItem" @click="onClickTab"
                color="#fa7298" title-inactive-color="#787878"
                title-active-color="#fa7298">
          <van-tab v-for="item in tabList" :title="item.title" :name="item.name" :key="item.id"/>
        </van-tabs>
      </van-row>
      <van-row>
        <van-col span="24" class="search-box">
          <van-search v-model="searchData" :placeholder="phText"
                      clearable @focus="onFocus"
                      @input="onInput" show-action
                      :readonly="isReadonly">
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
          <van-popup
                  v-model="show"
                  position="bottom"
                  :style="{ height: '35%' }"
                  round>
            <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    title="选择年月日"
                    :min-date="minDate"
                    :max-date="maxDate"
                    :confirm="confirmPicker"
                    @cancel="closePop"
                    @confirm="confirmPicker"/>
          </van-popup>
        </van-col>
      </van-row>
    </div>
    <div class="search-res">
      <div class="res-text">
        {{resText}}
      </div>
      <Card v-for="(item,index) in resList" :key="index">
        <van-cell title="编号" :value="item.id"/>
        <van-cell title="姓名" :value="item.name"/>
        <van-cell title="性别" :value="item.sex"/>
        <van-cell title="登记日期" :value="item.time"/>
        <van-cell title="航班号" :value="item.flight"/>
        <van-cell title="列车号" :value="item.train"/>
        <van-cell title="手机号" :value="item.phone"/>
      </Card>
    </div>
    <div class="tab-bar">
      <TabBar/>
    </div>
  </div>
</template>

<script>
  import TopBar from "../components/Common/topBar/TopBar";
  import TabBar from "../components/Common/tabBar/TabBar";
  import Card from "../components/Common/Card";

  import Moment from "moment";
  import {searchByOption} from "../network/request";
  import axios from 'axios'

  export default {
    name: "Search",
    components: {Card, TabBar, TopBar},
    data() {
      return {
        resText: '搜索到共 0 条记录',
        resList: [],
        isReadonly: false,
        tempId: '',
        tempName: '',
        tempPhone: '',
        tempDate: '',
        show: false,
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(),
        phText: '请输入要搜索的编号',
        activeItem: 'id',
        searchData: '',
        selected: 'id',
        tabList: [
          {title: '编号', name: 'id'},
          {title: '姓名', name: 'name'},
          {title: '登记日期', name: 'date'}
        ]
      }
    },
    methods: {
      // 变换搜索框占位字符串或内容
      onClickTab(name, title) {
        this.phText = `请输入要搜索的${title}`;
        // 每次切换tab都重置搜索框为非只读，因为点击登记日期的时候，会置换为只读，不重置会导致从登记日期tab切换到其他tab的时候不可输入
        this.isReadonly = false;
        switch (this.activeItem) {
          case "id":
            this.searchData = this.tempId;
            break;
          case "name":
            this.searchData = this.tempName
            break;
          case "phone":
            this.searchData = this.tempPhone
            break;
          case "date":
            this.searchData = this.tempDate
            this.isReadonly = true;
            break;
        }
      },
      // 选择日期的弹出框逻辑
      onFocus() {
        if (this.activeItem === 'date') {
          this.show = true;
        }
      },
      confirmPicker(value) {
        const date = Moment(value).format('YYYY-MM-DD')
        this.show = false;
        this.searchData = date;
      },
      closePop() {
        this.show = false;
      },
      // 发起搜索请求，在前端无法对输入内容的验证，要在服务器做验证，避免出现类似用字符串发起搜索编号请求。
      async onSearch() {
        this.resList.splice(0, this.resList.length);
        let select = this.activeItem;
        let data = this.searchData;
        let url = '';
        if (select === '' || data === '') {
          return;
        } else if (select === 'id') {
          url = `http://localhost:8081/ssm/news/getUser?id=${data}`;
        } else if (select === 'date') {
          url = `http://localhost:8081/ssm/users/getList/time?time=${data}`;
        } else {
          url = `http://localhost:8081/ssm/users/getList/${select}?${select}=${data}`;
        }
        await axios.get(url)
            .then(res => {
              if (res.status !== 500) {
                if (select === 'date' || select === 'name') {
                  this.resList = res.data.data.data;
                  this.resText = `搜索到共 ${res.data.data.total} 条记录`
                } else {
                  if (res.data.data) {
                    this.resList.push(res.data.data);
                    this.resText = '搜索到共 1 条记录'
                  }
                }
              } else {
                this.$message.error('服务器出错！');
              }
            })
      },
      // 记录搜索框的内容，用于来回切换tab的时候已输入数据保活
      onInput(value) {
        switch (this.activeItem) {
          case "id":
            this.tempId = value;
            break;
          case "name":
            this.tempName = value;
            break;
          case "phone":
            this.tempPhone = value;
            break;
        }
      },
    },
    // 为了修复手机端在日期tab下点击搜索框不弹出键盘的bug，在点击日期tab的时候设置了搜索框只读，
    // 导致在日期tab情况下无法触发搜索框的input事件，进而导致已输入的日期数据无法保活，所以在这里用监听器，当激活的tab为日期tab时，
    // 把内容存到tempDate保活。
    watch: {
      searchData() {
        if (this.activeItem === 'date') {
          this.tempDate = this.searchData;
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

  .search-box {
    height: 68px;
  }

  .search-res {
    margin-bottom: 70px;
  }

  .res-text {
    margin: 2px 0 0 17px;
    font-size: 13px;
    color: #787878;
  }
</style>