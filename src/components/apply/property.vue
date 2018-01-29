<template>
  <div class="propertyInfo_body">
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

</style>
<script>
import SelectList from '@/components/modal/selectList'
import { MessageBox } from 'mint-ui'

export default{
  data(){
    return {
      data:[
        {name:"车辆信息",value:"",placeHolder:"请选择车辆信息",input:false,require:true,empty:"请选择车辆信息!",index:0,slots:[{values: ['车辆信息一', '车辆信息二', '车辆信息三']}]},
        {name:"住房情况",value:"",placeHolder:"请选择住房情况",input:false,require:true,empty:"请选择住房情况!",index:1,slots:[{values: ['车辆信息一', '车辆信息二', '车辆信息三']}]},
        {name:"社保卡",value:"13333333333",placeHolder:"请输入社保卡号",type:"text",input:true,require:false,regex:/^[\d]{3}-[\d]{2}-[\d]{4}$/,empty:"社保卡号不能为空!",err:"社保卡号格式不正确!"},
        {name:"其他",value:"",placeHolder:"请输入其他情况",input:true,type:"text",require:false,regex:/^.{0,1000}$/,empty:"请输入其他情况!",err:"格式不正确!"},
      ],
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","财产信息");
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
      let value={carInfo:valueList[0],homeInfo:valueList[1],socialSecurity:valueList[2],other:valueList[3]};
      console.log("value1111:",value);
    }
  },
  components:{
    SelectList
  }

}
</script>
