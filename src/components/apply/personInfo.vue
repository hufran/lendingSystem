<template>
  <div class="personInfo">
    <header-component/>
    <div class="personInfo_body">
      <ul>
        <li class="clear" v-for="list in data">
          <a :href="list.linkUrl" class="clear">
            <span class="floatLeft">{{list.name}}</span>
            <span class="floatRight" v-if="list.value==''">
              <mt-button
                type="primary"
                @click="sheetVisible = true">
                &gt;
              </mt-button>
              <mt-actionsheet
                cancel-text=""
                :actions="list.options"
                :visible.sync="sheetVisible">
              </mt-actionsheet>
            </span>
            <span  class="floatRight" v-if="!(list.value=='')">
              {{list.value}}
            </span>
          </a>
        </li>
      </ul>
      <button>保 存</button>
    </div>
  </div>
</template>
<style>
  .personInfo{
    background: rgb(242, 242, 242);
    height:100%;
  }
  .personInfo_body ul{
    background:#fff;
    font-size:0.41rem;
    width:100%;
  }
  .personInfo_body ul li{
    border-bottom:1px solid #c0c0c0;
  }
  .personInfo_body ul a{
    padding:0 0.6rem;
    color: #777;
    line-height:1.2rem;
    display: block;
  }
  .personInfo_body ul span{
    line-height:1.2rem;
  }
  .personInfo_body button{
    background: #169bd5;
    color:#fff;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    text-align: center;
    line-height:1.4rem;
    margin:0.48rem 0;
    width:70%;
    font-size:0.5rem;
  }
</style>
<script>
import HeaderComponent from '@/components/header/header'


export default{
  data(){
    return {
      data:[
        {name:"姓名",value:"苏妮妮",linkUrl:"javascript:void(0);",options:[]},
        {name:"身份证号",value:"133223232345678654",linkUrl:"javascript:void(0);",options:[]},
        {name:"手机号",value:"13333333333",linkUrl:"javascript:void(0);",options:[]},
        {name:"所属行业",value:"",linkUrl:"/apply",options:[{name:"行业一",value:0},{name:"行业二",value:1}]},
        {name:"年收入",value:"100000",linkUrl:"javascript:void(0);",options:[]},
        {name:"本地居住时间",value:"",linkUrl:"/apply",options:[{name:"一年",value:0},{name:"二年",value:1}]},
        {name:"婚姻状况",value:"",linkUrl:"/apply",options:[{name:"已婚",value:0},{name:"未婚",value:1}]},
        {name:"抚养人数",value:"",linkUrl:"/apply",options:[{name:"1人",value:0},{name:"2人",value:1}]},
      ],
    }
  },
  components: {
    HeaderComponent
  }
}
</script>
