<template>
  <div class="auditInfo" v-if="checkStatus">
    <header-component :title="title" />
    <div class="auditInfo_body">
      <div class="title">可借额度</div>
      <div class="status">{{status}}</div>
      <div class="interest">（年化利率18%,等额本息）</div>
    </div>
    <div class="auditInfo_agreement">
      <label class="clear"><input type="checkbox" name="agree" :disabled="disable" v-model="checked" /><span>已阅知<a href="javascript:void(0);" @click="showDailog('借贷合同')">《 借贷合同》</a> <a href="javascript:void(0);" @click="showDailog('借款信息咨询与服务协议')">《借款信息咨询与服务协议》</a>借款人应尽责任和义务，承诺和保证</span></label>
    </div>
    <button class="btn" :class="{disabledBtn:disable}" @click="loan" :disabled="disable">申请借款</button>
  </div>
</template>
<style>
  .auditInfo {
    height:100%;
  }
  .auditInfo_body{
    background: rgb(242, 242, 242);;
    text-align: center;

    padding-bottom:0.8rem;
    padding-top:0.8rem;
  }
  .auditInfo_body .title,.auditInfo_body .interest{
    color:#c1c1c1;
    font-size:0.53rem;
    line-height:1rem;
  }
  .auditInfo_body .status{
    color: #108ee9;
    font-weight:bold;
    font-size:0.98rem;
    line-height:1.9rem;
  }
  .auditInfo_agreement{
    padding:0.6rem;
    font-size:0.45rem;
    color:#41addd;
    text-align:left;
  }
  .auditInfo_agreement label{
    display: block;
  }
  .auditInfo_agreement a{
    color:#41addd;
  }
  .mint-msgbox-message{
    max-height: 6.5rem;
    overflow-y:auto;
  }
  .btn.disabledBtn{
    background: #ccc;
  }
  .btn{
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    background: #169bd5;
    color:#fff;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    text-align: center;
    line-height:1.4rem;
    margin:0.48rem 0;
    width:70%;
    font-size:0.5rem;
  }
</style>
<script>
import HeaderComponent from '@/components/header/header'
import { Toast,MessageBox } from 'mint-ui';
import {util} from '@/assets/js/util'
import $ from 'jquery';
import C from '@/assets/js/cookie';

export default{
  data(){
    return {
      disable:true,
      title: '小额经营贷',
      status:'',
      checkStatus:false,
      checked:false
    }
  },
  created(){
    //this.status='100万';

    this.checkApplyResult().then(()=>{
      if(this.applyStatus.applyInfo){
        if(this.applyStatus.applyInfo.applyStatusCode=="3025001"||this.applyStatus.applyInfo.applyStatusCode==""){
          //申请中
          this.$router.push("/apply");
        }else if(this.applyStatus.applyInfo.applyStatusCode=="3025003"){
          //审核中
          this.status=this.applyStatus.applyInfo.applyStatus;
          this.disable=true;
        }else if(this.applyStatus.applyInfo.applyStatusCode=="3025002"){
          if(this.applyStatus.creditInfo){
              //{3019001,未使用；3019002,冻结；3019003,已取消；3019004,已使用；3019005，已过期}
            if(this.applyStatus.creditInfo.creditStatusCode=="3019001"||this.applyStatus.creditInfo.creditStatusCode==""){
              this.disable=false;
              this.status="¥"+this.applyStatus.creditInfo.creditAmount;
            }else if(this.applyStatus.creditInfo.creditStatusCode=="3019003"||this.applyStatus.creditInfo.creditStatusCode=="3019005"){
              this.$router.push("/apply");
            }else if(this.applyStatus.creditInfo.creditStatusCode=="3019004"){
              this.$router.push("/jiekuan");
            }
          }else{
            Toast("正在生成授信，请稍后尝试...");
          }
        }
        this.checkStatus=true;
      }else{
        this.$router.push("/apply");
      }
    },(err)=>{
      this.checkStatus=true;
    });
  },
  methods:{
    showDailog:function(msg){
      $.ajax({
        url:window.baseUrl+"rest/compact/"+encodeURIComponent(encodeURIComponent(msg)),
        method:'POST',
        success:function(data){
          if(data[0].content){
            MessageBox.alert(data[0].content);
          }else{
            MessageBox.alert("暂无合同信息!");
          }
        },
        error:function(){
          Toast("服务器异常请稍后重试");
        }
      });

    },
    loan:function(){
      console.log(this.checked);
      if(this.checked){
        this.$router.push('/useCredit');
      }else{
        Toast("请同意协议后在继续操作！");
      }
    },
    checkApplyResult:function(){
      return new Promise((resolve, reject)=>{
        if(!util.checkObjectIsEmpty(this.applyStatus)){
          resolve();
          return this.applyStatus;
        }
        $.post(window.baseUrl+"rest/ylpayCredit/queryCreditInfo",{loginName:window.userinfo.loginName})
          .then((response)=>{
            if(response.status==0){
              this.applyStatus=response.data;
              resolve();
            }else{
              Toast(response.message);
              reject(response);
            }
          })
          .catch(function(response) {
            Toast("服务器异常，请稍后重试!");
            reject();
          });
      });

    }
  },
  components: {HeaderComponent}
}
</script>
