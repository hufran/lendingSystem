<template>
   <div class="money-wrap">
     <my-header :title="title"></my-header>
     <div class="line"></div>
     <table>
        <thead>
        <tr>
          <td>单号</td>
          <td>类型</td>
          <td>时间</td>
          <td>收支金额</td>
          <td>状态</td>
        </tr>

        </thead>
       <tbody>
          <tr v-for="(item, key) in tabelData">
            <td>{{item.id}}</td>
            <td>{{item.mode}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.dealStatus}}</td>
          </tr>
       </tbody>
     </table>

     <div class="btn" @click="loginOut">退出登录</div>
   </div>
</template>

<script>
  import MyHeader from '@/components/header/header'
  import $ from 'jquery'
  import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        title: '资金明细',
        tabelData: []
      }
    },
    created: function(){
      var that = this
      $.post('/rest/lccb/customerAmountRecoed',{
        loginName: window.userinfo.loginName
      }).then(function (res) {
        console.log(res)
        if(res.status ==0){
          that.tabelData = res.data
        }
      })
    },
    methods: {
      loginOut: function(){
        $.post('/rest/loginOut').then(function (res) {
          console.log(res)
        })
      }
    },
    components: {
      MyHeader
    }
  }
</script>

<style scoped>
  .line{
    width:100%;
    height: 0px;
    border-bottom: 1px solid #c0c0c0;
  }
  table{
    width:96%;
    margin:1rem auto 0;
    font-size: 0.1rem;
    border-collapse:collapse;
  }
  table thead tr{
    height: 1.09rem;
    line-height:1.09rem;
    border-bottom:1px solid #c0c0c0;
  }
  table tbody{
    display: block;
    height:12rem;
    overflow: scroll;
  }
  table thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
  }
  tbody tr{
    height:0.7rem;
    line-height:0.7rem;
  }
  .btn{
    position: fixed;
    bottom: 1.35rem;
    left:50%;
    transform: translateX(-50%);
    width:50%;
    padding:10px 0;
    border-radius: 50px;
    color: #fff;
    background-color: #379aff;
  }
</style>
