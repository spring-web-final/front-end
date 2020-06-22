<template>
  <div>
    <SubViewTopBar>
      修改密码
    </SubViewTopBar>
    <div class="wrapper-card">
      <Card>
        <van-form @submit="onSubmit" :show-error="false" ref="changeFormRef">
          <van-field
                  v-model="changeForm.oldPwd"
                  name="oldPwd"
                  label="旧密码"
                  label-width="95"
                  type="password"
                  :rules="oldPwdRules"/>
          <van-field
                  v-model="changeForm.newPwd"
                  name="newPwd"
                  label="新密码"
                  label-width="95"
                  :type="newPwdAtt.fieldType"
                  :right-icon="newPwdAtt.rightIcon"
                  @click-right-icon="changeAtt1"
                  :rules="newPwdRules"
                  :error-message="errorMessage1"/>
          <van-field
                  v-model="changeForm.confirmPwd"
                  name="confirmPwd"
                  label="确认新密码"
                  label-width="95"
                  :type="confirmPwd.fieldType"
                  :right-icon="confirmPwd.rightIcon"
                  @click-right-icon="changeAtt2"
                  :rules="confirmPwdRules"
                  :error-message="errorMessage2"/>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" color="#fa7298">
              提交
            </van-button>
          </div>
        </van-form>
      </Card>

    </div>
  </div>
</template>

<script>
  import SubViewTopBar from "../../components/Common/SubViewTopBar";
  import Card from "../../components/Common/Card";
  import {Toast} from 'vant';

  import {change} from "../../network/request";

  export default {
    name: "Change",
    components: {Card, SubViewTopBar},
    data() {
      let newPwdValidator1 =val =>{
        if (val === this.changeForm.oldPwd){
          this.errorMessage1 ='新旧密码不可相同';
        }else {
          this.errorMessage1 ='';
        }
      };
      let newPwdValidator2 =val =>{
        if (val !== this.changeForm.confirmPwd){
          this.errorMessage1 ='两次密码不一致';
        }else {
          this.errorMessage1 ='';
        }
      };
      let confirmPwdValidator =val =>{
        if (val !== this.changeForm.newPwd){
          this.errorMessage2 ='两次密码不一致';
        }else {
          this.errorMessage1 ='';
          this.errorMessage2 ='';
        }
      };
      return {
        newPwdAtt: {
          fieldType: 'password',
          isVisible: false,
          rightIcon: 'closed-eye',
        },
        confirmPwd: {
          fieldType: 'password',
          isVisible: false,
          rightIcon: 'closed-eye',
        },
        changeForm: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        },
        errorMessage1:'',
        errorMessage2:'',
        oldPwdRules: [
          {required: true, message: '旧密码不能为空'}
        ],
        newPwdRules: [
          {required: true, message: '新密码不能为空'},
          {validator: newPwdValidator1, trigger: 'onChange'},
          {validator: newPwdValidator2, trigger: 'onBlur'},
        ],
        confirmPwdRules: [
          {required: true, message: '确认新密码不能为空'},
          {validator: confirmPwdValidator, trigger: 'onChange'}
        ]
      }
    },
    methods: {
      async onSubmit(formData) {
        let data = {};
        data.old_password = formData.oldPwd;
        data.new_password = formData.newPwd;
        data.account = window.sessionStorage.getItem('account');
        await change(data)
            .then(res=>{
              if (res.data.resCode === 0) {
                Toast('修改成功！');
                window.sessionStorage.clear();
                this.$router.push('/login');
              } else {
                Toast('修改失败！');
              }
            })
      },
      changeAtt1() {
        if (this.newPwdAtt.isVisible) {
          this.newPwdAtt.rightIcon = 'closed-eye';
          this.newPwdAtt.isVisible = false;
          this.newPwdAtt.fieldType = 'password';
        } else {
          this.newPwdAtt.rightIcon = 'eye-o';
          this.newPwdAtt.isVisible = true;
          this.newPwdAtt.fieldType = 'text';
        }
      },
      changeAtt2() {
        if (this.confirmPwd.isVisible) {
          this.confirmPwd.rightIcon = 'closed-eye';
          this.confirmPwd.isVisible = false;
          this.confirmPwd.fieldType = 'password';
        } else {
          this.confirmPwd.rightIcon = 'eye-o';
          this.confirmPwd.isVisible = true;
          this.confirmPwd.fieldType = 'text';
        }
      }
    }
  }
</script>

<style scoped>
  .wrapper-card {
    margin-top: 80px;
  }
</style>