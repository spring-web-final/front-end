<template>
  <div>
    <SubViewTopBar>
      关于我们
    </SubViewTopBar>
    <Card>
      <van-cell v-for="(item,index) in nameList" :title="item.title" :value="item.name" :key="index"/>
    </Card>
  </div>
</template>

<script>
  import Card from "../../components/Common/Card";
  import SubViewTopBar from "../../components/Common/SubViewTopBar";
  export default {
    name: "Ourselves",
    components: {SubViewTopBar, Card},
    data(){
      return {
        nameList:[
          {
            title:'组长',
            name:'李涛'
          },
          {
            title:'组员',
            name:'黄泽悦'
          },
          {
            title:'组员',
            name:'黎锦超'
          },
          {
            title:'组员',
            name:'王灿辉'
          },
          {
            title:'组员',
            name:'钟建良'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>