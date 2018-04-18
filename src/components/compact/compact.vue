<template>
  <div class="compact">
    <my-header :title="title"></my-header>
    <ul class="compact_list">
      <li v-for="list in data" @click="showCompact(list.url,list.title)">
          <span>《{{list.title}}》</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<style>
  .compact{
    background: #fff;
  }
  .compact ul{
    background:#fff;
    font-size:0.41rem;
  }
  .compact li{
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
        title: '相关协议',
        data:[
          {title:'718金融平台借款合同',url:""},
          {title:"718金融平台借款信息咨询与服务协议",url:""},
          {title:"电子签章授权委托协议",url:""}
        ],
        loanStatus:'',
        requestId:'',
        investList:[]
      }
    },
    beforeCreate(){
      eventHandle.$on("getcompactList",()=>{
        eventHandle.$emit("compactList",{investList:this.investList});
      })
    },
    created(){
      // eventHandle.$on("loanStatus",({title,loanid})=>{
          this.requestId=this.$route.query.requestId;
          $.post(window.baseUrl+"rest/findContractByRequestId/"+this.requestId).then(({msg,status,data:{investList,signUrl,serviceUrl}})=>{
            if(status==0){
              this.data[2].url = signUrl    
              this.data[1].url = serviceUrl
              if(investList.length == 0){
                this.data[0].url = '无对应的合同'
                return
              }
              this.investList = investList;
            }else{
              Toast(msg);
              return;
            }
          })
      // });
      // eventHandle.$emit("getLoanStatus");
    },
    methods:{
      showCompact:function(url,title){
        console.log(url,title)
        var url = encodeURIComponent(url)
        if(title == '718金融平台借款合同'){
          this.$router.push(`/compact/compactList?title=${title}`)
          return
        }
        if(url.indexOf('http')>-1){
           this.$router.push(`/compact/url?title=${title}&url=${url}`)
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
