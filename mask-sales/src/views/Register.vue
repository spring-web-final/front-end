<template>
  <div class="register-view">
    <RegisterForm/>
  </div>
</template>

<script>
  import RegisterForm from "../components/Register/RegisterForm";

  export default {
    name: "Register",
    components: {
      RegisterForm
    }
  }
</script>

<style scoped>
  .register-view{
    height: 100%;
    background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  }
</style>