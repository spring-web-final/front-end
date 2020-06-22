<template>
  <div>
    <TopBar>
      <van-col span="12" class="sticky-text">添加来访人员</van-col>
    </TopBar>
    <div class="wrapper-form">
      <Card>
        <van-form @submit="onSubmit" :show-error="false">
          <van-field
                  v-model="addForm.name"
                  name="name"
                  label="姓名"
                  placeholder="必填"
                  label-width="80"
                  :rules="nameRules"/>
          <van-field name="sex" label="性别" label-width="80">
            <template #input>
              <van-radio-group v-model="addForm.sex" direction="horizontal">
                <van-radio name="男" checked-color="#fa7298">男</van-radio>
                <van-radio name="女" checked-color="#fa7298">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field
                  readonly
                  clickable
                  name="date"
                  :value="addForm.date"
                  label="登记日期"
                  placeholder="点击选择日期"
                  @click="showPicker"
                  label-width="80"/>
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
          <van-field
                  v-model="addForm.flight"
                  name="flight"
                  label="航班号"
                  placeholder="选填"
                  label-width="80"/>
          <van-field
                  v-model="addForm.train"
                  name="train"
                  label="列车号"
                  placeholder="选填"
                  label-width="80"/>
          <van-field
                  v-model="addForm.phone"
                  name="phone"
                  label="手机号"
                  placeholder="必填"
                  label-width="80"
                  type="tel"
                  :rules="phoneRules"/>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" color="#fa7298">
              提交
            </van-button>
          </div>
        </van-form>
      </Card>
    </div>
    <div class="tab-bar">
      <TabBar/>
    </div>
  </div>

</template>

<script>
  import TabBar from "../components/Common/tabBar/TabBar";
  import TopBar from "../components/Common/topBar/TopBar";
  import Card from "../components/Common/Card";
  import {Toast} from 'vant';


  import Moment from 'moment'
  import axios from 'axios'
  import {postAddForm} from "../network/request";

  export default {
    name: "Add",
    components: {Card, TabBar, TopBar},
    data() {
      return {
        addForm: {
          name: '',
          sex: '男',
          date: Moment().format('YYYY-MM-DD'),
          flight: '',
          train: '',
          phone: '',
        },
        show: false,
        minDate: new Date(2020, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(),
        nameRules: [{required: true, message: '姓名不能为空'}],
        phoneRules: [{required: true, message: '手机号不能为空'},
          {pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'onBlur'}]
      }
    },
    methods: {
      confirmPicker(value) {
        const date = Moment(value).format('YYYY-MM-DD')
        this.show = false;
        this.addForm.date = date;
      },
      closePop() {
        this.show = false;
      },
      showPicker() {
        this.show = true;
      },
      async onSubmit(formData) {
        this.addForm.name = '';
        this.addForm.sex = '男';
        this.addForm.date = Moment().format('YYYY-MM-DD');
        this.addForm.flight = '';
        this.addForm.train = '';
        this.addForm.phone = '';

        let addData = {};
        addData.name = formData.name;
        addData.sex = formData.sex;
        addData.phone = formData.phone;
        addData.flight = formData.flight;
        addData.train = formData.train;
        addData.time = formData.date;
        addData.wid = window.sessionStorage.getItem('wid');
        // console.log(addData);

        await postAddForm(addData)
            .then(res => {
              if (res.data.resCode === 0) {
                Toast('添加成功!');
              } else {
                Toast('添加失败!');
              }
            })
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
</style>