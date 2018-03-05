<template>
  <div>
    <ul>
      <li v-for="list in applyList" class="clear">
        <router-link :to="typeof list.linkUrl=='undefined'?'':list.linkUrl" class="clear">
          <span class="floatLeft">{{list.title}}</span>
          <span class="floatRight">&gt;</span>
        </router-link>
      </li>
    </ul>
    <mt-button type="primary" @click="submit($event)">提交申请</mt-button>
  </div>
</template>
<style>

</style>
<script>
import { Toast } from 'mint-ui';
import $ from 'jquery';
import {util} from '@/assets/js/util'

export default{
  data(){
    return {
      applyList:[
        {title:"个人信息",linkUrl:"/apply/person"},
        {title:"银行信息",linkUrl:"/apply/bank"},
        {title:"财产信息",linkUrl:"/apply/property"},
        {title:"店铺信息",linkUrl:"/apply/shop"},
        {title:"风控信息",linkUrl:"/apply/risk"},
        {title:"担保信息",linkUrl:"/apply/guarantee"},
        {title:"借款情况",linkUrl:"/apply/loan"},
        {title:"影像资料",linkUrl:"/apply/Viewdata"},
      ],
      applyInfo:{}
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","小额经营贷");

    eventHandle.$on("setApplyInfo",function(data){
      if(!util.checkObjectIsEmpty(data)){
        this.applyInfo=data.applyInfo;
      }
    });
    eventHandle.$emit("getApplyInfo");
  },
  destoryed(){
    eventHandle.$off("setApplyInfo");
  },
  methods:{
    submit:function(){
      let {personalInfo,houseInfo,shopInfo,bankInfo,ensureInfo,onceLoanInfo}=this.applyInfo;
      if(util.checkObjectIsEmpty(this.applyInfo)||!personalInfo||!houseInfo||!shopInfo||!bankInfo||!ensureInfo||!onceLoanInfo){
        Toast("请填写完整进件信息后，在重新尝试");
          return;
      }else{
        $.post(window.baseUrl+"rest/addInfoForylpayCapply/submitApply",{loginName:window.userinfo.loginName}).then((response) => {
          console.log(response)
          if(response.status==0){
            Toast("提交申请成功，请耐心等待审核结果...");
            this.$router.push("/aduitResult");
          }else{
            Toast(response.message);
          }
        })
        .catch(function(response) {
          Toast("提交申请异常，请稍后重试！");
        });
      }
    }
  },

}
</script>
