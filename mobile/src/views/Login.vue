<template>
  <div>
    <TopBar>
      <van-col span="12" class="sticky-text">登录</van-col>
    </TopBar>
    <Card class="form">
      <van-form @submit="onSubmit" :show-error="false" ref="changeFormRef">
        <van-field
                v-model="loginForm.account"
                name="account"
                type="text"
                placeholder="帐号"
                :rules="accountRules"/>
        <van-field
                v-model="loginForm.password"
                name="password"
                type="password"
                placeholder="密码"
                :rules="passwordRules"/>
        <div style="margin: 16px;">
          <van-button class="login-btn" type="info" native-type="submit" color="#fa7298">
            登录
          </van-button>
          <van-button plain class="register-btn" color="#fa7298" to="/register">
            注册
          </van-button>
        </div>
      </van-form>
    </Card>
  </div>
</template>

<script>

  import TopBar from "../components/Common/topBar/TopBar";
  import Card from "../components/Common/Card";

  import axios from 'axios'
  import {Toast} from 'vant';

  export default {
    name: "Login",
    components: {Card, TopBar},
    data() {
      return {
        loginForm: {
          account: '',
          password: ''
        },
        accountRules: [{required: true, message: '帐号不能为空', trigger: 'onBlur'}],
        passwordRules: [{required: true, message: '密码不能为空', trigger: 'onBlur'}]
      }
    },
    methods: {
      async onSubmit(formData) {
        await axios.post('http://localhost:8081/ssm/login', formData)
            .then(res => {
              if (res.data.resCode === 0) {
                window.sessionStorage.setItem('token', 'signed');
                window.sessionStorage.setItem('wid', res.data.data.id);
                window.sessionStorage.setItem('account', this.loginForm.account);
                this.$router.push('/list')
                Toast('登录成功！')
              } else {
                Toast('登录失败！')
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

  .form {
    margin-top: 100px;
  }

  .login-btn {
    width: 110px;
  }

  .register-btn {
    margin-left: 12px;
    width: 110px;
  }
</style>