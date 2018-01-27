<template>
  <div class="setting">
     <my-header :title="title"></my-header>
     <div class="avatar">
        <div class="img">
          <img src="/static/images/4.png" alt="">
        </div>
        <div class="name">小菲菲</div>
     </div>

     <ul>
       <li>
         <span>姓名</span>
         <span>小**</span>
       </li>
       <li>
         <span>身份账号</span>
         <span>140*********123</span>
       </li>
       <li>
         <span>手机号码</span>
         <span>130*****123</span>
       </li>
       <li>
          <span>银行卡号</span>
       </li>
       <li>
          <span>交易密码管理</span>
       </li>
       <router-link tag="li" to="/forget">
         <span>登录密码管理</span>
       </router-link>
     </ul>

     <div class="btn">退出登录</div>
  </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  export default {
    data () {
      return {
        title: '设置'
      }
    },
    created: function(){

    },
    methods: {

    },
    components: {
      MyHeader
    }
  }
</script>

<style scoped>
  .setting{
    background: #e0e0e0;
    height:100%;
  }
  .img{
    width:3rem;
    height:3rem;
    border-radius: 50%;
    margin:1rem auto;
  }
  .img img{
    width: 100%;
    height:100%;
  }
  .avatar .name{
     margin-bottom: 1rem;
  }
  ul{
    margin: 0 auto;
    padding: 0;
    width:90%;
    border:1px solid #fff;
    border-radius: 5px;
  }
  li{
    list-style: none;
    border-bottom: 1px solid #c0c0c0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: #fff;
    position: relative;
    left: 0;
    top: 0;
    text-align: left;
  }
  li span {
    margin-left: 10px;
  }
  li span:nth-child(2){
    float: right;
    margin-right: 30px;
  }
  li:after{
    content: '>';
    position: absolute;
    right: 15px;
  }
  li:last-child{
    border:none;
  }
  .btn{
    width:50%;
    padding:10px 0;
    border-radius: 50px;
    color: #fff;
    background-color: #379aff;
    margin:1.5rem auto 0;
  }
</style>
