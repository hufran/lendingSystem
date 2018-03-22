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
import { Toast } from 'mint-ui';
import {util} from '@/assets/js/util'
import $ from 'jquery';

export default{
  data(){
    return {
      data:[
        {name:"姓名",alias:"name",value:"苏妮妮",placeHolder:"请输入姓名",type:"text",input:true,require:true,regex:/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/i,length:10,empty:"用户姓名不能为空!",err:"姓名格式不正确!"},
        {name:"身份证号",alias:"idNumber",value:"133223232345678654",placeHolder:"请输入身份证号",type:"text",input:true,require:true,regex:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/i,empty:"身份证号不能为空!",err:"身份证号格式不正确!"},
        {name:"手机号",alias:"telNo",value:"13333333333",placeHolder:"请输入手机号",type:"number",input:true,require:true,regex:/^[1][3,4,5,7,8][0-9]{9}$/,empty:"手机号不能为空!",err:"手机号格式不正确!"},
        {name:"所属行业",alias:"industry",value:"",placeHolder:"请选择所属行业",input:false,require:true,empty:"请选择所属行业!",index:0,defaultIndex:0,slots:[{values: ['零售业']}]},
        {name:"年收入",alias:"yearIncome",value:"100000",placeHolder:"请输入年收入",type:"number",input:true,require:true,regex:/^((0\.\d?)||([1-9]\d*(\.\d*[1-9])?))+$/i,empty:"年收入不能为空!",err:"年收入应该大于0!"},
        {name:"本地居住时间",alias:"loaclLiveTime",value:"",placeHolder:"请选择本地居住时间",input:false,require:true,empty:"请选择本地居住时间!",index:1,defaultIndex:0,slots:[{values: ['五年以上', '一年以上五年（含）以下', '一年（含）以下']}]},
        {name:"婚姻状况",alias:"marriage",value:"",placeHolder:"请选择婚姻状况",input:false,require:true,empty:"请选择婚姻状况!",index:2,defaultIndex:0,slots:[{values: ['离异', '未婚','丧偶', '已婚有子女', '已婚无子女']}]},
        {name:"抚养人数",alias:"supportPeoCount",value:"",placeHolder:"请选择抚养人数",input:false,require:true,empty:"请选择抚养人数!",index:3,defaultIndex:0,slots:[{values: ['0人', '1到2人', '2人以上']}]}
      ],
      queryEnum:{},
      applyInfo:{}
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","个人申请");
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
    let {personalInfo}=this.applyInfo;
    console.log("personalInfo：",personalInfo);
    if(personalInfo){
      for(let key in this.data){
        this.data[key].value=(!personalInfo[this.data[key]["alias"]])?"":(personalInfo[this.data[key]["alias"]]);
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
      let valueList={};
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

        valueList[this.data[i]["alias"]]=this.data[i].value;
      }

      if(util.checkObjectIsEmpty(this.queryEnum)){
        Toast("获取枚举信息失败，请稍后尝试！");
        eventHandle.$emit("getEnumData");
        return false;
      }
      valueList.loginName=window.userinfo.loginName;

      let {Industory,localLiveTime,marriage,supportPeople}=this.queryEnum;
      valueList["industry"]=util.selectValueForObject(Industory,valueList["industry"]);
      valueList["loaclLiveTime"]=util.selectValueForObject(localLiveTime,valueList["loaclLiveTime"]);
      valueList["marriage"]=util.selectValueForObject(localLiveTime,valueList["marriage"]);
      valueList["supportPeoCount"]=util.selectValueForObject(supportPeople,valueList["supportPeoCount"]);
      console.log("valueList1111:",valueList);
      $.post(window.baseUrl+"rest/addInfoForylpayCapply/addPersonalInfo",valueList).then((response) => {
        if(response.status==0){
          Toast("个人信息补件成功！");
          eventHandle.$emit("updateApply");
        }else{
          Toast(response.message);
        }
        console.log(response)
      })
      .catch(function(response) {
        Toast("个人信息补件异常，请稍后重试！");
      });

    }
  },
  components:{
    SelectList
  }
}
</script>
