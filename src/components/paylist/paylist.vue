<template>
  <div class="paylist">
    <my-header :title="title"></my-header>
    <div class="content">
      <ul>
        <li>
          <span>本<span style="visibility: hidden">隐藏站位</span>金:</span>
          <span>20000</span>
        </li>
        <li>
          <span>利<span style="visibility: hidden">隐藏站位</span>息:</span>
          <span>1000</span>
        </li>
        <li>
          <span>管<span style="visibility: hidden">1隐</span>理<span style="visibility: hidden">1隐</span>费:</span>
          <span>200</span>
        </li>
        <li>
          <span>违<span style="visibility: hidden">1隐</span>约<span style="visibility: hidden">1隐</span>金:</span>
          <span>100</span>
        </li>
        <li>
          <span>罚<span style="visibility: hidden">隐藏站位</span>息:</span>
          <span>100</span>
        </li>
        <li>
          <span>减<span style="visibility: hidden">隐藏站位</span>免:</span>
          <span>100</span>
        </li>
        <li>
          <span>实际应还金额:</span>
          <span>21000</span>
        </li>
        <li>
          <span>实际应还日期:</span>
          <span>2017-01-02</span>
        </li>
      </ul>
    </div>
    <div class="btn">还款</div>
  </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  export default {
    data () {
      return {
        title: '第二期账单'
      }
    },
    created: function(){
      console.log(this.$route.params)
    },
    methods: {

    },
    components: {
      MyHeader
    }
  }
</script>

<style scoped>
.paylist{
  width:100%;
  height:100%;
  position: fixed;
  top:0;
  left:0;
  background: #fff;
  z-index:101;
}
ul{
  list-style: none;
  text-align: left;
  margin-top:0.95rem;
  padding-left:0.8rem;
}
li{
  height:1.2rem;
  line-height:1.5rem;
  font-size:0.35rem;
}
li>span{
  display: inline-block;
}
li span:first-child{
  width:30%;
}
  .btn{
    position: fixed;
    bottom: 1.35rem;
    left:50%;
    transform: translateX(-50%);
    width:50%;
    padding:10px 0;
    border-radius: 50px;
    color: #fff;
    background-color: #379aff;
  }
</style>
