<template>
  <div>
    <SubViewTopBar>
      快速注册
    </SubViewTopBar>
    <Card class="form">
      <van-form @submit="onSubmit" :show-error="false" ref="changeFormRef">
        <van-field
                v-model="registerForm.name"
                name="name"
                type="text"
                placeholder="姓名"
                :rules="nameRules"/>
        <van-field
                v-model="registerForm.account"
                name="account"
                type="text"
                placeholder="帐号"
                :rules="accountRules"/>
        <van-field
                v-model="registerForm.password"
                name="password"
                type="password"
                placeholder="密码"
                :rules="passwordRules"
                :error-message="errorMessage1"/>
        <van-field
                v-model="registerForm.cpassword"
                name="cpassword"
                type="password"
                placeholder="确认密码"
                :rules="cpasswordRules"
                :error-message="errorMessage2"/>
        <div style="margin: 16px;">
          <van-button block class="register-btn" color="#fa7298" to="/register">
            注册
          </van-button>
        </div>
      </van-form>

    </Card>
  </div>
</template>

<script>
  import SubViewTopBar from "../components/Common/SubViewTopBar";
  import Card from "../components/Common/Card";

  import {register} from "../network/request";
  import {Toast} from 'vant';

  export default {
    name: "Register",
    components: {Card, SubViewTopBar},
    data() {
      let passwordValidator = val => {
        if (val !== this.registerForm.cpassword){
          this.errorMessage1 = '两次密码不一样！';
        }else {
          this.errorMessage1 = '';
        }
      };
      let cpasswordValidator = val => {
        if (val !== this.registerForm.password){
          this.errorMessage2 = '两次密码不一样！';
        }else {
          this.errorMessage1 ='';
          this.errorMessage2 ='';
        }
      }
      return {
        registerForm: {
          account: '',
          name: '',
          password: '',
          cpassword: ''
        },
        errorMessage1: '',
        errorMessage2: '',
        nameRules: [{required: true, message: '姓名不能为空', trigger: 'onBlur'}],
        accountRules: [{required: true, message: '帐号不能为空', trigger: 'onBlur'}],
        passwordRules: [
          {required: true, message: '密码不能为空', trigger: 'onBlur'},
          {validator: passwordValidator, trigger: 'onChange'}
        ],
        cpasswordRules: [
          {required: true, message: '确认密码密码不能为空', trigger: 'onBlur'},
          {validator: cpasswordValidator, trigger: 'onChange'}
        ]
      }
    },
    methods: {
      async onSubmit(formData) {
        let registerData = {};
        registerData.account = formData.account;
        registerData.password = formData.password;
        registerData.name = formData.name;
        console.log(registerData);
        await register(registerData)
        .then(res => {
          if (res.data.resCode === 0) {
            Toast('注册成功！');
            this.$router.push('/login')
          } else {
            Toast('注册失败！');
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>