<template>
  <div class="guaranteeInfo_body">
    <div class="guaranteeInfo_list" v-for="(data,index) in dataList">
      <div class="title clear">
        <span class="floatLeft">借款{{index+1}}</span><a class="floatRight" href="javascript:void(0);" @click="removeList(index)"><img src="/static/images/delete.png" title="删除" /> </a>
      </div>
      <ul>
        <li class="clear" v-for="(list,i) in data">
          <router-link :to="typeof list.linkUrl=='undefined'?'':list.linkUrl" class="clear">
            <span class="floatLeft">{{list.name}}</span>
            <span class="floatRight" v-if="list.type=='date'">
              <i @click="openTimePicker(list.index)">{{list.value==""?list.placeHolder:list.value}} &gt;</i>
              <mt-datetime-picker
                ref="dateSelect"
                type="date"
                v-model="list.value"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirm(index,i)"
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
    </div>
    <div class="newBlock">
      <a href="javascript:void(0);" @click="addList" >+新增</a>
    </div>

    <div class="textCenter">
      <mt-button type="primary" @click="submit()">保 存</mt-button>
    </div>
  </div>
</template>
<style>
  .newBlock{
    background:#fff;
    border-bottom:1px solid #c0c0c0;
    font-size:0.5rem;
  }
  .newBlock a{
    padding:0 0.6rem;
    color: #777;
    line-height:1.2rem;
    display: block;
  }
    .guaranteeInfo_list{
      margin-bottom:0.3rem;
  }
  .guaranteeInfo_list .title{
    background: rgb(238, 238, 238);
    line-height: 0.9rem;
    font-size:0.4rem;
    padding: 0 0.5rem;
    border-top: 1px solid #c0c0c0;
  }
  .guaranteeInfo_list .title a{
    padding-top:0.1rem;
  }
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
import { Toast } from 'mint-ui';
export default{
  data(){
    return {
      /*data: [
        {name:"借款类别",value:"",placeHolder:"请选择借款类别",input:false,require:true,empty:"请选择借款类别!",index:0,slots:[{values: ['民间借贷', '平台网贷', '银行借款','其他债务']}]},
        {name:"借款金额",value:"10000",placeHolder:"请输入店铺地址",type:"number",input:true,require:true,regex:/^((0\.\d?)||([1-9]\d*(\.\d*[1-9])?))+$/i,empty:"借款金额不能为空!",err:"借款金额应大于0!"},
        {name:"还款日期",value:"",type:"date",placeHolder:"请选择还款日期",startDate:new Date('2000-1-1'),endDate: new Date(),input:false,require:true,empty:"请选择还款日期!"},
      ],*/
      dataList:[],
      value:null
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","借款信息");
    eventHandle.$on("confirm",(values,index)=>{
      this.confirm(values,index);
    });
  },
  created(){
    this.dataList.push(this.returnData(0));
  },
  methods:{
    returnData:function(index){
      return [
        {name:"借款类别",value:"",placeHolder:"请选择借款类别",input:false,require:true,empty:"请选择借款"+(index+1)+"中的借款类别!",index:index,slots:[{defaultIndex: 1,values: ['民间借贷', '平台网贷', '银行借款','其他债务']}]},
        {name:"借款金额",value:"10000",placeHolder:"请输入店铺地址",type:"number",input:true,require:true,regex:/^((0\.\d?)||([1-9]\d*(\.\d*[1-9])?))+$/i,empty:"借款"+(index+1)+"中的借款金额不能为空!",err:"借款"+(index+1)+"中的借款金额应大于0!"},
        {name:"还款日期",value:"",type:"date",placeHolder:"请选择还款日期",startDate:new Date('2000-1-1'),index:index,endDate: new Date(),input:false,require:true,empty:"请选择借款"+(index+1)+"中的还款日期!"},
      ]
    },
    addList:function(){
      let len=this.dataList.length;
      if(len>=5){
        Toast("最多只能添加5条借款记录！");
      }else{
        this.dataList.push(this.returnData(len));
      }
    },
    removeList:function(index){
      let len=this.dataList.length;
      if(len<=1){
        Toast("您需要最少保留一条借款记录，才能正确申请！");
      }else{
        this.dataList.splice(index,1);
      }
    },
    openPicker:function(index){
      this.$refs.picker[index].open();
    },
    openTimePicker:function(index){
      this.$refs.dateSelect[index].open();
    },
    confirm:function(values,index){
      this.dataList.forEach((list,i)=>{
        if(list[0].index==index){
          list[0].value=values[0];
          return;
        }
      });
    },
    handleConfirm:function(index,subIndex){
        let value=this.dataList[index][subIndex].value;
        let time=value.getFullYear()+"-"+((value.getMonth()+1)<10?"0"+(value.getMonth()+1):(value.getMonth()+1))+"-"+(value.getDate()<10?"0"+value.getDate():value.getDate());
        this.dataList[index][subIndex].value=time;
    },
    submit:function(){
      let valueList=[];
      for(let j=0,length=this.dataList.length;j<length;j++){
        valueList[j]=[];
        for(let i=0,len=this.dataList[j].length;i<len;i++){
          if(this.dataList[j][i].require&&this.dataList[j][i].value==""){
            Toast(this.dataList[j][i].empty);
            return;
          }
          if(!this.dataList[j][i].require){
            if(this.dataList[j][i].value.length>0&&this.dataList[j][i].regex){
              if(!this.dataList[j][i].regex.test(this.dataList[j][i].value)){
                Toast(this.dataList[j][i].err);
                return;
              }
            }
          }else{
            if(this.dataList[j][i].regex&&!this.dataList[j][i].regex.test(this.dataList[j][i].value)){
              Toast(this.dataList[j][i].err);
              return;
            }
          }

          valueList[j][i]=this.dataList[j][i].value;
        }
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
