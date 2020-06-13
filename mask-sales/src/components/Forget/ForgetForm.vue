<template>
  <div class="forget-box">
    <div class="forget-text">
      重置密码
    </div>
    <div class="forget-form">
      <el-form label-width="80px" label-position="top" :model="forgetForm" :rules="rules" ref="forgetFormRef">
        <el-form-item prop="username">
          <el-input v-model="forgetForm.username" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="forgetForm.pwd" placeholder="新密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <el-input v-model="forgetForm.confirmPwd" placeholder="确认新密码" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn-change">
          <el-button type="primary" @click="change">重置密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="back-text">
      <router-link to="/login" class="el-icon-arrow-left">返回</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ForgetForm",
    data(){
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.forgetForm.confirmPwd !== '') {
            this.$refs['forgetFormRef'].validateField('confirmPwd');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.forgetForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        forgetForm:{
          username:'',
          pwd:'',
          confirmPwd:''
        },
        rules:{
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          pwd: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          confirmPwd: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        },

      }
    },
    methods:{
      change(){

      }
    }

  }
</script>

<style scoped lang="scss">
  .forget-box {
    width: 350px;
    height: 500px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .forget-text {
      position: absolute;
      left: 7%;
      top: 15%;
      font-size: 25px;
      color: #606266;
    }

    .forget-form {
      width: 300px;
      height: 300px;
      background-color: #fff;
      border-radius: 5px;
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, -50%);

      .btn-change {
        position: absolute;
        left: 50%;
        top: 89%;
        transform: translate(-50%, -50%);

        .el-button {
          width: 300px;
        }
      }
    }

    .back-text {
      a {
        font-size: 15px;
        text-decoration: none;
        color: #909399;
      }

      position: absolute;
      left: 7%;
      top: 90%;
    }
  }
</style>
