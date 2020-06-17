<template>
  <el-card>
    <el-row>
      <el-col :span="6">
        <el-form label-width="80px" label-position="top" :model="profileForm" :rules="rules" ref="profileFormRef">
          <el-form-item prop="oldPwd">
            <el-input v-model="profileForm.oldPwd" placeholder="旧密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model="profileForm.pwd" placeholder="新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPwd">
            <el-input v-model="profileForm.confirmPwd" placeholder="确认新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btn-change">
            <el-button type="primary" @click="change">重置密码</el-button>
          </el-form-item>
        </el-form>
        <el-button @click="logout" class="logout-btn">退出登录</el-button>
      </el-col>
      <el-col :span="18">
        <img :src="QR" alt="二维码">
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import QRCode from 'qrcode'
  import axios from 'axios'

  export default {
    name: "Profile",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === this.profileForm.oldPwd) {
          callback(new Error('旧密码不能与新密码一样！'));
        }
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.profileForm.confirmPwd !== '') {
            this.$refs['profileFormRef'].validateField('confirmPwd');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.profileForm.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        QR: '',
        profileForm: {
          oldPwd: '',
          pwd: '',
          confirmPwd: ''
        },
        rules: {
          oldPwd: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
          pwd: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          confirmPwd: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {
              validator: validatePass2,
              trigger: 'change'
            }]
        }
      }
    },
    mounted() {
      this.makeQR();
    },
    methods: {
      makeQR() {
        //二维码内容可自定义
        QRCode.toDataURL('http://192.168.0.105:8081/login')
          .then(url => {
            this.QR = url;
          })
          .catch(err => {
            console.error('二维码生成失败！', err);
          })
      },
      async change() {
        let formData = {};
        formData.old_password = this.profileForm.oldPwd;
        formData.new_password = this.profileForm.pwd;
        formData.account = window.sessionStorage.getItem('account');
        await axios.put('http://localhost:8081/ssm/update', formData)
          .then(res=>{
            if (res.data.resCode === 0) {
              this.$message.success('修改成功！');
              window.sessionStorage.clear();
              this.$router.push('/login');
            } else {
              this.$message.error('修改失败！');
            }
          })
      },
      logout() {
        window.sessionStorage.clear();
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
  .el-form {
    margin: 150px 0 0 100px;
  }

  .logout-btn {
    margin: 250px 0 0 100px;

  }

  .el-card {
    height: 760px;
    margin: 0 20px 0 5px;
  }

  img {
    height: 400px;
    width: 400px;
    margin: 150px 0 0 300px;
  }
</style>
