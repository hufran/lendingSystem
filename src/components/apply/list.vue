<template>
  <div class="applyList">
    <header-component :title="title" />
    <div class="applyList_body">
      <router-view />
    </div>
  </div>

</template>
<style>
  .applyList{
    background: rgb(242, 242, 242);
    height:100%;
  }
  .applyList_body ul{
    background:#fff;
    font-size:0.41rem;
    width:100%;
  }
  .applyList_body ul li{
    border-bottom:1px solid #c0c0c0;
  }
  .applyList_body ul a{
    padding:0 0.6rem;
    color: #777;
    line-height:1.2rem;
    display: block;
  }
  .applyList_body ul span{
    line-height:1.2rem;
  }
  .applyList_body button{
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
      title:"小额经营贷",
      applyList:[
        {title:"个人信息",linkUrl:"/apply/person"},
        {title:"财产信息",linkUrl:"/"},
        {title:"店铺信息",linkUrl:"/"},
        {title:"风控信息",linkUrl:"/"},
        {title:"担保信息",linkUrl:"/"},
        {title:"借款情况",linkUrl:"/"},
        {title:"影像资料",linkUrl:"/"},
      ]
    }
  },
  methods:{
    submit:function(){
      console.log(this.$router);

    }
  },
  components: {
    HeaderComponent
  }
}

</script>
