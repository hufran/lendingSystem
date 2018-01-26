<template>
  <div class="jiekuan">
    <header class="m-header">
      <h1 class="text">我的借款</h1>
    </header>
    <div class="change-box">
      <div class="change">
        <div :class="{active: isActive}" @click="change(1)">进行中</div>
        <div :class="{active: !isActive}" @click="change(2)">已结束</div>
      </div>
    </div>

    <div class="detail">
      <div class="item" @click="toItem">
        <div class="item-top">
            <span>借款日期：2016-08-01</span>
            <span>还款中</span>
        </div>
        <div class="item-body">
          <div>借款金额： <span class="money">40000</span>元</div>
          <div>产品期限： <span>12期</span></div>
          <div>月综合费率： <span>0.88%每月</span></div>
        </div>
      </div>
      <div class="item">
        <div class="item-top">
          <span>借款日期：2016-08-01</span>
          <span>还款中</span>
        </div>
        <div class="item-body">
          <div>借款金额： <span class="money">40000</span>元</div>
          <div>产品期限： <span>12期</span></div>
          <div>月综合费率： <span>0.88%每月</span></div>
        </div>
      </div>
      <div class="item">
        <div class="item-top">
          <span>借款日期：2016-08-01</span>
          <span>还款中</span>
        </div>
        <div class="item-body">
          <div>借款金额： <span class="money">40000</span>元</div>
          <div>产品期限： <span>12期</span></div>
          <div>月综合费率： <span>0.88%每月</span></div>
        </div>
      </div>
      <div class="item">
        <div class="item-top">
          <span>借款日期：2016-08-01</span>
          <span>还款中</span>
        </div>
        <div class="item-body">
          <div>借款金额： <span class="money">40000</span>元</div>
          <div>产品期限： <span>12期</span></div>
          <div>月综合费率： <span>0.88%每月</span></div>
        </div>
      </div>
      <div class="item">
        <div class="item-top">
          <span>借款日期：2016-08-01</span>
          <span>还款中</span>
        </div>
        <div class="item-body">
          <div>借款金额： <span class="money">40000</span>元</div>
          <div>产品期限： <span>12期</span></div>
          <div>月综合费率： <span>0.88%每月</span></div>
        </div>
      </div>
      <div class="item">
        <div class="item-top">
          <span>借款日期：2016-08-01</span>
          <span>还款中</span>
        </div>
        <div class="item-body">
          <div>借款金额： <span class="money">40000</span>元</div>
          <div>产品期限： <span>12期</span></div>
          <div>月综合费率： <span>0.88%每月</span></div>
        </div>
      </div>

    </div>
    <my-footer :comein="comein"></my-footer>
    <router-view></router-view>
  </div>
</template>
<script>
  import MyFooter from '@/components/footer/footer'

  export default {
    data () {
      return {
        comein: '借款',
        title: '我的借款',
        isActive: true
      }
    },
    methods:{
       change: function(n){
         if(n == 1){
           this.isActive = true
         }else{
          this.isActive = false
         }
       },
       toItem: function(){
         this.$router.push({
           path: '/jiekuan/001'
         })
       }
    },
    components: {
      MyFooter
    }
  }
</script>

<style scoped>
  .m-header{
    width: 100%;
    height: 44px;
    line-height: 44px;
    position: relative;
    left: 0;
    top: 0;
    background-color: #fff;
  }
  .m-header h1{
    font-size: 1.2rem;
    font-weight: normal;
    margin:0;
  }
  .jiekuan{
    width: 100%;
    height:100%;
    background-color: #e0e0e0;
    overflow: hidden;
  }
  .change{
    width:60%;
    margin:0 auto;
    border:1px solid #379aff;
    border-radius: 5px;
    position: relative;
  }
  .change-box{
    width:100%;
    background-color: #fff;
    padding:1rem 0;
  }
.change div{
  width: 49%;
  height: 2rem;
  line-height:2rem;
  display: inline-block;
  color: #379aff;
}
  .change  .active{
    background: #379aff;
    color: #fff;
  }
.detail{
  width:100%;
  max-height:30rem;
  background-color: #e0e0e0;
  overflow: scroll;
}
.item{
  width:100%;
  background: #fff;
  margin-top:0.5rem;
  font-size:0.8rem;
}
  .item-top{
    border-bottom: 1px solid #c0c0c0;
    height:1.43rem;
    line-height:1.43rem;
    text-align: left;
    padding-left:2rem;
    position: relative;
  }
  .item-top span:nth-child(2){
    float: right;
    padding-right:2rem;
  }
  .item-top:after{
    content: '>';
    position: absolute;
    right:1.2rem;
  }
  .item-body{
    text-align: left;
    padding-left:2rem;
    height: 4.9rem;
    line-height:1.5rem;
    margin-top:5px;
    color:#9d9d9d;
  }
  .money{
    font-size:1.5rem;
    font-weight:700;
    color:#000;
  }
</style>
