<template>
  <div class="useCredit">
    <header-component :title="title" />
    <div class="useCredit_body">
      <ul>
        <li v-for="(list,index) in data" class="clear">
          <span class="title floatLeft">{{list.name}}</span>
          <span v-if="list.input" class="floatRight">
            <input :type="list.type" :placeholder="list.placeHolder" :require="list.require" :attr-regex="list.regex" v-model="list.value"  />
          </span>
          <span  class="floatRight" v-else>
            <i @click="openPicker(list.index)">{{list.value==""?list.placeHolder:list.value}} &gt;</i>
            <select-list ref="picker" :slots="list.slots" :data-index="list.index" />
          </span>
        </li>
      </ul>
      <div class="textCenter">
        <mt-button type="primary" @click="submit">提交</mt-button>
      </div>

    </div>
  </div>
</template>
<style>
  .useCredit{
    background: rgb(242, 242, 242);
    height:100%;
  }
  .useCredit_body{
    background:#fff;
    margin-top:0.1rem;
    text-align:left;
  }
  .useCredit_body ul{
    background:#fff;
    font-size:0.41rem;
    width:100%;
  }
  .useCredit_body ul li{
    padding:0 0.6rem;
    color: #777;
    line-height:1.2rem;
    border-bottom:1px solid #c0c0c0;
  }
  .useCredit_body ul input{
    border:1px solid #b9b9b9;
    line-height:0.8rem;
    color:#777;
    padding-left:0.2rem;
  }
  .useCredit_body ul i{
    font-style: normal;
  }
  .useCredit .mint-button--normal{
    line-height:1.2rem;
    margin:0.48rem 0;
    width:70%;
    font-size:0.5rem;
  }
  .useCredit_body .picker-slot{
    width:100%;
    text-align: center;
  }
</style>
<script>
import HeaderComponent from '@/components/header/header'
import SelectList from '@/components/modal/selectList'

export default{
  data(){
    return {
      title: '用信申请',
      data:[
        {name:"借款额度",value:"",placeHolder:"请输入借款额度",type:"number",input:true,require:true,regex:/^((0\.\d?)||([1-9]\d*(\.\d*[1-9])?))+$/i,empty:"借款额度不能为空!",err:"借款额度不能小于0!"},
        {name:"借款期限",value:"",placeHolder:"请选择借款期限",input:false,require:true,empty:"请选择借款期限!",index:0,slots:[{values: ['选项一', '选项二', '选项三', '选项四', '选项五']}]},
        {name:"还款方式",value:"",placeHolder:"请选择还款方式",input:false,require:true,empty:"请选择还款方式!",index:1,slots:[{values: ['选项一', '选项二', '选项三', '选项四', '选项五']}]},
        {name:"登录密码",value:"",class:{},placeHolder:"请输入登录密码",type:"password",input:true,require:true,regex:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/ig,empty:"登录密码不能为空!",err:"登录密码格式不正确!"},
      ],
      slots: [
        {
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  created(){
    eventHandle.$on("change",(obj,values)=>{
      this.onValuesChange(obj,values);
    });
  },
  methods:{
    openPicker:function(index){
      this.$refs.picker[index].open();
    },
    onValuesChange:function(data,value) {
      console.log(data,value);
    },
    submit:function(){

    }
  },
  components: {
    HeaderComponent,SelectList
  }
}</script>
