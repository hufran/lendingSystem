<template>
  <div class="articleInfo">
    <my-header :title="title"></my-header>
    <div class="articleInfoContent" v-html="contentList">
    </div>
  </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  import $ from 'jquery';
  import { Toast } from 'mint-ui'

  export default {
    data () {
      return {
        title: '了解我们',
        category:{
          register:{category:"DECLARATION",name:"新毅金融用户注册协议"},
          open:{category:"DECLARATION",name:"廊坊银行网络借贷交易资金存管业务三方协议"},
          know:{category:"OTHER",name:"关注我们"}
        },
        titleCategory:"",
        name:"",
        contentList:""
      }
    },
    created: function(){
      if(this.category[this.$route.query.protocol]){
        this.title=this.name=this.category[this.$route.query.protocol].name;
        this.titleCategory=this.category[this.$route.query.protocol].category;
      }else{
        this.title=this.name=this.category.know.name;
        this.titleCategory=this.category.know.category;
      }
      this.getArticle().then((data)=>{
        this.contentList=data[0].content;
      },(data)=>{
        if(data){
          this.contentList="";
        }
      });
    },
    methods:{
      getArticle:function(){
        return new Promise((resolve, reject)=>{
          $.ajax({
            url:window.baseUrl+"rest/category/"+this.titleCategory+"/name/"+encodeURIComponent(encodeURIComponent(this.name)),
            method:"get",
            dataType:'json',
            success(data){
              if(data[0]){
                resolve(data);
              }else{
                reject(data);

              }
            },
            error(err){
              Toast("服务器异常，请稍后重试!");
              reject();
            }
          });
        });
      }
    },
    components: {
      MyHeader
    }
  }
</script>

<style>
  .articleInfo{
    width:100%;
    height: 100%;
  }
  .articleInfo .articleInfoContent{
    padding:5%;
    text-align: left;
    font-size:0.3rem;
    line-height: 0.5rem;
  }
  .articleInfo header.m-header h1{
    font-size: 14px;
  }
  .articleInfoContent p span{
    font-size: 0.4rem !important;
  }

</style>
