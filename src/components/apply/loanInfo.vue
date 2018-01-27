<template>
  <div class="guaranteeInfo_body">
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
      <li class="guaranteeInfo_new">
        <a href="javascript:void(0);">+ 新增</a><a href="javascript:void(0);" class="delete"></a>
      </li>
    </ul>
    <mt-button type="primary">保 存</mt-button>
  </div>
</template>
<style>
  .applyList_body .guaranteeInfo_new{
    text-align: center;
    position: relative;
  }
  .applyList_body .guaranteeInfo_new a{
    display: inline-block;
    padding:0;
  }
  .applyList_body .guaranteeInfo_new a.delete{
    position:absolute;
    right:0.6rem;
    top:0.3rem;
    /*background:url("@/img/delete.png") no-repeat;*/
    width:15px;
    height:18px;
  }
</style>
<script>
export default{
  data(){
    return {
      data: [
        {name:"借款类别",value:"资产抵押",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"借款金额",value:"10000",linkUrl:"javascript:void(0);",options:[]},
        {name:"还款日期",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"信息一",value:0,method:this.changeItem},{name:"信息二",value:1,method:this.changeItem}],sheetVisible:false},
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
