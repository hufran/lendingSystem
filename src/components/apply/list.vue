<template>
  <div class="applyList" v-if="checkStatus">
    <header-component :title="title" :rightContent="titleText" @userOperate="onUserEmit" />
    <div class="applyList_body" >
      <router-view />
    </div>
  </div>
</template>
<style>
  .applyList{
    background: rgb(242, 242, 242);
    height:100%;
  }
  .applyList_body ul{
    background:#fff;
    font-size:0.41rem;
    width:100%;
  }
  .applyList_body ul li{
    border-bottom:1px solid #c0c0c0;
  }
  .applyList_body ul a{
    padding:0 0.6rem;
    color: #777;
    line-height:1.2rem;
    display: block;
  }
  .applyList_body ul input{
    border:1px solid #b9b9b9;
    line-height:0.8rem;
    color:#777;
    padding-left:0.2rem;
  }
  .applyList_body ul span{
    line-height:1.2rem;
  }
  .applyList_body .mint-button--normal{
    line-height:1.2rem;
    margin:0.48rem 0;
    width:70%;
    font-size:0.5rem;
  }
  .applyList_body .picker-items{
    width:100%;
    text-align: center;
  }
  i{
    font-style: normal;
  }
</style>
<script>
import HeaderComponent from '@/components/header/header'
import { Toast } from 'mint-ui';
import $ from 'jquery';
import C from '@/assets/js/cookie';
import {util} from '@/assets/js/util'

export default{
  data(){
    return {
      title:"小额经营贷",
      applyInfo:{},
      applyStatus:{},
      checkStatus:false,
      titleText:""
    }
  },
  beforeCreate(){
    eventHandle.$on("title",(data,text)=>{
       this.title=data;
       this.titleText=text;
    });
    eventHandle.$on("getApplyInfo",()=>{
      if(util.checkObjectIsEmpty(this.applyInfo)){
        this.getApplyInfo().then(()=>{
          eventHandle.$emit("setApplyInfo",{applyInfo:this.applyInfo});
        },()=>{
          eventHandle.$emit("setApplyInfo",{});
        });
      }else{
        eventHandle.$emit("setApplyInfo",{applyInfo:this.applyInfo});
      }
    });
    eventHandle.$on("updateApply",()=>{
      this.getApplyInfo();
    });

  },
  created(){
    this.checkApplyResult().then(()=>{
      if(this.applyStatus.applyInfo){
        if(this.applyStatus.applyInfo.applyStatusCode=="3025001"||this.applyStatus.applyInfo.applyStatusCode==""){
          //申请中
          this.getApplyInfo();
        }else if(this.applyStatus.applyInfo.applyStatusCode=="3025003"){
          //审核中
          this.$router.push("/auditResult");
        }else if(this.applyStatus.applyInfo.applyStatusCode=="3025002"){
          //{3019001,未使用；3019002,冻结；3019003,已取消；3019004,已使用；3019005，已过期}
          if(this.applyStatus.creditInfo){
            if(this.applyStatus.creditInfo.creditStatusCode=="3019001"||this.applyStatus.creditInfo.creditStatusCode==""){
              this.$router.push("/auditResult");
            }else if(this.applyStatus.creditInfo.creditStatusCode=="3019004"){
              this.$router.push("/jiekuan");
            }
          }else{
            Toast("正在生成授信，请稍后尝试...");
          }
          this.$router.push("/useCredit");
        }
      }
      this.checkStatus=true;
    },(data)=>{
      this.checkStatus=true;
    });
  },
  destoryed(){
    eventHandle.$off("getApplyInfo");
    eventHandle.$off("title");
  },
  methods:{
    getApplyInfo:function(){
      return new Promise((resolve, reject)=>{
        if(!util.checkObjectIsEmpty(this.applyInfo)){
          resolve();
          return this.applyInfo;
        }
        $.post(window.baseUrl+"rest/addInfoForylpayCapply/queryCapplyInfo",{loginName:window.userinfo.loginName})
          .then((response) =>{
            console.log("请求queryCapplyInfo结果：",response);
            if(response.status==0){
              this.applyInfo=response.data;
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
            reject();
          });
      });

    },
    onUserEmit:function(event){
      eventHandle.$emit("editorEvent",event);
    }
  },
  components: {
    HeaderComponent
  }
}

</script>
