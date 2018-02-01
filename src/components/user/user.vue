<template>
  <div class="user">
     <div class="user-top">
        <div class="header">我的账户
          <router-link to="/setting" class="setting">设置</router-link>
        </div>
        <div class="name">小菲菲</div>
        <div class="money">￥1000000</div>
        <div class="text">账户余额</div>
        <div class="btns">
            <div>充值</div>
            <div>提现</div>
        </div>
     </div>

     <ul>
         <li>
             <span>银行存管</span>
             <span class="text">立即开户</span>
         </li>
        <router-link tag="li" to="/money">
               <span>资金明细</span>
        </router-link>

         <li>
             <span>联系客服</span>
             <span>工作日8:30--17:30</span>
         </li>
       <router-link tag="li" to="/help">
         <span>帮助中心</span>
       </router-link>
       <router-link tag="li" to="/aboutus">
         <span>关于我们</span>
       </router-link>
     </ul>
     <my-footer :comein="comein"></my-footer>
  </div>
</template>

<script>
import MyFooter from '@/components/footer/footer'
export default {
  data () {
    return {
      comein: '我的'
    }
  },
  created: function(){

  },
  methods:{

  },
  components: {
    MyFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
   background: #e0e0e0;
   width: 100%;
   height: 100%;
}
.user-top{
    width: 100%;
    height: 7.1rem;
    background-color: #379aff;
    opacity: 0.3;
    color: #fff;
    padding-top:15px;
}
.user-top .header{
   font-size: 0.6rem;
   position: relative;
}
.header .setting{
  position: absolute;
  top:0;
  right:0.5rem;
  font-size:0.4rem;
  color: #fff;
}

.user-top .name{
  margin:0.75rem 0 1rem;
  font-size: 0.6rem;
}

.user-top .money{
  font-size:0.75rem;
  font-weight:700;
  margin:0 auto 0.35rem;
}

.user-top .btns{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top:0.73rem;
}
.btns div{
  border:1px solid #fff;
  border-radius: 20px;
  padding: 5px 20px;
}
ul{
    margin: 0;
    padding: 0;
}
li{
  list-style: none;
  border-bottom: 1px solid #c0c0c0;
  width: 100%;
  height: 1.32rem;
  line-height: 1.32rem;
  background: #fff;
  position: relative;
  left: 0;
  top: 0;
  text-align: left;
}
li span {
    margin-left: 10px;
}
li .text{
  color: #379aff;
}
li:nth-child(3){
    /*border-top: 1px solid #c0c0c0;*/
    margin-top: 10px;
}
li span:nth-child(2){
    float: right;
    margin-right: 30px;
}
li:last-child{
  border:none;
}
li:after{
  content: '>';
  position: absolute;
  right: 15px;
}
</style>
