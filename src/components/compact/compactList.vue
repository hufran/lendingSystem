<template>
  <div class="compactList">
    <my-header :title="title"></my-header>
    <ul class="compact_list">
      <li v-for="list in data" @click="showCompact(list.investUrl)">
          <span>{{list.mobile.substr(0,4)}}****{{list.mobile.substr(-3,3)}}</span>
          <span>{{list.amount}}</span>
          <span>查看合同 &nbsp; &nbsp; &nbsp; &nbsp;</span>
      </li>
    </ul>
  </div>
</template>
<style>
  .compactList{
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .compactList ul{
    background:#fff;
    font-size:0.41rem;
  }
  .compactList li{
    border-bottom:1px solid #c0c0c0;
    padding:0 0.6rem;
    color: #777;
    line-height:1.2rem;
    display: flex;
    justify-content: space-between;
  }

  li a{
    color: #000
  }

</style>
<script>
  import MyHeader from '@/components/header/header'
  import { Toast } from 'mint-ui';
  import $ from 'jquery';

  export default{
    data(){
      return {
        title: '',
        data:[],
        loanStatus:'',
        requestId:''
      }
    },
    created(){
      this.title=this.$route.query.title;
      eventHandle.$on("compactList",({investList})=>{
          this.data = investList
      });
      eventHandle.$emit("getcompactList");
    },
    methods:{
      showCompact:function(url){
        var url = encodeURIComponent(url)
        if(url.indexOf('http')>-1){
           this.$router.push(`/compact/url?title=${this.title}&url=${url}`)
        }else{
           Toast(url);
        }
      }
    },
    components: {
      MyHeader
    }
  }
</script>
