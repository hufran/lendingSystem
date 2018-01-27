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
        {name:"负债情况",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"还款来源",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"还款保障措施",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"项目风险评估",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"可能产生的风险结果",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"是否在其他网贷平台有未还借款",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"逾期情况",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"诉讼情况",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"受行政处罚情况",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"贷款用途",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"贷款描述",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
      ]
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","风控信息");
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
