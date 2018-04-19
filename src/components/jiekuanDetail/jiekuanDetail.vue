<template>
   <div class="jiekuan-detail">
     <my-header :title="title"></my-header>
     <router-view></router-view>
     <div class="info">
       <span> {{valueDate}} | {{Totalphase}}期 | {{rate*100}}%每月</span>
       <router-link :to="{path:'/compact',query:{requestId:lcReturnContactId}}" class="text">相关协议</router-link>
     </div>

     <div class="money-box">
        <div class="text">剩余应还金额</div>
       <div class="money">${{remainTotal}}</div>
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

       <tr v-for="(val, key) in datalist">
         <td>{{val.repayDate}}</td>
         <td>{{val.phaseAmount}}</td>
         <td>{{val.statusValue}}</td>
         <td @click="toList(val.phase)"  class="list" :style="{  visibility: val.statusCode !='3001006'? 'visible': 'hidden'}">账单</td>
       </tr>
       </tbody>
     </table>
     <div class="btn" @click="prePay" v-if="prepayStatus=='3031000'">申请提前还款</div>
     <div class="btngrey" v-else>提前还款申请中</div>

   </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  import $ from 'jquery'
  import { Toast,MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        title: '',
        loanid:'',
        datalist: '',
        remainTotal: '',
        Totalphase: '',
        rate: '',
        valueDate: '',
        prepayStatus:'',
        lcReturnContactId:''
      }
    },
    beforeCreate(){
      eventHandle.$on("getLoanStatus",()=>{
        eventHandle.$emit("loanStatus",{title:this.title,loanid:this.lcReturnContactId});
      })
    },
    created: function(){
      var that = this;
      this.loanid = this.$route.params.id
      console.log(this.loanid)
      $.post(window.baseUrl+"rest/ylpayLoanAndBill/queryLoanSchedule",{
        loginName: window.userinfo.loginName,
        loanId: this.loanid
      }).then(function(res){
        console.log(res)
        if(res.status ==0){
          that.title = res.data.loanStatus

          that.remainTotal = res.data.remainTotal
          that.Totalphase = res.data.Totalphase
          that.rate = res.data.rate
          that.valueDate = res.data.valueDate
          that.datalist = res.data.AllPhase
          that.prepayStatus = res.data.prepayStatus
          that.lcReturnContactId = res.data.lcReturnContactId
        }
      })

    },
    methods: {
      toList: function(key){
        this.$router.push({
          path: '/jiekuan/'+this.loanid+'/'+key
        })
      },
      prePay: function(){
        var that = this;
        MessageBox.confirm("确定执行此操作?", "提示").then(res=>{
          $.post(window.baseUrl+'rest/ylpayLoanAndBill/createPrepayLoan',{
            loginName: window.userinfo.loginName,
            loanId: this.loanid
          }).then(function(res){
            console.log(res)
            if(res.status ==0){
              var msg =  '申请成功，您申请的提前还款预约时间为'+res.data.prepayDate
              that.prepayStatus = res.data.prepayStatus
            }else{
              var msg = '申请失败'
            }
            MessageBox.alert(msg);
          })
        },res =>{
          console.log("取消")
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
    overflow:scroll;
  }
  .info{
    padding:0.45rem 0.95rem 0 0.95rem;
    font-size: 0.35rem;
    border-bottom: 1px solid #c0c0c0;
    text-align: left;
  }
  .info .text{
    color: #379aff;
    float: right;
  }
  .money-box{
    padding-top: 0.5rem;

  }
  .money-box .text{
    color: #c0c0c0;
    font-size: 0.35rem;
  }
  .money-box .money{
    font-size:0.7rem;
    font-weight:700;
    margin: 0.5rem auto;
  }
  .money-box span{
    display: block;
    width:90%;
    margin:0 auto;
    text-align: left;
    padding-left: 0.3rem;
    font-size:0.35rem;
    border-bottom: 1px solid #c0c0c0;
  }
  table{
    width:96%;
    margin:0.25rem auto;
    font-size: 0.35rem;
    border-collapse:collapse;
  }
  table thead tr{
    height: 0.75rem;
    line-height:0.75rem;
  }
  table tbody{
    display: block;
    /*height:9rem;*/
    overflow: scroll;
  }
  table thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
  }
  tbody tr{
    height:0.95rem;
    line-height:0.95rem;
  }
  tr .list{
    color: #379aff;
  }
  .btn,.btngrey{
    /*position: fixed;*/
    /*bottom: 1.25rem;*/
    /*left:50%;*/
    /*transform: translateX(-50%);*/
    margin: 50px auto 10px;
    width:50%;
    padding:10px 0;
    border-radius: 50px;
    color: #fff;
    background-color: #379aff;
  }
  .btngrey{
    background-color: #a4a4a4;
  }
</style>
