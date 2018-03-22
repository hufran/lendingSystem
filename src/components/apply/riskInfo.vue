<template>
  <div class="shopInfo_body">
    <ul>
      <li class="clear" v-for="(list,i) in data">
        <router-link :to="typeof list.linkUrl=='undefined'?'':list.linkUrl" class="clear">
          <span class="floatLeft">{{list.name}}</span>
          <span class="floatRight" v-if="list.input&&!list.slots">
            <input :type="list.type" :placeholder="list.placeHolder" :required="list.require" :attr-regex="list.regex" v-model="list.value" />
          </span>
          <span class="floatRight" v-else-if="!list.input&&!list.slots">
            {{list.value}} &gt;
          </span>
          <span  class="floatRight" v-else-if="list.slots">
            <i @click="openPicker(list.index)">{{list.value==""?list.placeHolder:list.value}} &gt;</i>
            <select-list ref="picker" :defaultIndex="list.defaultIndex" :slots="list.slots" :index="list.index" />
          </span>
        </router-link>
      </li>
    </ul>
    <div class="textCenter">
      <mt-button type="primary" @click="submit()">保 存</mt-button>
    </div>
  </div>
</template>
<style>

</style>
<script>
import SelectList from '@/components/modal/selectList'
import { Toast } from 'mint-ui';
import {util} from '@/assets/js/util'
import $ from 'jquery';

export default{
  data(){
    return {
      data: [
        {name:"负债情况",alias:"riskDebt",value:"",linkUrl:"./risk/riskInfo?name=debtSituation"},
        {name:"还款来源",alias:"riskPaySource",value:"",linkUrl:"./risk/riskInfo?name=repayingSource"},
        {name:"还款保障措施",alias:"riskPayGuarantee",linkUrl:"./risk/riskInfo?name=repaymentGuarantee"},
        {name:"项目风险评估",alias:"riskProjectEvaluate",value:"",linkUrl:"./risk/riskInfo?name=riskAssessment"},
        {name:"可能产生的风险结果",alias:"riskMaybeRiskResult",value:"",linkUrl:"./risk/riskInfo?name=riskResult"},
        {name:"是否在其他网贷平台有未还借款",alias:"riskIsOtherNotpay",value:"",placeHolder:"请选择!",input:false,require:true,empty:"请选择店铺房产类型!",index:0,defaultIndex:0,slots:[{values: ['是', '否']}]},
        {name:"逾期情况",alias:"riskOverdue",value:"",linkUrl:"./risk/riskInfo?name=overdue"},
        {name:"诉讼情况",alias:"riskComplain",value:"",linkUrl:"./risk/riskInfo?name=litigationCases"},
        {name:"受行政处罚情况",alias:"riskAdministrativePunishment",value:"",linkUrl:"./risk/riskInfo?name=administrativePenalty"},
        {name:"贷款用途",alias:"useFor",value:"",linkUrl:"./risk/riskInfo?name=loanUse"},
        {name:"贷款描述",alias:"loanDescription",value:"",linkUrl:"./risk/riskInfo?name=loanDescribe"}
      ],
      queryEnum:{},
      applyInfo:{},
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","风控信息");
    eventHandle.$on("confirm",(values,index)=>{
      this.confirm(values,index);
    });
    eventHandle.$on("setEnumData",function(data){
      if(!util.checkObjectIsEmpty(data)){
        this.queryEnum=data.queryEnum;
      }
    });
    eventHandle.$on("setApplyInfo",function(data){
      if(!util.checkObjectIsEmpty(data)){
        this.applyInfo=data.applyInfo;
      }
    });
    eventHandle.$emit("getEnumData");
    eventHandle.$emit("getApplyInfo");
  },
  created(){
    let {RiskInfo}=this.applyInfo;
    console.log("RiskInfo：",RiskInfo);
    if(RiskInfo){
      for(let key in this.data){
        this.data[key].value=(!RiskInfo[this.data[key]["alias"]])?"":(RiskInfo[this.data[key]["alias"]]);
        if (this.data[key].slots) {
          for (let i = 0, len = this.data[key].slots[0].values.length; i < len; i++) {
            if (this.data[key].value == this.data[key].slots[0].values[i]) {
              this.data[key].defaultIndex = i;
            }
          }
        }
      }
    }
  },
  destoryed(){
    eventHandle.$off("setEnumData");
    eventHandle.$off("setApplyInfo");
    eventHandle.$off("confirm");
  },
  methods:{
    openPicker:function(index){
      this.$refs.picker[index].open();
    },
    confirm:function(values,index){
      this.data.forEach((list,i)=>{
        if(list.index==index){
          list.value=values[0];
          return;
        }
      });
    },
    submit:function(){
      let valueList=[];
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
      let {yesOrNo}=this.queryEnum;
      valueList["riskIsOtherNotpay"]=util.selectValueForObject(yesOrNo,value.valueList["riskIsOtherNotpay"]);
      console.log("valueList1111:",valueList);
      valueList.loginName=window.userinfo.loginName;
      $.post(window.baseUrl+"rest/addInfoForylpayCapply/addRiskInfoForPcOrH5",valueList).then((response) => {
        if(response.status==0){
          Toast("风险信息补件成功！");
          eventHandle.$emit("updateApply");
        }else{
          Toast(response.message);
        }
        console.log(response)
      })
      .catch(function(response) {
        Toast("风险信息补件异常，请稍后重试！");
      });

    }
  },
  components:{
    SelectList
  }
}
</script>
