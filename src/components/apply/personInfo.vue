<template>
    <div class="personInfo_body">
      <ul>
        <li class="clear" v-for="(list,i) in data">
          <router-link to="typeof list.linkUrl=='undefined'?'':list.linkUrl" class="clear">
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
          </router-link>
        </li>
      </ul>
      <div class="textCenter">
        <mt-button type="primary" @click="submit()">保 存</mt-button>
      </div>
    </div>
</template>
<style>
  .mint-actionsheet .mint-actionsheet-button{
    padding:0;
  }
</style>
<script>
import SelectList from '@/components/modal/selectList'
import { Toast } from 'mint-ui';

export default{
  data(){
    return {
      data:[
        {name:"姓名",value:"苏妮妮",placeHolder:"请输入姓名",type:"text",input:true,require:true,regex:/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/i,empty:"用户姓名不能为空!",err:"姓名格式不正确!"},
        {name:"身份证号",value:"133223232345678654",placeHolder:"请输入身份证号",type:"text",input:true,require:true,regex:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/i,empty:"身份证号不能为空!",err:"身份证号格式不正确!"},
        {name:"手机号",value:"13333333333",placeHolder:"请输入手机号",type:"number",input:true,require:true,regex:/^[1][3,4,5,7,8][0-9]{9}$/,empty:"手机号不能为空!",err:"手机号格式不正确!"},
        {name:"所属行业",value:"",placeHolder:"请选择所属行业",input:false,require:true,empty:"请选择借款期限!",index:0,slots:[{values: ['选项一', '选项二', '选项三', '选项四', '选项五']}]},
        {name:"年收入",value:"100000",placeHolder:"请输入年收入",type:"number",input:true,require:true,regex:/^((0\.\d?)||([1-9]\d*(\.\d*[1-9])?))+$/i,empty:"年收入不能为空!",err:"年收入应该大于0!"},
        {name:"本地居住时间",value:"",placeHolder:"请选择本地居住时间",input:false,require:true,empty:"请选择本地居住时间!",index:1,slots:[{values: ['5年以上', '1年-5年（含）', '1年（含）以下']}]},
        {name:"婚姻状况",value:"",placeHolder:"请选择婚姻状况",input:false,require:true,empty:"请选择婚姻状况!",index:2,slots:[{values: ['离异', '未婚（丧偶）', '已婚有子女', '已婚无子女']}]},
        {name:"抚养人数",value:"",placeHolder:"请选择抚养人数",input:false,require:true,empty:"请选择抚养人数!",index:3,slots:[{values: ['0', '1或2', '2以上']}]}
      ],
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","个人申请");
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

        valueList[i]=this.data[i].value;
      }
      let value={name:valueList[0],idNumber:valueList[1],tel:valueList[2],industry:valueList[3],Income:valueList[4],dwellingTime:valueList[5],married:valueList[6],personNum:valueList[7]};
      console.log("value1111:",value);
    }
  },
  components:{
    SelectList
  }
}
</script>
