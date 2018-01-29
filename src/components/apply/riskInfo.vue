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
        {name:"负债情况",value:"",placeHolder:"请输入负债情况",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"负债情况不能为空!",err:"负债情况需要在1000字之内!"},
        {name:"还款来源",value:"",placeHolder:"请输入还款来源",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"还款来源不能为空!",err:"还款来源需要在1000字之内!"},
        {name:"还款保障措施",value:"",placeHolder:"请输入还款保障措施",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"还款保障措施不能为空!",err:"还款保障措施需要在1000字之内!"},
        {name:"项目风险评估",value:"",placeHolder:"请输入项目风险评估",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"项目风险评估不能为空!",err:"项目风险评估需要在1000字之内!"},
        {name:"可能产生的风险结果",value:"",placeHolder:"请输入可能产生的风险结果",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"可能产生的风险结果不能为空!",err:"可能产生的风险结果需要在1000字之内!"},
        {name:"是否在其他网贷平台有未还借款",value:"",placeHolder:"请选择!",input:false,require:true,empty:"请选择店铺房产类型!",index:0,slots:[{values: ['是', '否']}]},
        {name:"逾期情况",value:"",placeHolder:"请输入逾期情况",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"逾期情况不能为空!",err:"逾期情况需要在1000字之内!"},
        {name:"诉讼情况",value:"",placeHolder:"请输入诉讼情况",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"诉讼情况不能为空!",err:"诉讼情况需要在1000字之内!"},
        {name:"受行政处罚情况",value:"",placeHolder:"请输入受行政处罚情况",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"行政处罚情况不能为空!",err:"行政处罚情况需要在1000字之内!"},
        {name:"贷款用途",value:"",placeHolder:"请输入贷款用途",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"贷款用途不能为空!",err:"贷款用途需要在1000字之内!"},
        {name:"贷款描述",value:"",placeHolder:"请输入贷款描述",type:"text",input:true,require:true,regex:/^.{1,1000}$/i,empty:"贷款描述不能为空!",err:"贷款描述需要在1000字之内!"},
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
