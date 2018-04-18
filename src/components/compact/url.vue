<template>
  <div class="compactUrl">
    <my-header :title="title"></my-header>
    <div class="frameDiv">
      <!-- <iframe :src="url" frameborder="0"></iframe> -->
      <iframe id="show-iframe" frameborder=0 name="showHere" scrolling=auto :src="url"></iframe>
    </div>
  </div>
</template>
<style>
  .compactUrl{
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .compactUrl .m-header h1{
    font-size: 14px;
  }
  .frameDiv,iframe{
    width: 100%;
    height:100%;
  }

</style>
<script>
  import MyHeader from '@/components/header/header'

  export default{
    data(){
      return {
        title: '',
      }
    },
    created(){
          this.title=this.$route.query.title;
          this.url=this.$route.query.url;  
          console.log(this.url)       
    },
    methods:{
    },
    components: {
      MyHeader
    }
  }
</script>
