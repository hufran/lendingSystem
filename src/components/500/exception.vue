<template>
  <div class="exception">
    <my-header :title="title"></my-header>
    <div class="content">
      <div class="exceptionImg">
        <img :src=bacUrl alt="出现了异常错误信息" />
      </div>
      <h1>{{point}}</h1>
      <p>页面出现错误，请刷新重试</p>
    </div>
  </div>
</template>
<style>
  .exception {
    width:100%;
    height:100%;
    background-color:#f6f6f6 ;
  }
  .exception .content{
    width: 80%;
    height:90%;
    margin:0 auto;
  }
  .exception .content h1{
    font-size:0.4rem;
    color: #000;
    text-align: center;
    line-height: 0.6rem;
  }
  .exception .content p{
    line-height: 0.6rem;
  }
  .exception .exceptionImg img{
    width:100%;
    margin-top:3rem;
    margin-bottom:0.5rem;
  }
</style>
<script>
  import MyHeader from '@/components/header/header'
  export default{
    data(){
      return {
        title: '异常信息',
        bacUrl:window.baseUrl + 'static/images/500.png',
        point:'服务器异常，稍后重试',
        status:{0:"用户参数错误，请确定后在重新访问",1:"服务器异常，稍后重试",2:"不存在该用户"}
      }
    },
    created(){

      const state=parseInt(this.$route.query.status);
      console.log("state:",state)
      if(isNaN(state)){
        this.point=this.status[1];
      }else{
        this.point=this.status[state];
      }
    },
    components: {MyHeader}
  }
</script>
