<template>
  <div class="applyList">
    <header-component :title="title" />
    <div class="applyList_body">
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
      queryEnum:{},
      applyInfo:{},
      applyStatus:{}
    }
  },
  beforeCreate(){
    eventHandle.$on("title",(data)=>{
       this.title=data;
    });
    eventHandle.$on("getEnumData",()=>{
      eventHandle.$emit("sendEnumData",{queryEnum:this.queryEnum,applyInfo:this.applyInfo});
    });
    eventHandle.$on("getEnumList",(type)=>{
      switch(type){
        case "queryEnum":
          this.getEnumData();
          break;
        case "applyInfo":
          this.getApplyInfo();
          break;
        case "all":
            console.log("all发起来all请求");
          this.getEnumData();
          this.getApplyInfo();
          break;
      }
    });
    eventHandle.$on("updateApply",()=>{
      this.getApplyInfo();
    });

  },
  created(){
    this.checkApplyResult();
    this.getSessionInfo();
    if(!util.checkObjectIsEmpty(window.userinfo)&&C.GetCookie("token")){
      if(this.applyStatus.applyInfo){
        if(this.applyStatus.applyInfo.applyStatusCode=="3025001"){
          //申请中
          this.getEnumData();
          this.getApplyInfo();
        }else if(this.applyStatus.applyInfo.applyStatusCode=="3025003"){
          //审核中
          this.$router.push("/aduit");
        }
      }

    }else{
        this.$router.push("/login");
    }

  },
  destoryed(){
    eventHandle.$off("getEnumData");
    eventHandle.$off("getEnumList");
    eventHandle.$off("title");
    eventHandle.$off("updateApply");
  },
  methods:{
    getEnumData:function(){
      if(!util.checkObjectIsEmpty(this.queryEnum)){
        eventHandle.$emit("sendEnumData",{queryEnum:this.queryEnum});
        return;
      }
      $.post("/rest/addInfoForylpayCapply/queryEnum").then((response) => {
        console.log("请求queryEnum结果：",response);
        this.queryEnum=response.data;
        eventHandle.$emit("sendEnumData",{queryEnum:this.queryEnum});
      })
      .catch(function(response) {
        Toast("获取枚举信息列表异常，请稍后在操作！");
        console.error(response);
      });
    },
    getApplyInfo:function(){
      if(this.applyInfo==null){
        eventHandle.$emit("sendEnumData",null);
        return;
      }else if(!util.checkObjectIsEmpty(this.queryEnum)){
        eventHandle.$emit("sendEnumData",{applyInfo:this.applyInfo});
        return;
      }
      $.post("/rest/addInfoForylpayCapply/queryCapplyInfo",{loginName:window.userinfo.loginName})
      .then((response) =>{
        console.log("请求queryCapplyInfo结果：",response);
        this.applyInfo=response.data;
        eventHandle.$emit("sendEnumData",{applyInfo:this.applyInfo});
      })
      .catch(function(response) {
        Toast("服务器异常，请稍后重试!");
        console.error(response);
      });
    },
    getSessionInfo:function(){
      if(!(util.checkObjectIsEmpty(window.userinfo))){
        return;
      }
      $.post("/rest/addInfoForylpayCapply/queryCapplyInfo")
        .then((response) =>{
          if(response.status=0){
            window.userinfo=response.data.userinfo;
          }
        })
        .catch(function(response) {
          Toast("服务器异常，请稍后重试!");
          console.error(response);
        });
    },
    checkApplyResult:function(){
      if(!util.checkObjectIsEmpty(this.applyStatus)){
        return this.applyStatus;
      }
      $.post("/rest/addInfoForylpayCapply/queryCapplyInfo")
        .then((response)=>{
          if(response.status==0){
            this.applyStatus=response.data;
          }else{
            Toast(response.message);
          }
        })
        .catch(function(response) {
          Toast("服务器异常，请稍后重试!");
        });
    }
  },
  components: {
    HeaderComponent
  }
}

</script>
