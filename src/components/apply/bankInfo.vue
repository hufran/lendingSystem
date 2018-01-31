<template>
    <div class="personInfo_body">
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
  .mint-actionsheet .mint-actionsheet-button{
    padding:0;
  }
</style>
<script>
import SelectList from '@/components/modal/selectList'
import { MessageBox } from 'mint-ui'

export default{
  data(){
    return {
      data:[
        {name:"账户类型",value:"",placeHolder:"请选择账户类型",input:false,require:true,empty:"请选择账户类型!",index:0,slots:[{values: ['个人', '对公']}]},
        {name:"账户名称",value:"",placeHolder:"请输入账户名称",type:"text",input:true,require:true,regex:/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/i,empty:"账户名称不能为空!",err:"账户名称格式不正确!"},
        {name:"银行账号",value:"",placeHolder:"请输入银行账号",type:"text",input:true,require:true,regex:/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/,empty:"银行账号不能为空!",err:"银行账号格式不正确!"},
        {name:"手机号",value:"",placeHolder:"请输入手机号",type:"number",input:true,require:true,regex:/^[1][3,4,5,7,8][0-9]{9}$/,empty:"手机号不能为空!",err:"手机号格式不正确!"}
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
      let value={accountType:valueList[0],accountName:valueList[1],accountNumber:valueList[2],tel:valueList[3]};
      console.log("value1111:",value);
    }
  },
  components:{
    SelectList
  }
}
</script>
