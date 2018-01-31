<template>
  <div class="shopInfo_body">
    <ul>
      <li class="clear" v-for="(list,i) in data">
        <a :href="typeof list.linkUrl=='undefined'?'javascript:void(0);':list.linkUrl" class="clear">
          <span class="floatLeft">{{list.name}}</span>
          <span class="floatRight" v-if="list.input&&!list.slots">
              <input :type="list.type" :placeholder="list.placeHolder" :required="list.require" :attr-regex="list.regex" v-model="list.value" />
            </span>
          <span class="floatRight" v-else-if="!list.input&&!list.slots">
              {{list.value}} &gt;
            </span>
          <span  class="floatRight" v-else-if="list.slots">
              <i @click="openPicker(list.index)">{{list.value==""?list.placeHolder:list.value}} &gt;</i>
              <select-list ref="picker" :slots="list.slots" :index="list.index" />
            </span>
        </a>
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
import { MessageBox } from 'mint-ui'

export default{
  data(){
    return {
      data: [
        {name:"负债情况",value:"",linkUrl:"./risk/riskInfo?name=debtSituation"},
        {name:"还款来源",value:"",linkUrl:"./risk/riskInfo?name=repayingSource"},
        {name:"还款保障措施",linkUrl:"./risk/riskInfo?name=repaymentGuarantee"},
        {name:"项目风险评估",value:"",linkUrl:"./risk/riskInfo?name=riskAssessment"},
        {name:"可能产生的风险结果",value:"",linkUrl:"./risk/riskInfo?name=riskResult"},
        {name:"是否在其他网贷平台有未还借款",value:"",placeHolder:"请选择!",input:false,require:true,empty:"请选择店铺房产类型!",index:0,slots:[{values: ['是', '否']}]},
        {name:"逾期情况",value:"",linkUrl:"./risk/riskInfo?name=overdue"},
        {name:"诉讼情况",value:"",linkUrl:"./risk/riskInfo?name=litigationCases"},
        {name:"受行政处罚情况",value:"",linkUrl:"./risk/riskInfo?name=administrativePenalty"},
        {name:"贷款用途",value:"",linkUrl:"./risk/riskInfo?name=loanUse"},
        {name:"贷款描述",value:"",linkUrl:"./risk/riskInfo?name=loanDescribe"}
      ]
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","风控信息");
    eventHandle.$on("confirm",(values,index)=>{
      this.confirm(values,index);
    });
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
          MessageBox.alert(this.data[i].empty);
          return;
        }
        if(!this.data[i].require){
          if(this.data[i].value.length>0&&this.data[i].regex){
            if(!this.data[i].regex.test(this.data[i].value)){
              MessageBox.alert(this.data[i].err);
              return;
            }
          }
        }else{
          if(this.data[i].regex&&!this.data[i].regex.test(this.data[i].value)){
            MessageBox.alert(this.data[i].err);
            return;
          }
        }

        valueList[i]=this.data[i].value;
      }
      let value={liabilities:valueList[0],source:valueList[1],safeguard:valueList[2],risk:valueList[3],result:valueList[4],settle:valueList[5],overdue:valueList[6],lawsuit:valueList[7],punish:valueList[8],purpose:valueList[9],describe:valueList[10]};
      console.log("value1111:",value);
    }
  },
  components:{
    SelectList
  }
}
</script>
