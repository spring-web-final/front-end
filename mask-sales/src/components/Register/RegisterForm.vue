<template>
  <div class="register-box">
    <div class="register-text">
      注册用户
    </div>
    <div class="register-form">
      <el-form label-width="80px" label-position="top" :model="registerForm" :rules="rules" ref="registerFormRef">
        <el-form-item prop="name">
          <el-input v-model="registerForm.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="account">
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
  import axios from 'axios'

  export default {
    name: "RegisterForm",
    data() {
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
      return {
        registerForm: {
          name: '',
          username: '',
          pwd: '',
          confirmPwd: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
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
        let registerData = {};
        this.$refs['registerFormRef'].validate(async valid => {
          if (!valid) {
            return;
          }
          registerData.name = this.registerForm.name;
          registerData.account = this.registerForm.username;
          registerData.password = this.registerForm.pwd;
          await axios.post('http://localhost:8081/ssm/register', registerData)
            .then(res => {
              if (res.data.resCode === 0) {
                this.$message.success('注册成功！');
                this.$router.push('/login')
              } else {
                this.$message.error('注册失败！');
              }
            })
        })
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
