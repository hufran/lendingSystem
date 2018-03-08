<template>
   <div class="help">
     <my-header :title="title" v-if="showTitle"></my-header>
     <el-collapse v-model="activeNames" @change="handleChange">
       <el-collapse-item v-for="(data,index) in titleList" v-bind:key="index" :title="data" :name="index">
         <div v-html="contentList[index]">
         </div>
       </el-collapse-item>

     </el-collapse>
   </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  import $ from 'jquery';
  import {Toast} from 'mint-ui';

  export default {
    data () {
      return {
        title: '帮助中心',
        popupVisible: false,
        titleList:['注册/登录','资金存管','借款相关','常见问题'],
        titleCategory:'LOANHELP',
        contentList:[],
        content: '',
        showTitle:true,
        activeNames: ['0']
      }
    },
    created: function(){
      if(this.$route.query.show&&this.$route.query.show=='0'){
        this.showTitle=false
      }
      this.titleList.forEach((data,index)=>{
        this.getContent.call(this,data,index);
      })
    },
    methods: {
      showPup: function(index){
        this.popupVisible = true;
        this.content = this.contents[index]
      },
      handleChange(val) {
        console.log(val);
      },
      getContent:function(data,index){

        let self=this;
        $.ajax({
          url:window.baseUrl+"rest/category/"+this.titleCategory+"/name/"+encodeURIComponent(encodeURIComponent(data)),
          method:"get",
          dataType:'json',
          success(data){
            if(data[0]){

              self.$data.contentList[parseInt(index)]=data[0].content;
            }else{
              self.$data.contentList[parseInt(index)]=null;
              Toast(data.msg);
            }
          },
          error(err){
            console.log(err);
            Toast("服务器异常，请稍后重试");
          }
        })
      }
    },
    components: {
      MyHeader
    }
  }
</script>

<style scoped>
.help{
  width:100%;
  height:100%;
}
  ul{
    text-align: left;
    width: 90%;
    margin: 1rem auto;
  }
  ul li{
    border: 1px solid #c0c0c0;
    height:1.2rem;
    line-height:1.2rem;
    padding-left:1rem;
  }

.mint-popup{
  width:100%;
  min-height:3rem;
  font-size:0.4rem;
}
  .mint-popup .content{
    width:90%;
    margin:10px auto;
    text-align: left;
  }
  .el-collapse{
    text-align: left;
  }

</style>
