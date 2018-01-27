<template>
  <div class="propertyInfo_body">
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
      data:[
        {name:"车辆信息",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"住房情况",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"社保卡",value:"13333333333",linkUrl:"javascript:void(0);",options:[]},
        {name:"其他",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
      ],
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","财产信息");
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
