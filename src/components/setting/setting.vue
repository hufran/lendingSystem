<template>
  <div class="setting">
     <my-header :title="title"></my-header>
     <div class="avatar">
        <div class="img">
          <img :src="imageList[0]" alt="">
        </div>
      <!--   <div class="name">{{customerName.substr(0,1)}}{{customerName.substr(1,customerName.length-1).replace(/[\u4e00-\u9fa5]/g,'*')}}</div> -->
     </div>

     <ul>
       <li>
         <span>姓名</span>
         <span>{{customerName}}</span>
       </li>
       <li>
         <span>身份账号</span>
         <span>{{idCard.substr(0,4)}}*********{{idCard.substr(-4,4)}}</span>
       </li>
       <li>
         <span>手机号码</span>
         <span>{{mobile.substr(0,3)}}*****{{mobile.substr(-3,3)}}</span>
       </li>
       <li v-if="this.bankNo">
          <span>银行卡号</span>
          <span>{{bankNo.substr(0,4)}}*****{{bankNo.substr(-4,4)}}</span>
       </li>
       <router-link tag="li" to="/forget" class="youjian">
         <span>登录密码管理</span>
       </router-link>
     </ul>

     <div class="botn" @click="loginOut">退出登录</div>
  </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  import C from '@/assets/js/cookie'
  import $ from 'jquery'
  import {util} from '@/assets/js/util'
  import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        title: '设置',
        customerName: '',
        idCard:'',
        mobile:'',
        bankNo:'',
        imageList:[window.baseUrl+'static/images/avatar.png']
      }
    },
    created: function(){
      var that = this;
      $.post(window.baseUrl+"rest/ylpayLoanAndBill/queryCustomerInfo",{
        loginName: window.userinfo.loginName
      }).then(function(res){
        console.log(res)
        if(res.status == 0){
          let name=res.data.customerName;
          that.customerName = name?name.substr(0,1)+name.substr(1,customerName.length-1).replace(/[\u4e00-\u9fa5]/g,'*'):"";
          that.idCard = res.data.idCard
          that.mobile = res.data.mobile
          that.bankNo = res.data.LccbBankNo
        }
      })
    },
    methods: {
      loginOut: function(){
        let that=this;
        $.post(window.baseUrl+'rest/loginOut').then(function (res) {
          if(res.status ==0){
            Toast('退出成功');
            that.$router.go('/user')
          }
        })
      }
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
  .youjian:after{
    content: '>';
    font-size: 14px;
    position: absolute;
    right: 30px;
  }
  li:last-child{
    border:none;
  }
  .botn{
    width:50%;
    padding:10px 0;
    border-radius: 50px;
    color: #fff;
    background-color: #379aff;
    margin:1.5rem auto 0;
  }
</style>
