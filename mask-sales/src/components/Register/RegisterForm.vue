<template>
  <div class="register-box">
    <div class="register-text">
      注册用户
    </div>
    <div class="register-form">
      <el-form label-width="80px" label-position="top" :model="registerForm" :rules="rules" ref="registerFormRef">
        <el-form-item prop="phone">
          <el-input v-model="registerForm.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="registerForm.pwd" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <el-input v-model="registerForm.confirmPwd" placeholder="确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn-register">
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
        <el-form-item class="btn-reset">
          <el-button type="info" @click="reset">重置</el-button>
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
    name: "RegisterForm",
    data() {
      let RegEx = /^1[3-9]\d{9}$/;
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.confirmPwd !== '') {
            this.$refs['registerFormRef'].validateField('confirmPwd');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let validatePhone = (rule, value, callback) => {
        if (!RegEx.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          phone: '',
          username: '',
          pwd: '',
          confirmPwd: ''
        },
        rules: {
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: validatePhone, trigger: 'blur'}
          ],
          username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          pwd: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          confirmPwd: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      register() {

      },
      reset() {
        this.$refs['registerFormRef'].resetFields();
      }
    }
  }
</script>

<style scoped lang="scss">
  .register-box {
    width: 350px;
    height: 500px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .register-text {
      position: absolute;
      left: 7%;
      top: 7%;
      font-size: 25px;
      color: #606266;
    }

    .register-form {
      width: 300px;
      height: 300px;
      background-color: #fff;
      border-radius: 5px;
      position: absolute;
      left: 50%;
      top: 47%;
      transform: translate(-50%, -50%);

      .btn-register {
        position: absolute;
        left: 50%;
        top: 89%;
        transform: translate(-50%, -50%);

        .el-button {
          width: 300px;
        }
      }

      .btn-reset {
        position: absolute;
        left: 50%;
        top: 106%;
        transform: translate(-50%, -50%);

        .el-button {
          width: 300px;
        }
      }
    }

    .back-text {
      a {
        text-decoration: none;
        color: #909399;
      }

      position: absolute;
      left: 7%;
      top: 90%;
    }
  }
</style>