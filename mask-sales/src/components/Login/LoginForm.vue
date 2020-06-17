<template>
  <div class="login-box">
    <div class="login-text">
      密码登录
    </div>
    <div class="login-form">
      <el-form label-width="80px" label-position="top" :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn-login">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="register-text">
      <router-link to="/register">注册用户</router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "LoginForm",
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },

      }
    },
    methods: {
      login() {
        let loginData = {};
        this.$refs['loginFormRef'].validate(async valid => {
          if (!valid) {
            return;
          }
          loginData.account = this.loginForm.username;
          loginData.password = this.loginForm.password;
          await axios.post('http://localhost:8081/ssm/login',loginData)
            .then(res => {
              if (res.data.resCode === 0) {
                window.sessionStorage.setItem('token', 'signed');
                window.sessionStorage.setItem('wid', res.data.data.id);
                window.sessionStorage.setItem('account', this.loginForm.username);
                this.$message.success('登录成功！');
                this.$router.push('/manage')
              } else {
                this.$message.error('登录失败！');
              }
            })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login-box {
    width: 350px;
    height: 500px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .login-text {
      position: absolute;
      left: 7%;
      top: 20%;
      font-size: 25px;
      color: #606266;
    }

    .login-form {
      width: 300px;
      height: 300px;
      background-color: #fff;
      border-radius: 5px;
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -50%);

      .btn-login {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .el-button {
          width: 300px;
        }
      }
    }

    .register-text, .forget-text {
      a {
        font-size: 15px;
        text-decoration: none;
        color: #909399;
      }
    }

    .register-text {
      position: absolute;
      left: 10%;
      top: 90%;
    }

    .forget-text {
      position: absolute;
      left: 75%;
      top: 90%;
    }
  }

</style>
