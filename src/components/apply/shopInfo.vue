<template>
  <div class="shopInfo_body">
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

</style>
<script>
import SelectList from '@/components/modal/selectList'
import { MessageBox } from 'mint-ui'

export default{
  data(){
    return {
      data: [
        {name:"店铺地址",value:"北京西城广安门外大街168号",placeHolder:"请输入店铺地址",type:"text",input:true,require:true,regex:/^.{1,100}$/i,empty:"店铺地址不能为空!",err:"店铺地址需要在100字之内!"},
        {name:"店铺房产类型",value:"",placeHolder:"请选择店铺房产类型",input:false,require:true,empty:"请选择店铺房产类型!",index:0,slots:[{values: ['自有房产有按揭', '自有住房无按揭', '租用','其他']}]},
        {name:"店铺类型",value:"",placeHolder:"请选择店铺类型",input:false,require:true,empty:"请选择店铺类型!",index:1,slots:[{values: ['烟酒商店', '超市', '便利店','食杂店']}]},
        {name:"市场类型",value:"",placeHolder:"请选择市场类型",input:false,require:true,empty:"请选择市场类型!",index:2,slots:[{values: ['城市', '城镇', '农村']}]},
        {name:"用户类型",value:"",placeHolder:"请选择用户类型",input:false,require:true,empty:"请选择用户类型!",index:3,slots:[{values: ['零售户', '批发户']}]},
        {name:"店铺规模",value:"",placeHolder:"请选择店铺规模",input:false,require:true,empty:"请选择店铺规模!",index:4,slots:[{values: ['大', '中','小','烟草局给与店铺的评价']}]},
        {name:"店铺经营年限",value:"",placeHolder:"请选择店铺经营年限",input:false,require:true,empty:"请选择店铺经营年限!",index:5,slots:[{values: ['10年以上', '5年-10年（含）','3年-5年（含）','1年-3年（含）','1年（含）以内','1年（含）以内']}]}, 
        {name:"员工数量",value:"",placeHolder:"请选择员工数量",input:false,require:true,empty:"请选择员工数量!",index:6,slots:[{values: ['1-2人', '3-5人','5-10人','10人以上']}]},
        {name:"店铺面积",value:"",placeHolder:"请选择店铺面积",input:false,require:true,empty:"请选择店铺面积!",index:7,slots:[{values: ['10平米以下', '10平米（含）-50平米','50平米（含）-100平米','100平米（含）以上']}]},
        {name:"烟草登记负责人是否一致",value:"",placeHolder:"请选择！",input:false,require:true,empty:"请选择烟草登记负责人是否一致!",index:8,slots:[{values: ['是', '否']}]},
        {name:"烟草登记联系方式是否一致",value:"",placeHolder:"请选择！",input:false,require:true,empty:"请选择烟草登记联系方式是否一致!",index:9,slots:[{values: ['是', '否']}]},
        {name:"烟草专卖许可证等级",value:"32",placeHolder:"请输入烟草专卖许可证等级",type:"text",input:true,require:true,regex:/^.{1,100}$/,empty:"烟草专卖许可证等级不能为空!",err:"烟草专卖许可证等级需要在100字以内!"},
        {name:"单次进货额度",value:"",placeHolder:"请选择单次进货额度",input:false,require:true,empty:"请选择单次进货额度!",index:10,slots:[{values: ['0-20000', '20000-50000','50000-100000','100000以上']}]},
        {name:"进货频次",value:"",placeHolder:"请选择进货频次",input:false,require:true,empty:"请选择进货频次!",index:11,slots:[{values: ['月1次', '月2次','月3次','4次']}]}
      ]
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","店铺信息");
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
      let value={address:valueList[0],hourseType:valueList[1],shopType:valueList[2],marketType:valueList[3],userType:valueList[4],shopScale:valueList[5],ageLimit:valueList[6],staffNum:valueList[7],area:valueList[8],principal:valueList[9],contact:valueList[10],level:valueList[11],purchaseCredits:valueList[12],time:valueList[13]};
      console.log("value1111:",value);
    }
  },
  components:{
    SelectList
  }
}
</script>
