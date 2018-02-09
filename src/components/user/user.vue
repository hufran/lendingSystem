<template>
  <div class="user">
     <div class="user-top">
        <div class="header">我的账户
          <router-link to="/setting" class="setting">
          </router-link>
        </div>
       <div v-if="islogin">
         <div class="name">{{name}}</div>
         <div class="money">￥{{money}}</div>
         <div class="text">账户余额</div>
         <div class="btns">
           <router-link tag="div" to="/recharge?option=recharge">
             充值
           </router-link>
           <router-link tag="div" to="/recharge?option=withdraw">
             提现
           </router-link>
         </div>
       </div>
       <div v-else>
         <div class="img">
           <img src="/static/images/icon/default.png" alt="">
         </div>
         <div class="button" @click="$router.push('/login')">
           登录&nbsp;/&nbsp;注册
         </div>
       </div>
     </div>

     <ul>
       <router-link tag="li" to="/open">
         <span>银行存管</span>
         <span class="text">立即开户</span>
       </router-link>
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
import C from '@/assets/js/cookie'
import {util} from '@/assets/js/util'
import $ from 'jquery'
export default {
  data () {
    return {
      comein: '我的',
      islogin: false,
      money:'',
      name: ''
    }
  },
  beforeCreate: function(){

  },
  created: function(){
    var that = this;
      $.post("/rest/getSessionInfo").then(function (res) {
        console.log(res)
        window.userinfo = res.data.userinfo
        if(!util.checkObjectIsEmpty(window.userinfo) && C.GetCookie("token")){
          console.log(111)
          that.islogin = true;
          that.name = window.userinfo.name
        }else{
          console.log(222)
        }
      })

     $.post("/rest/ylpayLoanAndBill/queryCustomerAmount",{
       loginName: '18515004372'
     }).then(function(res){
       console.log(res)
       if(res.status ==0){
         that.money = res.data.amount
       }
     })
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
    background-image: url("/static/images/userBackground_02.jpg");
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
.setting:after{
  content: '';
  width:0.5rem;
  height:0.5rem;
  display: block;
  background-image: url("/static/images/icon/settings.png");
  background-size: 100%;
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

.user-top .img{
  margin:1.3rem auto 1rem;
  width:1.5rem;
  height:1.5rem;
}

.img img{
  width:100%;
  height:100%;
}

.user-top .button{
  border:1px solid #fff;
  width:2.5rem;
  height: 1rem;
  line-height: 1rem;
  margin:0 auto;
  border-radius: 0.5rem;
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
  content: '';
  position: absolute;
  right: 0.3rem;
  bottom:0.5rem;
  width: 17px;
  height:17px;
  background-image: url("/static/images/icon/right-small.png");
}
</style>
