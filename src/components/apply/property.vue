<template>
  <div class="propertyInfo_body">
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
        {name:"车辆信息",alias:"vehicle",value:"",placeHolder:"请选择车辆信息",input:false,require:false,empty:"请选择车辆信息!",index:0,slots:[{values: ['无车', '1辆', '2辆',"大于2辆"]}]},
        {name:"住房情况",alias:"house",value:"",placeHolder:"请选择住房情况",input:false,require:true,empty:"请选择住房情况!",index:1,slots:[{values: ['本人全款商品房', '本人按揭商品房', '直系亲属房产','自建房','租房','其他']}]},
        {name:"社保卡",alias:"socialSecurityCard",value:"13333333333",placeHolder:"请输入社保卡号",type:"text",input:true,require:false,regex:/^[\d]{3}-[\d]{2}-[\d]{4}$/,empty:"社保卡号不能为空!",err:"社保卡号格式不正确!"},
        {name:"其他",alias:"estateOther",value:"",placeHolder:"请输入其他情况",input:true,type:"text",require:false,regex:/^.{0,100}$/,empty:"请输入其他情况!",err:"其他情况需要100字以内!"},
      ],
      queryEnum:{},
      applyInfo:{},
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","财产信息");
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
    let {houseInfo}=this.applyInfo;
    console.log("houseInfo：",houseInfo);
    if(houseInfo){
      for(let key in this.data){
        this.data[key].value=(!houseInfo[this.data[key]["alias"]])?"":(houseInfo[this.data[key]["alias"]]);
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
      let {carInfo,house}=this.queryEnum;
      valueList["vehicle"]=util.selectValueForObject(carInfo,valueList["vehicle"]);
      valueList["house"]=util.selectValueForObject(house,valueList["house"]);
      valueList.loginName=window.userinfo.loginName;
      console.log("value1111:",valueList);

      $.post(window.baseUrl+"rest/addInfoForylpayCapply/addPropertyInfoForPc",valueList).then((response) => {
        if(response.status==0){
          Toast("财产信息补件成功！");
          eventHandle.$emit("updateApply");
        }else{
          Toast(response.message);
        }
        console.log(response)
      })
      .catch(function(response) {
        Toast("财产信息补件异常，请稍后重试！");
      });
    }
  },
  components:{
    SelectList
  }

}
</script>
