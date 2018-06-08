<template>
  <div class="auditInfo" v-if="checkStatus">
    <header-component :title="title" :backUrl="backUrl" />
    <div class="auditInfo_body">
      <div class="title">贷款信息</div>
      <div class="status" v-if="status!=''">{{status}}</div>
      <div class="status" v-else>
        <ul>
          <li><span>借款金额</span><strong>{{loanData.amount ||"0.00"}}元</strong></li>
          <li><span>借款期限</span><strong>{{loanData.phase||"0.00"}}期</strong></li>
          <li><span>还款方式</span><strong>{{loanData.repayModelCode||"等额本息"}}</strong></li>
        </ul>
      </div>
      <!--<div class="interest" v-if="showCompact">（年化利率18%,总额度{{applyStatus.creditInfo.creditAmount}}元）</div>-->
    </div>
    <div class="auditInfo_agreement" v-if="showCompact">
      <label class="clear"><input type="checkbox" name="agree" :disabled="disable" v-model="checked" /><span>已同意<router-link to="/loanCompact">《 718金融平台借款合同》</router-link> <router-link to="/loanServiceCompact">《718金融平台借款信息咨询与服务协议》</router-link> <router-link to="/authorizationCompact">《电子签章授权委托协议》</router-link>借款人应尽责任和义务，承诺和保证</span></label>
    </div>
    <button class="btn" :class="{disabledBtn:disable}" v-if="tryAgain" @click="loan" :disabled="disable">确认借款</button>
    <!--<button class="btn" @click="applyAgain" v-if="!tryAgain">重新申请</button>-->
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
  .auditInfo_body .status ul{
    border-top: 1px solid #e4e4e4;
    width:60%;
    margin: 0 auto;
    line-height: 0.6rem;
    font-size:0.4rem;
    font-weight: 400;
    color: #c1c1c1;
    padding-top:0.3rem;
  }
  .auditInfo_body .status ul li{
    text-align: left;
    min-width:80%;
    width: 80%;
    margin:0 auto;
  }
  .auditInfo_body ul span{
    padding-right:0.5rem;
  }
  .auditInfo_body .status ul strong{
    color: #379aff;
    font-weight: 400;
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
      queryEnum:{},
      msg:"一旦用信，将不能终止借款，请谨慎操作!",
      loanData:{}
    }
  },
  beforeCreate(){
    eventHandle.$off("setEnumData");
    eventHandle.$on("setEnumData",(data)=>{
      if(data.queryEnum){
        this.queryEnum=data.queryEnum;
        for(const key of this.queryEnum["repayModel"]){
          if(key.code==this.loanData.repayModel){
            this.loanData.repayModelCode=key.value;
          }
        }
      }
    });
  },
  created(){
    eventHandle.$emit("getEnumData");
    //this.status='100万';
    const router=this.$route.query;
    const self=this;
    const checkStatus=()=>{
      if(self.applyStatus.applyInfo){
        if(self.applyStatus.applyInfo.applyStatusCode=="3025001"||self.applyStatus.applyInfo.applyStatusCode==""){
          //申请中
          self.$router.push("/apply");
        }else if(self.applyStatus.applyInfo.applyStatusCode=="3025003"){
          //审核中
          self.status=self.applyStatus.applyInfo.applyStatus;
          self.disable=true;
          self.showCompact=false;

        }else if(self.applyStatus.applyInfo.applyStatusCode=="3025002"){
          if(self.applyStatus.applyInfo.applyResultCode=="3026001"){
            //进件审批结果[3026001:未通过][3026002:已通过][3026003:永久拒绝]
            self.status=this.applyStatus.applyInfo.applyResult;
            self.disable=true;
            self.showCompact=false;
            self.tryAgain=false;
          }else if(self.applyStatus.applyInfo.applyResultCode=="3026003"){
            self.status="审核不通过";
            self.disable=true;
            self.showCompact=false;
            self.msg="申请次数已超上限，如有疑问请联系客服：4001-718-718";
          }else if(this.applyStatus.applyInfo.applyResultCode=="3026002"){
            if(self.applyStatus.creditInfo){
              //{3019001,未使用；3019002,冻结；3019003,已取消；3019004,已使用；3019005，已过期}
              if(self.applyStatus.creditInfo.creditStatusCode=="3019001"||self.applyStatus.creditInfo.creditStatusCode==""){
                self.disable=false;
                /*this.status="¥"+this.applyStatus.creditInfo.creditBalance;*/

              }else if(self.applyStatus.creditInfo.creditStatusCode=="3019003"||self.applyStatus.creditInfo.creditStatusCode=="3019005"){
                // self.$router.push("/apply");
              }else if(self.applyStatus.creditInfo.creditStatusCode=="3019004"){
                self.$router.push("/jiekuan");
              }
            }else{
              Toast("正在生成授信，请稍后尝试...");
            }
          }

        }
        self.checkStatus=true;
      }else{
        self.$router.push("/apply");
      }
    }
    if(router.token&&router.token.length>0&&/^1\d{10}$/.test(router.mobile)){
      //登录
      this.autoLogin(router.token,router.mobile).then((data)=>{
        C.SetCookie("token", "00001");
        window.userinfo = Object.assign(window.userinfo, data.userInfo);
        this.getLimit().then((data)=>{
          self.loanData=data;
          for(const key of this.queryEnum["repayModel"]){
            if(key.code==this.loanData.repayModel){
              this.loanData.repayModelCode=key.value;
            }
          }
        }).catch(()=>{});
        this.checkApplyResult().then(()=>{
          checkStatus()
        },(err)=>{
          self.checkStatus=true;
        });
      }).catch(()=>{});
    }else if(!window.userinfo||!window.userinfo.loginName){
      this.$router.push("/login");
      return;
    }else{
      this.getLimit().then((data)=>{
        self.loanData=data;
        for(const key of this.queryEnum["repayModel"]){
          if(key.code==this.loanData.repayModel){
            this.loanData.repayModelCode=key.value;
          }
        }
      }).catch(()=>{});
      this.checkApplyResult().then(()=>{
        checkStatus()
      },(err)=>{
        this.checkStatus=true;
      });
    }

  },
  methods:{
    autoLogin:function(accessToken,telphone,clientId="ylpay"){
      return new Promise((resolve, reject)=>{
        $.ajax({
          url:window.baseUrl+"rest/ylpayHfiveUser/telphoneLogin",
          method:'POST',
          async: false,
          data:{accessToken,clientId,telphone},
          success:function(data){
            if(data.status==0){
              resolve(data.data)
            }else{
              Toast(data.message);
              reject(data)
            }
          },
          error:function(){
            Toast("服务器异常请稍后重试");
            reject()
          }
        });
      });
    },
    getLimit:function(){
      return new Promise((resolve, reject)=>{
        $.ajax({
          url:window.baseUrl+"rest/ylpayHfive/queryApplyInfo",
          method:'POST',
          async: false,
          data:{loginName:window.userinfo.loginName},
          success:function(data){
            if(data.status==0){
              resolve(data.data)
            }else{
              Toast(data.message);
              reject(data)
            }
          },
          error:function(err){
            Toast("获取用户授信额度异常，请稍后重试!");
            reject()
          }
        });
      });
    },
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
        /*this.$router.push('/useCredit');*/
        $.post(window.baseUrl+"rest/ylpayHfive/createCloanWithdrawHfive",{loginName:window.userinfo.loginName,amount:this.loanData.amount,phase:this.loanData.phase,repayModel:this.loanData.repayModel,externalGroupId:2})
          .then((response) => {
            if(response.status==0){
              Toast("用信申请成功！");
              this.disable=true;
              //this.$router.push("/jiekuan");
            }else{
              Toast(response.message);
            }
          })
          .catch(function(response) {
            Toast("用信申请异常，请稍后重试!");
          });
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
