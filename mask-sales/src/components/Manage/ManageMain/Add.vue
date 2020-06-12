<template>
  <el-card>
    <el-col :span="8" :offset="2" class="box">
      <el-form ref="addFormRef" :model="addForm" label-width="80px" :rules="rules" :hide-required-asterisk="true">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="登记日期">
          <el-date-picker value-format="yyyy-MM-dd" type="date" :editable="false" v-model="addForm.date"
                          style="width: 100%;" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="航班号" prop="flight">
          <el-input v-model="addForm.flight"></el-input>
        </el-form-item>
        <el-form-item label="列车号" prop="train">
          <el-input v-model="addForm.train"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="addForm.isCorrect">添加信息</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-card>
</template>

<script>
  import Moment from 'moment'

  export default {
    name: "Add",
    data() {
      let RegEx = /^1[3-9]\d{9}$/;
      let validatePhone = (rule, value, callback) => {
        if (value === '') {
          this.addForm.isCorrect = true;
          callback(new Error('请输入手机号'));
        }
        if (!RegEx.test(value)) {
          this.addForm.isCorrect = true;
          callback(new Error('请输入正确的手机号'));
        } else {
          this.addForm.isCorrect = false;
          callback();
        }
      };
      let validateDate = (rule, value, callback) => {
        console.log(value)
        callback();
      };
      return {
        addForm: {
          name: '',
          sex: '男',
          date: Moment().format('YYYY-MM-DD'),
          flight: '',
          train: '',
          phone: '',
          isCorrect: false
        },
        pickerOptions:{
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        rules: {
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          date:[{validate:validateDate, trigger: 'blur'}],
          flight: [{required: true, message: '请输入航班号', trigger: 'blur'}],
          train: [{required: true, message: '请输入列车号', trigger: 'blur'}],
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],

        }
      }
    },
    methods: {
      onSubmit() {
        console.log(this.addForm);

      },
    },
    computed: {}
  }
</script>

<style scoped lang="scss">
  .el-card {
    height: 760px;
    margin: 0 20px 0 5px;

    .box {
      margin-top: 150px;
    }
  }
</style>
