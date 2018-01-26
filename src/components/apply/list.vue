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
  .applyList_body .btn{
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
  i{
    font-style: normal;
  }
</style>
<script>
import HeaderComponent from '@/components/header/header'
export default{
  data(){
    return {
      title:"小额经营贷"
    }
  },
  beforeCreate(){
    eventHandle.$on("title",(data)=>{
       this.title=data;
    });
  },
  components: {
    HeaderComponent
  }
}

</script>
