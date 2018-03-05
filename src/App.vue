<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery';
import {util} from '@/assets/js/util'

export default {
  name: 'App',
  data(){
    return {
      queryEnum:{},
    }
  },
  beforeCreate(){
    function getSessionInfo(){
      return new Promise((resolve, reject)=>{
        if(!(util.checkObjectIsEmpty(window.userinfo))){
          resolve();
          return;
        }
        $.ajax({
          type : "post",
          url : "./rest/getSessionInfo",
          async : false,
          success:(response)=>{
            if(response.status==0){
              window.userinfo=response.data.userinfo;
              resolve();
            }
          },
          error:(response)=>{
            reject();
          }
        });
      })
    }

    getSessionInfo().then(()=>{},()=>{});
    eventHandle.$on("getEnumData",()=>{
      if(util.checkObjectIsEmpty(this.queryEnum)){
        this.getEnumData().then(()=>{
          eventHandle.$emit("setEnumData",{queryEnum:this.queryEnum});
        },()=>{
          eventHandle.$emit("setEnumData",{});
        });
      }else{
        eventHandle.$emit("setEnumData",{queryEnum:this.queryEnum});
      }
    });
  },
  created(){
    this.getEnumData().then(()=>{},()=>{});
  },
  destoryed(){
    eventHandle.$off("getEnumData");
  },
  methods:{
    getEnumData:function(){
      return new Promise((resolve,reject)=>{
        if(!util.checkObjectIsEmpty(this.queryEnum)){
          resolve();
          return this.queryEnum;
        }
        $.post("./rest/addInfoForylpayCapply/queryEnum").then((response) => {
          if(response.status==0){
            this.queryEnum=response.data;
            resolve();
          }else{
            reject();
          }
        })
          .catch(function(response) {
            Toast("获取枚举信息列表异常，请稍后在操作！");
            reject();
          });
      })
    },
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
ul,li{
  list-style-type: none;
  padding:0;
}
.floatLeft{
  float:left;
}
.floatRight{
  float: right;
}
.clear{
  overflow: hidden;
  clear: both;
  display: block;
}
.textCenter{
  text-align: center !important;
}
button{
  text-shadow: none;
  border:0;
}
a{
  border:0;
  text-decoration:none;
}

.clear:after{
  content:'';
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width:100%;
  overflow: hidden;
  clear: both;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size:100%;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#app .mint-swipe-indicator{
  background: #858585;
  opacity: 1;
}
#app .mint-swipe-indicator.is-active{
  background: #379aff;
  opacity: 1;
}
</style>
