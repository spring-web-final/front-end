<template>
  <div class="forget-view">
    <ForgetForm/>
  </div>
</template>

<script>
  import ForgetForm from "../components/Forget/ForgetForm";

  export default {
    name: "Forget",
    components: {
      ForgetForm
    }
  }
</script>

<style scoped>
  .forget-view{
    height: 100%;
    background-color: #DCD9D4; background-image: linear-gradient(to bottom, rgba(255,255,255,0.50) 0%, rgba(0,0,0,0.50) 100%), radial-gradient(at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.50) 50%); background-blend-mode: soft-light,screen;
  }
</style>