<template>
  <div class="guaranteeInfo_body">
    <ul>
      <li class="clear" v-for="(list,i) in data">
        <a :href="typeof list.linkUrl=='undefined'?'javascript:void(0);':list.linkUrl" class="clear">
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
        </a>
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
        {name:"借款类别",value:"",placeHolder:"请选择借款类别",input:false,require:true,empty:"请选择借款类别!",index:0,slots:[{values: ['民间借贷', '平台网贷', '银行借款','其他债务']}]},
        {name:"借款金额",value:"10000",placeHolder:"请输入店铺地址",type:"number",input:true,require:true,regex:/^((0\.\d?)||([1-9]\d*(\.\d*[1-9])?))+$/i,empty:"借款金额不能为空!",err:"借款金额应大于0!"},
        {name:"还款日期",value:"",type:"date",placeHolder:"请选择还款日期",startDate:new Date('2000-1-1'),endDate: new Date(),input:false,require:true,empty:"请选择还款日期!"},
      ],
      value:null
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","借款信息");
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
    confirm:function(values,index){
      this.data.forEach((list,i)=>{
        if(list.index==index){
          list.value=values[0];
          return;
        }
      });
    },
    handleConfirm:function(value,index){
        let time=value.getFullYear()+"-"+((value.getMonth()+1)<10?"0"+(value.getMonth()+1):(value.getMonth()+1))+"-"+(value.getDate()<10?"0"+value.getDate():value.getDate());
        this.data[2].value=time;
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
      let value={type:valueList[0],loanNum:valueList[1],reapyDate:valueList[2]};
      console.log("value1111:",value);
    }
  },
  components:{
    SelectList
  }
}
</script>
