<template>
   <div class="jiekuan-detail">
     <my-header :title="title"></my-header>
     <router-view></router-view>
     <div class="info">
       <span> 2016/08/01 | 6期 | 0.88%每月</span>
       <span class="text">相关协议</span>
     </div>

     <div class="money-box">
        <div class="text">剩余应还金额</div>
       <div class="money">$102356</div>
        <span>还款计划</span>
     </div>
     <table>
       <thead>
       <tr>
         <td>还款日期</td>
         <td>本期应还</td>
         <td>当前状态</td>
         <td>操作</td>
       </tr>
       </thead>
       <tbody>

       <tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr>
       <tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr>
       <tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr>
       <tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr>
       <tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr><tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr><tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr>
       <tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr><tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr><tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr>
       <tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr>
       <tr>
         <td>2017-01-01</td>
         <td>8888.88</td>
         <td>已还款</td>
         <td @click="toList"  class="list">账单</td>
       </tr>






       </tbody>
     </table>
     <div class="btn">申请提前还款</div>

   </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  export default {
    data () {
      return {
        title: '还款中'
      }
    },
    created: function(){
      console.log(this.$route)
    },
    methods: {
      toList: function(){
        this.$router.push({
          path: '/jiekuan/001/002'
        })
      }
    },
    components: {
      MyHeader
    }
  }
</script>

<style scoped>
  .jiekuan-detail{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    background: #fff;
    z-index:100;
  }
  .info{
    padding:1rem 2rem 0 2rem;
    font-size: 0.8rem;
    border-bottom: 1px solid #c0c0c0;
    text-align: left;
  }
  .info .text{
    color: #379aff;
    float: right;
  }
  .money-box{
    padding-top: 1rem;

  }
  .money-box .text{
    color: #c0c0c0;
    font-size: 0.8rem;
  }
  .money-box .money{
    font-size:1.5rem;
    font-weight:700;
    margin: 1rem auto;
  }
  .money-box span{
    display: block;
    width:90%;
    margin:0 auto;
    text-align: left;
    padding-left: 0.3rem;
    font-size:0.8rem;
    border-bottom: 1px solid #c0c0c0;
  }
  table{
    width:96%;
    margin:0.5rem auto;
    font-size: 0.8rem;
    border-collapse:collapse;
  }
  table thead tr{
    height: 1.5rem;
    line-height:1.5rem;
  }
  table tbody{
    display: block;
    height:21rem;
    overflow: scroll;
  }
  table thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
  }
  tbody tr{
    height:2rem;
    line-height:2rem;
  }
  tr .list{
    color: #379aff;
  }
  .btn{
    position: fixed;
    bottom: 2.7rem;
    left:50%;
    transform: translateX(-50%);
    width:50%;
    padding:10px 0;
    border-radius: 50px;
    color: #fff;
    background-color: #379aff;
  }
</style>
