<template>
    <div class="personInfo_body">
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
  .mint-actionsheet .mint-actionsheet-button{
    padding:0;
  }
</style>
<script>
export default{
  data(){
    return {
      data:[
        {name:"姓名",value:"苏妮妮",linkUrl:"javascript:void(0);",options:[]},
        {name:"身份证号",value:"133223232345678654",linkUrl:"javascript:void(0);",options:[]},
        {name:"手机号",value:"13333333333",linkUrl:"javascript:void(0);",options:[]},
        {name:"所属行业",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"行业一",value:0,method:this.changeItem},{name:"行业二",value:1,method:this.changeItem},{name:"行业三",value:2,method:this.changeItem}],sheetVisible:false},
        {name:"年收入",value:"100000",linkUrl:"javascript:void(0);",options:[]},
        {name:"本地居住时间",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"一年",value:0,method:this.changeItem},{name:"二年",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"婚姻状况",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"已婚",value:0,method:this.changeItem},{name:"未婚",value:1,method:this.changeItem}],sheetVisible:false},
        {name:"抚养人数",value:"",linkUrl:"javascript:void(0);",checked:0,options:[{name:"1人",value:0,method:this.changeItem},{name:"2人",value:1,method:this.changeItem}],sheetVisible:false},
      ],
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","个人申请");
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
