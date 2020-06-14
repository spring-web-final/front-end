<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Card"
  }
</script>

<style scoped>
  .card {
    margin: 20px 13px 24px 13px;
    padding: 15px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 12px #ebedf0;
  }
</style>