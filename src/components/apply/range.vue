<template>
  <div class="range">
    <div class="range_body">
      <textarea v-model="requestMatch[index].data.value">

      </textarea>
      <mt-button type="primary" @click="submit">保 存</mt-button>
    </div>
  </div>

</template>
<style>
  .range{
    height:100%;
    background-color: rgb(242, 242, 242);
  }
  .range_body{
    background-color: #fff;
    padding:0 0.6rem;
  }
  .range_body textarea{
    margin:0.2rem;
    padding:0.1rem;
    font-size:0.41rem;
    width:93.4%;
    line-height:0.8rem;
    color: #000;
    border:1px solid #c0c0c0;
  }

  .range_body .mint-button--normal{
    line-height:1.2rem;
    margin:0.48rem 0;
    width:80%;
    font-size:0.5rem;
  }
</style>
<script>
import { Toast } from 'mint-ui';
import $ from 'jquery';

export default{
  data(){
    return {
      index:"",
      requestMatch:[
        {name:"range",describe:"担保机构经营范围",url:"/rest/addInfoForylpayCapply/addEnsureInfo",data:{value:"",field:"ensureOrganizationRun"},regex:/^.{1,1000}$/i,require:true,empty:"担保机构经营范围不能为空!",error:"担保机构经营范围需要1000字以内!"},
        {name:"homeAddress",describe:"家庭住址",url:"/rest/addInfoForylpayCapply/addEnsureInfo",data:{value:"",field:"ensureAddress"},regex:/^.{1,1000}$/i,require:false,empty:"家庭住址不能为空!",error:"家庭住址需要1000字以内!"},
        {name:"sponsorAddress",describe:"担保机构地址",url:"/rest/addInfoForylpayCapply/addEnsureInfo",data:{value:"",field:"ensureOrganizationAddress"},regex:/^.{1,1000}$/i,require:false,empty:"家庭住址不能为空!",error:"家庭住址需要1000字以内!"},
        {name:"debtSituation",describe:"负债情况",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"riskDebt"},regex:/^.{1,1000}$/i,require:false,empty:"负债情况不能为空!",error:"负债情况需要1000字以内!"},
        {name:"repayingSource",describe:"还款来源",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"riskPaySource"},regex:/^.{1,1000}$/i,require:false,empty:"还款来源不能为空!",error:"还款来源需要1000字以内!"},
        {name:"repaymentGuarantee",describe:"还款保障措施",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"riskPayGuarantee"},regex:/^.{1,1000}$/i,require:false,empty:"还款保障措施不能为空!",error:"还款保障措施需要1000字以内!"},
        {name:"riskAssessment",describe:"项目风险评估",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"riskProjectEvaluate"},regex:/^.{1,1000}$/i,require:false,empty:"项目风险评估不能为空!",error:"项目风险评估需要1000字以内!"},
        {name:"riskResult",describe:"可能产生的风险结果",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"riskMaybeRiskResult"},regex:/^.{1,1000}$/i,require:false,empty:"可能产生的风险结果不能为空!",error:"可能产生的风险结果需要1000字以内!"},
        {name:"overdue",describe:"逾期情况",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"riskOverdue"},regex:/^.{1,1000}$/i,require:false,empty:"逾期情况不能为空!",error:"逾期情况结果需要1000字以内!"},
        {name:"litigationCases",describe:"诉讼情况",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"riskComplain"},regex:/^.{1,1000}$/i,require:false,empty:"诉讼情况不能为空!",error:"诉讼情况结果需要1000字以内!"},
        {name:"administrativePenalty",describe:"受行政处罚情况",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"riskAdministrativePunishment"},regex:/^.{1,1000}$/i,require:false,empty:"受行政处罚情况不能为空!",error:"受行政处罚情况结果需要1000字以内!"},
        {name:"loanUse",describe:"贷款用途",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"useFor"},regex:/^.{1,1000}$/i,require:false,empty:"贷款用途不能为空!",error:"贷款用途结果需要1000字以内!"},
        {name:"loanDescribe",describe:"贷款描述",url:"/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",data:{value:"",field:"loanDescription"},regex:/^.{1,1000}$/i,require:false,empty:"贷款描述不能为空!",error:"贷款描述需要1000字以内!"},
      ],
      applyInfo:{}
    }
  },
  beforeCreate(){
    eventHandle.$on("setApplyInfo",function(data){
      if(!util.checkObjectIsEmpty(data)){
        this.applyInfo=data.applyInfo;
      }
    });
    eventHandle.$emit("getApplyInfo");
  },
  created(){
    let {name}=this.$router.currentRoute.query;
    if(typeof name!=="undefined"){
      let {RiskInfo}=this.applyInfo;
      this.requestMatch.forEach((data,index)=>{
        if(data.name==name){
          eventHandle.$emit("title",data.describe);
          this.index=index;
          if(RiskInfo&&RiskInfo[this.requestMatch[this.index].data.field]){
            this.requestMatch[this.index].data.value=RiskInfo[this.requestMatch[this.index].data.field];
          }

          return;
        }
      })
    }else{
     this.$router.go(-1);
    }
  },
  destoryed(){
    eventHandle.$off("setApplyInfo");
  },
  methods:{
    submit:function(){
      if(Number.parseInt(this.index)>=0){
        if(this.requestMatch[this.index].require){
          if(this.requestMatch[this.index].data.value.length<=0){
            Toast(this.requestMatch[this.index].empty);
            return;
          }else{
            if(!this.requestMatch[this.index].regex.test(this.requestMatch[this.index].data.value)){
              Toast(this.requestMatch[this.index].error);
              return;
            }
          }
        }else{
          if(this.requestMatch[this.index].data.value.length>0){
            if(!this.requestMatch[this.index].regex.test(this.requestMatch[this.index].data.value)){
              Toast(this.requestMatch[this.index].error);
              return
            }
          }else{
            Toast("您为填写任何数据,无法进行提交操作!");
            return
          }
        }
        console.log("下方需要接ajax请求");
        $.post(this.requestMatch[this.index].url,{loginName:window.userinfo.loginName,[this.requestMatch[this.index].data.field]:this.requestMatch[this.index].data.value}).then((response) => {
          if(response.status==0){
            Toast(this.requestMatch[this.index].describe+"信息保存成功!");
            eventHandle.$emit("updateApply");
          }else{
            Toast(response.message);

          }
          console.log(response)
        })
        .catch(function(response) {
          Toast(this.requestMatch[this.index].describe+"信息补件异常，请稍后重试！");
        });
      }else{
        Toast("查询的数据不存在!");
      }
    }
  }
}

</script>
