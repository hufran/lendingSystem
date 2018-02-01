<template>
  <div class="guaranteeInfo_body">
    <ul>
      <li class="clear" v-for="(list,i) in data">
        <router-link :to="typeof list.linkUrl=='undefined'?'':list.linkUrl" class="clear">
          <span class="floatLeft">{{list.name}}</span>
          <span class="floatRight" v-if="list.type=='date'">
            <i @click="openTimePicker()">{{list.value==""?list.placeHolder:list.value}} &gt;</i>
            <mt-datetime-picker
              ref="dateSelect"
              type="date"
              v-model="list.value"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              @confirm="handleConfirm"
              :startDate="list.startDate"
              :endDate="list.endDate">
            </mt-datetime-picker>
          </span>
          <span class="floatRight" v-else-if="list.input&&!list.slots">
              <input :type="list.type" :placeholder="list.placeHolder" :required="list.require" :attr-regex="list.regex" v-model="list.value" />
            </span>
          <span class="floatRight" v-else-if="!list.input&&!list.slots">
              {{list.value}} &gt;
            </span>
          <span  class="floatRight" v-else-if="list.slots">
              <i @click="openPicker(list.index)">{{list.value==""?list.placeHolder:list.value}} &gt;</i>
              <select-list ref="picker" :slots="list.slots" :index="list.index" />
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
  .applyList_body .guaranteeInfo_new{
    text-align: center;
    position: relative;
  }
  .applyList_body .guaranteeInfo_new a{
    display: inline-block;
    padding:0;
  }
  .applyList_body .guaranteeInfo_new a.delete{
    position:absolute;
    right:0.6rem;
    top:0.3rem;
    /*background:url("@/img/delete.png") no-repeat;*/
    width:15px;
    height:18px;
  }
</style>
<script>
import SelectList from '@/components/modal/selectList'
import { MessageBox } from 'mint-ui'

export default{
  data(){
    return {
      data: [
        {name:"担保方式",value:"",placeHolder:"请选择担保方式",input:false,require:false,empty:"请选择担保方式!",index:0,slots:[{values: ['个人', '企业']}]},
        {name:"担保人姓名",value:"",placeHolder:"请输入担保人姓名",type:"text",input:true,require:false,regex:/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/i,empty:"担保人姓名不能为空!",err:"担保人姓名格式不正确!"},
        {name:"担保人身份证号",value:"133223232345678654",placeHolder:"请输入担保人身份证号",type:"text",input:true,require:false,regex:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/i,empty:"担保人身份证号不能为空!",err:"担保人身份证号格式不正确!"},
        {name:"家庭住址",value:"",linkUrl:"./guarantee/guaranteeInfo?name=homeAddress"},
        {name:"担保机构全称",value:"新毅网络科技有限公司",placeHolder:"请输入担保机构",type:"text",input:true,require:false,regex:/^.{1,100}$/i,empty:"担保机构不能为空!",err:"担保机构需要在100字之内!"},
        {name:"担保机构地址",value:"",linkUrl:"./guarantee/guaranteeInfo?name=sponsorAddress"},
        {name:"担保机构经营范围",value:"",linkUrl:"./guarantee/guaranteeInfo?name=range"},
        {name:"社会信用代码",value:"1321323432423",placeHolder:"请输入社会信用代码",type:"text",input:true,require:false,regex:/^[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}$/i,empty:"社会信用代码不能为空!",err:"社会信用代码格式不正确!"},
        {name:"公司成立日期",value:"",type:"date",placeHolder:"请选择还款日期",startDate:new Date('1900-1-1'),endDate: new Date(),input:false,require:true,empty:"请选择公司成立日期!"},
        {name:"联系电话",value:"",placeHolder:"请输入联系电话",type:"number",input:true,require:false,regex:/^[1][3,4,5,7,8][0-9]{9}$/,empty:"联系电话不能为空!",err:"联系电话格式不正确!"},
      ],
      value:null
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","担保信息");
    eventHandle.$on("confirm",(values,index)=>{
      this.confirm(values,index);
    });
  },
  methods:{
    openPicker:function(index){
      this.$refs.picker[index].open();
    },
    openTimePicker:function(){
      this.$refs.dateSelect[0].open();
    },
    handleConfirm:function(value,index){
      let time=value.getFullYear()+"-"+((value.getMonth()+1)<10?"0"+(value.getMonth()+1):(value.getMonth()+1))+"-"+(value.getDate()<10?"0"+value.getDate():value.getDate());
      this.data[8].value=time;
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
      let value={address:valueList[0],hourseType:valueList[1],shopType:valueList[2],marketType:valueList[3],userType:valueList[4],shopScale:valueList[5],ageLimit:valueList[6],staffNum:valueList[7],area:valueList[8],principal:valueList[9],contact:valueList[10],level:valueList[11],purchaseCredits:valueList[12],time:valueList[13]};
      console.log("value1111:",value);
    }
  },
  components:{
    SelectList
  }
}
</script>
