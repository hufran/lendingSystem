<template>
  <div class="shopInfo_body">
    <ul>
      <li class="clear" v-for="(list,i) in data">
        <a :href="list.linkUrl" class="clear">
          <span class="floatLeft">{{list.name}}</span>
          <span class="floatRight" v-if="list.value==''" @click="showSelect(i)">
              <i>{{list.options[list.checked].name}}</i>&gt;
              <mt-actionsheet
                :actions="list.options"
                v-model="list.sheetVisible">
              </mt-actionsheet>
            </span>
          <span  class="floatRight" v-if="!(list.value=='')">
              {{list.value}}
            </span>
        </a>
      </li>
    </ul>
    <mt-button type="primary">保 存</mt-button>
  </div>
</template>
<style>

</style>
<script>
export default{
  data(){
    return {
      data: [
        {name:"店铺地址",value:"北京西城广安门外大街168号",linkUrl:"javascript:void(0);",options:[]},
        {name:"店铺房产类型",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"店铺类型",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"市场类型",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"用户类型",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"店铺规模",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"店铺经营年限",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"员工人数",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"店铺面积",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"烟草登记负责人是否一致",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"烟草登记联系方式是否一致",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"烟草专卖许可证等级",value:"32",linkUrl:"javascript:void(0);",options:[]},
        {name:"单次进货额度",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"进货频次",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
      ]
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","店铺信息");
  },
  methods:{
    showSelect:function(index){
      this.data[index].sheetVisible=true;
      this.data[index].options.forEach((item,i)=>{
        if(typeof item.index=="undefined"){
          item.index=index;
        }else{
            return;
        }
      })
    },
    changeItem:function(item,index){
      this.data[item.index].checked=index;
    }
  }
}
</script>
