<template>
  <div class="useCredit" v-if="checkStatus">
    <header-component :title="title" />
    <div class="useCredit_body">
      <ul>
        <li v-for="(list,index) in data" class="clear">
          <span class="title floatLeft">{{list.name}}</span>
          <span v-if="list.input" class="floatRight">
            <input :type="list.type" :placeholder="list.placeHolder" :disabled="list.disabled" :require="list.require" :attr-regex="list.regex" v-model="list.value"  />
          </span>
          <span  class="floatRight" v-else>
            <i @click="openPicker(list.index)">{{list.value==""?list.placeHolder:list.value}} &gt;</i>
            <select-list ref="picker" :slots="list.slots" :index="list.index" />
          </span>
        </li>
      </ul>
      <div class="textCenter">
        <mt-button type="primary" @click="submit()" :disabled="btnDisabled">提交</mt-button>
      </div>

    </div>
  </div>
</template>
<style>
  .useCredit{
    background: rgb(242, 242, 242);
    height:100%;
  }
  .useCredit_body{
    background:#fff;
    margin-top:0.1rem;
    text-align:left;
  }
  .useCredit_body ul{
    background:#fff;
    font-size:0.41rem;
    width:100%;
  }
  .useCredit_body ul li{
    padding:0 0.6rem;
    color: #777;
    line-height:1.2rem;
    border-bottom:1px solid #c0c0c0;
  }
  .useCredit_body ul input{
    border:1px solid #b9b9b9;
    line-height:0.8rem;
    color:#777;
    padding-left:0.2rem;
  }
  .useCredit_body ul i{
    font-style: normal;
  }
  .useCredit .mint-button--normal{
    line-height:1.2rem;
    margin:0.48rem 0;
    width:70%;
    font-size:0.5rem;
  }
  .useCredit_body .picker-slot{
    width:100%;
    text-align: center;
  }
</style>
<script>
import HeaderComponent from '@/components/header/header'
import SelectList from '@/components/modal/selectList'
import { MessageBox,Toast } from 'mint-ui'
import {util} from '@/assets/js/util'
import $ from 'jquery';
import C from '@/assets/js/cookie';

export default{
  data(){
    return {
      title: '用信申请',
      data:[
        {name:"借款额度",alias:"amount",value:"",placeHolder:"请输入借款额度",disabled:true,type:"number",input:true,require:true,regex:/^((0\.\d{1,2})||(([1-9]\d*(\.\d*[1-9])?))+)$/i,empty:"借款额度不能为空!",err:"借款额度不能小于0!"},
        {name:"借款期限",alias:"phase",value:"",placeHolder:"请选择借款期限",input:false,require:true,empty:"请选择借款期限!",index:0,slots:[{values: ['6', '12']}]},
        {name:"还款方式",alias:"repayModel",value:"",placeHolder:"请选择还款方式",input:false,require:true,empty:"请选择还款方式!",index:1,slots:[{values: ['等额本息']}]},
        {name:"登录密码",alias:"password",value:"",class:{},placeHolder:"请输入登录密码",type:"password",input:true,require:true,regex:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,empty:"登录密码不能为空!",err:"登录密码需要8-16数字与字母组合!"},
      ],
      queryEnum:{},
      checkStatus:false,
      btnDisabled:false
    }
  },
  beforeCreate(){
    eventHandle.$off("confirm");
    eventHandle.$off("setEnumData");

    eventHandle.$on("confirm",(values,index)=>{
      this.confirm(values,index);
    });
    eventHandle.$on("setEnumData",(data)=>{
        if(!util.checkObjectIsEmpty(data)){
          this.queryEnum=data.queryEnum;
          const {loanPhase,repayModel}=this.queryEnum;
          if(loanPhase){
            this.data[1].slots[0].values=[];
            for(let key of loanPhase){
              this.data[1].slots[0].values.push(key.value);
            }
          }
          if(repayModel){
            this.data[2].slots[0].values=[];
            for(let key of repayModel){
              this.data[2].slots[0].values.push(key.value);
            }
          }

        }else{
          Toast("枚举信息异常");
        }
    })

  },
  created(){
    eventHandle.$emit("getEnumData");
    this.checkApplyResult().then(()=>{
      if(this.applyStatus.applyInfo){
        if(this.applyStatus.applyInfo.applyStatusCode=="3025001"){
          //申请中
          this.$router.push("/apply");
        }else if(this.applyStatus.applyInfo.applyStatusCode=="3025003"){
          //审核中
          this.$router.push("/auditResult");
        }else if(this.applyStatus.applyInfo.applyStatusCode=="3025002"){
          //{3019001,未使用；3019002,冻结；3019003,已取消；3019004,已使用；3019005，已过期}
          if(this.applyStatus.creditInfo){
            if(this.applyStatus.creditInfo.creditStatusCode=="3019004"){
              this.$router.push("/jiekuan");
            }else if(this.applyStatus.creditInfo.creditStatusCode=="3019003"||this.applyStatus.creditInfo.creditStatusCode=="3019005"){
              this.$router.push("/apply");
            }else if(this.applyStatus.creditInfo.creditStatusCode=="3019002"){
              Toast("您的授信额度被冻结，请联系客服工作人员");
              this.btnDisabled=true;
            }
            this.data[0].value=this.applyStatus.creditInfo.creditAmount;
          }else{
            Toast("正在生成授信，请耐心等待审批结果...");
          }
        }
      }else{
        this.$router.push("/apply");
      }
      this.checkStatus=true
    },(err)=>{
      this.checkStatus=true
    });

  },
  destoryed(){
    eventHandle.$off("confirm");
    eventHandle.$off("setEnumData");
  },
  methods:{
    confirm:function(values,index){
      this.data.forEach((list,i)=>{
        if(list.index==index){
          list.value=values[0];
          return;
        }
      });
    },
    openPicker:function(index){
      this.$refs.picker[index].open();
    },
    submit:function(){
      let valueList={};
      for(let i=0,len=this.data.length;i<len;i++){
        if(this.data[i].require&&this.data[i].value==""){
          Toast(this.data[i].empty);
          return;
        }
        if(!this.data[i].require){
          if(this.data[i].value.length>0&&this.data[i].regex){
            if(!this.data[i].regex.test(this.data[i].value)){
              Toast(this.data[i].err);
              return;
            }
          }
        }else{
          if(this.data[i].regex&&!this.data[i].regex.test(this.data[i].value)){
            Toast(this.data[i].err);
            return;
          }
        }
        valueList[this.data[i]["alias"]]=this.data[i].value;
      }
      if(util.checkObjectIsEmpty(this.queryEnum)){
        Toast("获取枚举信息失败，请稍后尝试！");
        eventHandle.$emit("getEnumData");
        return false;
      }

      valueList["loginName"]=window.userinfo.loginName;
      valueList["externalGroupId"]=2;
      let {repayModel}=this.queryEnum;
      valueList["repayModel"]=util.selectValueForObject(repayModel,valueList["repayModel"]);
      $.post(window.baseUrl+"rest/ylpayCredit/createCloanWithdraw",valueList)
        .then((response) => {
          if(response.status==0){
            Toast("用信申请成功！");
            this.$router.push("/jiekuan");
          }else{
            Toast(response.message);
          }
        })
        .catch(function(response) {
          Toast("用信申请异常，请稍后重试!");
        });

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
              reject();
            }
          })
          .catch(function(response) {
            Toast("服务器异常，请稍后重试!");
            reject(err);
          });
      });
    }
  },
  components: {
    HeaderComponent,SelectList
  }
}</script>
