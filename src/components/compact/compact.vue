<template>
  <div class="compact">
    <my-header :title="title"></my-header>
    <ul class="compact_list">
      <li v-for="list in data">
        <router-link :to="list.url">
          <span>{{list.title}}</span>
          <span v-if="list.amout">{{list.amout}}</span>
          <span v-if="list.amout">查看合同 &nbsp; &nbsp; &nbsp; &nbsp;</span>
        </router-link>
      </li>
    </ul>
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
          {title:'《718金融平台借款合同》',url:"/loanCompact"},
          {title:"《718金融平台借款信息咨询与服务协议》",url:"/loanServiceCompact"},
          {title:"《电子签章授权委托协议》",url:"/authorizationCompact"}
        ],
        loanStatus:''
      }
    },
    created(){
      eventHandle.$on("loanStatus",({title,loanid})=>{
        this.loanStatus=title;
        if(this.loanStatus==="已结清"||this.loanStatus==="已逾期"){
          this.data=[];
          $.post(window.baseUrl+"rest/findContractByRequestId/"+loanid).then(({msg,status,data:{investList}})=>{
            if(status==0){
              for(let i=0,length=investList.length;i<length;i++){
                let mobile=investList[i].mobile.substring(0,3)+"*****"+investList[i].mobile.substring(9);
                this.data.push({title:investList[i].mobile,amout:investList[i].amount,url:investList[i].investUrl});
              }
            }else{
              Toast(msg);
              return;
            }
          })
        }
      });
      eventHandle.$emit("getLoanStatus");
    },
    methods:{

    },
    components: {
      MyHeader
    }
  }
</script>
