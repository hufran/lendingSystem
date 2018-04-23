<template>
    <div class="personInfo_body">
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
  .mint-actionsheet .mint-actionsheet-button{
    padding:0;
  }
</style>
<script>
import SelectList from '@/components/modal/selectList'
import {util} from '@/assets/js/util'
import $ from 'jquery';
import { Toast } from 'mint-ui';

export default{
  data(){
    return {
      data:[
        {name:"账户类型",alias:"bankType",value:"",placeHolder:"请选择账户类型",input:false,require:true,empty:"请选择账户类型!",index:0,defaultIndex:0,slots:[{values: ['个人']}]},
        {name:"账户名称",alias:"bankName",value:"",placeHolder:"请输入账户名称",type:"text",input:true,require:true,regex:/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/i,length:20,empty:"账户名称不能为空!",err:"账户名称姓名格式不正确!"},
        {name:"银行账号",alias:"bankNo",value:"",placeHolder:"请输入银行账号",type:"text",input:true,require:true,regex:/([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/,empty:"银行账号不能为空!",err:"银行账号格式不正确!"},
        {name:"手机号",alias:"bankTel",value:"",placeHolder:"请输入手机号",type:"number",input:true,require:true,regex:/^[1][3,4,5,7,8][0-9]{9}$/,empty:"手机号不能为空!",err:"手机号格式不正确!"}
      ],
      queryEnum:{},
      applyInfo:{},
      loginName:""
    }
  },
  beforeCreate(){
    eventHandle.$off("setEnumData");
    eventHandle.$off("setApplyInfo");
    eventHandle.$off("confirm");
    eventHandle.$emit("title","银行卡信息");
    eventHandle.$on("confirm",(values,index)=>{
      this.confirm(values,index);
    });

    eventHandle.$on("setEnumData",(data)=>{
      if(!util.checkObjectIsEmpty(data)){
        this.queryEnum=data.queryEnum;
        const {bankAccountType}=this.queryEnum;
        this.data[0].slots[0].values=[];
        if(bankAccountType){
          for(let key of bankAccountType){
            this.data[0].slots[0].values.push(key.value);
          }
        }
      }
    });
    eventHandle.$on("setApplyInfo",(data)=>{
      if(!util.checkObjectIsEmpty(data)){
        this.applyInfo=data.applyInfo;
        let {bankInfo}=this.applyInfo;
        console.log("bankInfo：",bankInfo);
        if(bankInfo){
          for(let key in this.data){
            this.data[key].value=(!bankInfo[this.data[key]["alias"]])?"":(bankInfo[this.data[key]["alias"]]);
            if (this.data[key].slots) {
              for (let i = 0, len = this.data[key].slots[0].values.length; i < len; i++) {
                if (this.data[key].value == this.data[key].slots[0].values[i]) {
                  this.data[key].defaultIndex = i;
                }
              }
            }
          }
        }
      }
    });
  },
  created(){
    eventHandle.$emit("getEnumData");
    eventHandle.$emit("getApplyInfo");
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
            }else if(this.data[i].length&&this.data[i].value.length>this.data[i].length){
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
      if(util.checkObjectIsEmpty(this.queryEnum)){
        Toast("获取枚举信息失败，请稍后尝试！");
        eventHandle.$emit("getEnumData");
        return false;
      }
      let value={loginName:window.userinfo.mobile,bankType:valueList[0],bankName:valueList[1],bankNo:valueList[2],bankTel:valueList[3]};
      let {bankAccountType}=this.queryEnum;
      value.bankType=util.selectValueForObject(bankAccountType,value.bankType);

      $.post(window.baseUrl+"rest/addInfoForylpayCapply/addBankInfo",value).then((response) => {
        if(response.status==0){
          Toast("银行信息补件成功！");
          eventHandle.$emit("updateApply");
        }else{
          Toast(response.message);
        }
        console.log(response)
      })
      .catch(function(response) {
        Toast("银行信息补件异常，请稍后重试！");
      });
    }
  },
  components:{
    SelectList
  }
}
</script>
