<template>
  <div>
    <SubViewTopBar>
      查看二维码
    </SubViewTopBar>
    <Card>
      <img :src="QR" alt="二维码">
    </Card>
  </div>
</template>

<script>
  import SubViewTopBar from "../../components/Common/SubViewTopBar";
  import Card from "../../components/Common/Card";

  import QRCode from 'qrcode'

  export default {
    name: "QRCode",
    components: {Card, SubViewTopBar},
    data(){
      return {
        QR: '',
      }
    },
    mounted() {
      this.makeQR();
    },
    methods: {
      makeQR() {
        //二维码内容可自定义
        QRCode.toDataURL('http://localhost:8081/ssm/#/qradd')
            .then(url => {
              this.QR = url;
            })
            .catch(err => {
              console.error('二维码生成失败！', err);
            })
      },
    }
  }
</script>

<style scoped>
  img {
    height: 265px;
    width: 265px;
  }
</style>