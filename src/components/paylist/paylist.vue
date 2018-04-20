<template>
  <div class="paylist">
    <my-header :title="title"></my-header>
    <div class="content">
      <ul>
        <li>
          <span>本<span style="visibility: hidden">隐藏站位</span>金:</span>
          <span>{{duePrincipal}}元</span>
        </li>
        <li>
          <span>利<span style="visibility: hidden">隐藏站位</span>息:</span>
          <span>{{dueInterest}}元</span>
        </li>
        <li>
          <span>管<span style="visibility: hidden">1隐</span>理<span style="visibility: hidden">1隐</span>费:</span>
          <span>{{dueManagementFee}}元</span>
        </li>
        <li>
          <span>违<span style="visibility: hidden">1隐</span>约<span style="visibility: hidden">1隐</span>金:</span>
          <span>{{dueFeePenalty}}元</span>
        </li>
        <li>
          <span>罚<span style="visibility: hidden">隐藏站位</span>息:</span>
          <span>{{dueFeeInterest}}元</span>
        </li>
        <li>
          <span>减<span style="visibility: hidden">隐藏站位</span>免:</span>
          <span>{{exemptAll}}元</span>
        </li>
        <li>
          <span>实际应还金额:</span>
          <span>{{billAmount}}元</span>
        </li>
        <li>
          <span>实际应还日期:</span>
          <span>{{dueDate}}</span>
        </li>
      </ul>
    </div>
    <!--<div class="btn" @click="toPay" v-if="statusCode!='3001002' && statusCode!='3001004' && statusCode!='3001005'">还款</div>-->
  </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  import $ from 'jquery'
  import {Toast,MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        title: '',
        duePrincipal:'',
        dueInterest:'',
        dueManagementFee:'',
        dueFeePenalty:'',
        dueFeeInterest:'',
        exemptAll:'',
        billAmount:'',
        dueDate:''
      }
    },
    created: function(){
      var that = this;
      console.log(this.$route.params)
      var num = this.$route.params.num
      var loanid = this.$route.params.id
      this.title = `第${num}期账单`

      $.post(window.baseUrl+"rest/ylpayLoanAndBill/queryLoanBill",{
        loginName: window.userinfo.loginName,
        loanId: loanid,
        phase: num
      }).then(function(res){
        console.log(res)
        if(res.status ==0){
          that.duePrincipal = res.data.prepayDate.duePrincipal
          that.dueInterest = res.data.prepayDate.dueInterest
          that.dueManagementFee = res.data.prepayDate.dueManagementFee
          that.dueFeePenalty = res.data.prepayDate.dueFeePenalty
          that.dueFeeInterest = res.data.prepayDate.dueFeeInterest
          that.exemptAll = res.data.prepayDate.exemptAll
          that.billAmount = res.data.prepayDate.billAmount
          that.dueDate = res.data.prepayDate.dueDate
        }
      })
    },
    methods: {
      toPay: function () {
        var num = this.$route.params.num
        var loanid = this.$route.params.id
        MessageBox.confirm("确定执行此操作?", "提示").then(res=>{
          $.post(window.baseUrl+'rest/ylpayLoanAndBill/payLoanBill',{
            loginName: window.userinfo.loginName,
            loanId: loanid,
            phase: num
          }).then(function(res){
            console.log(res)
            if(res.status ==0){
              Toast('还款成功')
            }else{
              Toast('还款失败')
            }
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
.paylist{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  background: #fff;
  z-index:101;
}
ul{
  list-style: none;
  text-align: left;
  margin-top:0.95rem;
  padding-left:0.8rem;
}
li{
  height:1.2rem;
  line-height:1.5rem;
  font-size:0.35rem;
}
li>span{
  display: inline-block;
}
li span:first-child{
  width:30%;
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
