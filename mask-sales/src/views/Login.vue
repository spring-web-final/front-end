<template>
  <div class="login-view">
    <LoginForm/>
  </div>
</template>

<script>
  import LoginForm from "../components/Login/LoginForm";

  export default {
    name: "Login",
    components:{
      LoginForm
    }
  }
</script>

<style scoped lang="scss">
  .login-view{
    height: 100%;
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  }
</style>
