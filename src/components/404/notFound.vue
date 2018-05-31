<template>
  <div class="notFind">
    <my-header :title="title"></my-header>
    <div class="content" :style="{'background-image':'url('+bacUrl+')'}">
      <h1>您访问的页面不存在</h1>
    </div>
  </div>
</template>
<style>
  .notFind{
    width:100%;
    height:100%;
  }
  .notFind .content{
    width: 80%;
    height: 90%;
    margin:0 auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .notFind .content h1{
    width:0;
    height:0;
    overflow: hidden;
    text-indent: 999px;
  }
</style>
<script>
  import MyHeader from '@/components/header/header'
  export default{
    data(){
      return {
        title: '页面未找到',
        bacUrl:window.baseUrl + 'static/images/404.png'
      }
    },
    components: {MyHeader}
  }
</script>
