<template>
  <div class="auditInfo" v-if="checkStatus">
    <header-component :title="title" :backUrl="backUrl" />
    <div class="auditInfo_body">
      <div class="title">可借额度</div>
      <div class="status">{{status}}</div>
      <div class="interest" v-if="showCompact">（年化利率18%,总额度{{applyStatus.creditInfo.creditAmount}}元）</div>
    </div>
    <div class="auditInfo_agreement" v-if="showCompact">
      <label class="clear"><input type="checkbox" name="agree" :disabled="disable" v-model="checked" /><span>已同意<router-link to="/loanCompact">《 718金融平台借款合同》</router-link> <router-link to="/loanServiceCompact">《718金融平台借款信息咨询与服务协议》</router-link> <router-link to="/authorizationCompact">《电子签章授权委托协议》</router-link>借款人应尽责任和义务，承诺和保证</span></label>
    </div>
    <button class="btn" :class="{disabledBtn:disable}" v-if="tryAgain" @click="loan" :disabled="disable">申请借款</button>
    <button class="btn" @click="applyAgain" v-if="!tryAgain">重新申请</button>
    <div class="point">{{msg}} </div>
  </div>
</template>
<style>
  .auditInfo {
    height:100%;
    font-size: 12px;
  }
  .auditInfo_body{
    background: rgb(242, 242, 242);;
    text-align: center;

    padding-bottom:0.8rem;
    padding-top:0.8rem;
  }
  .auditInfo_body .title,.auditInfo_body .interest{
    color:#c1c1c1;
    font-size:0.4rem;
    line-height:0.8rem;
  }
  .auditInfo_body .status{
    color: #379aff;
    font-weight:bold;
    font-size:0.7rem;
    line-height:1rem;
  }
  .auditInfo_agreement{
    padding:0.6rem;
    color:#379aff;
    text-align:left;
  }
  .auditInfo_agreement label{
    display: block;
  }
  .auditInfo_agreement a{
    color:#379aff;
  }
  .mint-msgbox-message{
    max-height: 6.5rem;
    overflow-y:auto;
  }
  .btn.disabledBtn{
    background: #ccc;
  }
  .btn{
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    border-radius:20px;
    color: #fff;
    font-size: 18px;
    background-color: #379aff;
    -webkit-border-radius:20px;
    -moz-border-radius:20px;
    border-radius:20px;
    text-align: center;
    line-height:1rem;
    margin:0.48rem 0;
    width:50%;
    outline: none;
  }
  .auditInfo .point{
    margin-top:0.2rem;
    color: #ffc750;
    font-size:0.3rem;
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
      backUrl:"/",
      title: '云毅融',
      status:'',
      checkStatus:false,
      checked:false,
      showCompact:true,
      tryAgain:true,
      msg:"一旦用信，将不能终止借款，请谨慎操作!"
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
          this.showCompact=false;

        }else if(this.applyStatus.applyInfo.applyStatusCode=="3025002"){
          if(this.applyStatus.applyInfo.applyResultCode=="3026001"){
            //进件审批结果[3026001:未通过][3026002:已通过][3026003:永久拒绝]
            this.status=this.applyStatus.applyInfo.applyResult;
            this.disable=true;
            this.showCompact=false;
            this.tryAgain=false;
          }else if(this.applyStatus.applyInfo.applyResultCode=="3026003"){
            this.status="审核不通过";
            this.disable=true;
            this.showCompact=false;
            this.msg="申请次数已超上限，如有疑问请联系客服：4001-718-718";
          }else if(this.applyStatus.applyInfo.applyResultCode=="3026002"){
            if(this.applyStatus.creditInfo){
              //{3019001,未使用；3019002,冻结；3019003,已取消；3019004,已使用；3019005，已过期}
              if(this.applyStatus.creditInfo.creditStatusCode=="3019001"||this.applyStatus.creditInfo.creditStatusCode==""){
                this.disable=false;
                this.status="¥"+this.applyStatus.creditInfo.creditBalance;
              }else if(this.applyStatus.creditInfo.creditStatusCode=="3019003"||this.applyStatus.creditInfo.creditStatusCode=="3019005"){
                this.$router.push("/apply");
              }else if(this.applyStatus.creditInfo.creditStatusCode=="3019004"){
                this.$router.push("/jiekuan");
              }
            }else{
              Toast("正在生成授信，请稍后尝试...");
            }
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
    applyAgain:function(){
      this.$router.push('/apply');
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
