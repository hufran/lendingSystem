<template>
  <div class="shopInfo_body">
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

</style>
<script>
import SelectList from '@/components/modal/selectList'
import { Toast } from 'mint-ui';
import {util} from '@/assets/js/util'
import $ from 'jquery';

export default{
  data(){
    return {
      data: [
        {name:"店铺地址",alias:"shopAddress",value:"北京西城广安门外大街168号",placeHolder:"请输入店铺地址",type:"text",input:true,require:true,regex:/^.{1,100}$/i,empty:"店铺地址不能为空!",err:"店铺地址需要在100字之内!"},
        {name:"店铺房产类型",alias:"shopEstateType",value:"",placeHolder:"请选择店铺房产类型",input:false,require:true,empty:"请选择店铺房产类型!",index:0,defaultIndex:0,slots:[{values: ['自有房产有按揭', '自有住房无按揭', '租用','其他']}]},
        {name:"店铺类型",alias:"shopType",value:"",placeHolder:"请选择店铺类型",input:false,require:true,empty:"请选择店铺类型!",index:1,defaultIndex:0,slots:[{values: ['烟酒商店', '超市', '便利店','食杂店']}]},
        {name:"市场类型",alias:"shopMarketType",value:"",placeHolder:"请选择市场类型",input:false,require:true,empty:"请选择市场类型!",index:2,defaultIndex:0,slots:[{values: ['城市', '城镇', '农村']}]},
        {name:"用户类型",alias:"shopUserType",value:"",placeHolder:"请选择用户类型",input:false,require:true,empty:"请选择用户类型!",index:3,defaultIndex:0,slots:[{values: ['零售', '批发']}]},
        {name:"店铺规模",alias:"shopScale",value:"",placeHolder:"请选择店铺规模",input:false,require:true,empty:"请选择店铺规模!",index:4,defaultIndex:0,slots:[{values: ['大规模', '中型规模','小规模']}]},
        {name:"店铺经营年限",alias:"shopRunYear",value:"",placeHolder:"请选择店铺经营年限",input:false,require:true,empty:"请选择店铺经营年限!",index:5,defaultIndex:0,slots:[{values: ['10年以上', '5年-10年（含）','3年-5年（含）','1年-3年（含）','1年（含）以内']}]}, 
        {name:"员工数量",alias:"shopStaffCount",value:"",placeHolder:"请选择员工数量",input:false,require:true,empty:"请选择员工数量!",index:6,defaultIndex:0,slots:[{values: ['1-2人', '3-5人','5-10人','10人以上']}]},
        {name:"店铺面积",alias:"shopArea",value:"",placeHolder:"请选择店铺面积",input:false,require:true,empty:"请选择店铺面积!",index:7,defaultIndex:0,slots:[{values: ['10平米以下', '10平米（含）-50平米','50平米（含）-100平米','100平米（含）以上']}]},
        {name:"烟草登记负责人是否一致",alias:"shopRegisterIs",value:"",placeHolder:"请选择！",input:false,require:true,empty:"请选择烟草登记负责人是否一致!",index:8,defaultIndex:0,slots:[{values: ['是', '否']}]},
        {name:"烟草登记联系方式是否一致",alias:"shopContactIs",value:"",placeHolder:"请选择！",input:false,require:true,empty:"请选择烟草登记联系方式是否一致!",index:9,defaultIndex:0,slots:[{values: ['是', '否']}]},
        {name:"烟草专卖许可证等级",alias:"shopLevel",value:"",placeHolder:"请输入烟草专卖许可证等级",type:"text",input:true,require:true,regex:/^.{1,100}$/,empty:"烟草专卖许可证等级不能为空!",err:"烟草专卖许可证等级需要在100字以内!"},
        {name:"单次进货额度",alias:"shopEveryAmount",value:"",placeHolder:"请选择单次进货额度",input:false,require:true,empty:"请选择单次进货额度!",index:10,defaultIndex:0,slots:[{values: ['0-20000', '20000-50000','50000-100000','100000以上']}]},
        {name:"进货频次",alias:"shopInFrequency",value:"",placeHolder:"请选择进货频次",input:false,require:true,empty:"请选择进货频次!",index:11,defaultIndex:0,slots:[{values: ['月1次', '月2次','月3次','月4次','月大于4次']}]}
      ],
      queryEnum:{},
      applyInfo:{},
    }
  },
  beforeCreate(){
    eventHandle.$off("setEnumData");
    eventHandle.$off("setApplyInfo");
    eventHandle.$off("confirm");
    eventHandle.$emit("title","店铺信息");
    eventHandle.$on("confirm",(values,index)=>{
      this.confirm(values,index);
    });
    eventHandle.$on("setEnumData",(data)=>{
      if(!util.checkObjectIsEmpty(data)){
        this.queryEnum=data.queryEnum;
      }
    });
    eventHandle.$on("setApplyInfo",(data)=>{
      if(!util.checkObjectIsEmpty(data)){
        this.applyInfo=data.applyInfo;
        let {shopInfo}=this.applyInfo;
        if(shopInfo){
          for(let key in this.data){
            this.data[key].value=(!shopInfo[this.data[key]["alias"]])?"":(shopInfo[this.data[key]["alias"]]);
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
      let {shopHouseType,shopType,shopMarketType,shopUserType,shopScaleType,shopRunYears,shopStaffCountType,shopAreaType,yesOrNo,shopEveryGoodsAmount,shopEveryGoodsFrequency}=this.queryEnum;
      valueList["shopEstateType"]=util.selectValueForObject(shopHouseType,valueList["shopEstateType"]);
      valueList["shopType"]=util.selectValueForObject(shopType,valueList["shopType"]);
      valueList["shopMarketType"]=util.selectValueForObject(shopMarketType,valueList["shopMarketType"]);
      valueList["shopUserType"]=util.selectValueForObject(shopUserType,valueList["shopUserType"]);
      valueList["shopScale"]=util.selectValueForObject(shopScaleType,valueList["shopScale"]);
      valueList["shopRunYear"]=util.selectValueForObject(shopRunYears,valueList["shopRunYear"]);
      valueList["shopStaffCount"]=util.selectValueForObject(shopStaffCountType,valueList["shopStaffCount"]);
      valueList["shopArea"]=util.selectValueForObject(shopAreaType,valueList["shopArea"]);
      valueList["shopRegisterIs"]=util.selectValueForObject(yesOrNo,valueList["shopRegisterIs"]);
      valueList["shopContactIs"]=util.selectValueForObject(yesOrNo,valueList["shopContactIs"]);
      valueList["shopEveryAmount"]=util.selectValueForObject(shopEveryGoodsAmount,valueList["shopEveryAmount"]);
      valueList["shopInFrequency"]=util.selectValueForObject(shopEveryGoodsFrequency,valueList["shopInFrequency"]);
      valueList.loginName=window.userinfo.loginName;
      console.log("valueList1111:",valueList);
      $.post(window.baseUrl+"rest/addInfoForylpayCapply/addShopInfoForPc",valueList).then((response) => {
        if(response.status==0){
          Toast("店铺信息补件成功！");
          eventHandle.$emit("updateApply");
        }else{
          Toast(response.message);
        }
        console.log(response)
      })
      .catch(function(response) {
        Toast("店铺信息补件异常，请稍后重试！");
      });
    }
  },
  components:{
    SelectList
  }
}
</script>
