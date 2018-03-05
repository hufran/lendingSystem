<template>
  <div class="user">
    <div class="user-top" :style="{'background-image':'url('+imageList[1]+')'}">
      <div class="header">我的账户
        <router-link to="/setting" class="setting">
          <span class="imageIcon" :style="{'background-image':'url('+imageList[2]+')'}"></span>
        </router-link>
      </div>
      <div v-if="islogin&&this.openAccountStatus==2">
        <div class="name">{{name}}</div>
        <div class="money">￥{{money}}</div>
        <div class="text">账户余额</div>
        <div class="btns">
          <router-link tag="div" to="/recharge?operate=recharge">
            充值
          </router-link>
          <router-link tag="div" to="/recharge?operate=withdraw">
            提现
          </router-link>
        </div>
      </div>
      <div v-else-if="islogin&&this.openAccountStatus!=2">
        <div class="img">
          <img :src="imageList[0]" alt="">
        </div>
        <div class="text">
          {{openAccountStatus == 0 ? "尚未开通银行存管" : (openAccountStatus == 1 ? "开户审核中" : (openAccountStatus == 3 ? "开户失败，重新尝试" : "暂无云联进件信息"))}}
        </div>
      </div>
      <div v-else>
        <div class="img">
          <img :src="imageList[0]" alt="">
        </div>
        <div class="button" @click="$router.push('/login')">
          登录&nbsp;/&nbsp;注册
        </div>
      </div>
    </div>

    <ul>
      <router-link tag="li" :to="openAccountStatus!=1?'/open':''">
        <span>银行存管</span>
        <span
          class="text">{{openAccountStatus == 1 ? "审核中" : (openAccountStatus == 2 ? "已开户" : (openAccountStatus == 3 ? "重新开户" : "立即开户"))}}</span>
        <i class="imageIcon" :style="{'background-image':'url('+imageList[3]+')'}"></i>
      </router-link>
      <router-link tag="li" to="/money">
        <span>资金明细</span>
        <i class="imageIcon" :style="{'background-image':'url('+imageList[3]+')'}"></i>
      </router-link>

      <li>
        <span>联系客服</span>
        <span>工作日8:30--17:30</span>
        <i class="imageIcon" :style="{'background-image':'url('+imageList[3]+')'}"></i>
      </li>
      <router-link tag="li" to="/help">
        <span>帮助中心</span>
        <i class="imageIcon" :style="{'background-image':'url('+imageList[3]+')'}"></i>
      </router-link>
      <router-link tag="li" to="/aboutus">
        <span>关于我们</span>
        <i class="imageIcon" :style="{'background-image':'url('+imageList[3]+')'}"></i>
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
        money: '0.00',
        name: '',
        customerInfo: {},
        openAccountStatus: null,
        imageList: [
          window.baseUrl + 'static/images/icon/default.png',
          window.baseUrl + 'static/images/userBackground_02.jpg',
          window.baseUrl + 'static/images/icon/settings.png',
          window.baseUrl + 'static/images/icon/right-small.png',
        ]
      }
    },
    beforeCreate: function () {

    },
    created: function () {
      if (!util.checkObjectIsEmpty(window.userinfo) && C.GetCookie("token")) {
        this.islogin = true;
        let userPhone = window.userinfo.loginName.substring(0, 3) + window.userinfo.loginName.substring(3, 7).replace(/\d/g, "*") + window.userinfo.loginName.substring(7);
        this.name = window.userinfo.name || userPhone;
        this.customerInfo = window.customerInfo || {};
        this.money = this.customerInfo.amount;
        let status = this.customerInfo.openAccountResultCode || null;
        //3055001页面请求中、3055002交易受理中、3055003交易成功、3055004交易失败，3055005 未开户
        if (this.openAccountStatus) {
          if (this.openAccountStatus == "3055001" || this.openAccountStatus == "3055002") {
            //审核中
            this.openAccountStatus = 1;
          } else if (this.openAccountStatus == "3055003") {
            //开户成功
            this.openAccountStatus = 2;
          } else if (this.openAccountStatus == "3055004") {
            //开户失败
            this.openAccountStatus = 3;
          } else if (this.openAccountStatus == "3055005") {
            //未开户
            this.openAccountStatus = 0;
          } else {
            Toast("获取用户开户状态异常，请刷新页面重新尝试！");
          }
        }


      }

    },
    methods: {},
    components: {
      MyFooter
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user {
    background: #e0e0e0;
    width: 100%;
    height: 100%;
  }

  .user-top {
    width: 100%;
    height: 7.1rem;
    color: #fff;
    padding-top: 15px;
  }

  .user-top .header {
    font-size: 0.6rem;
    position: relative;
  }

  .header .setting {
    position: absolute;
    top: 0;
    right: 0.5rem;
    font-size: 0.4rem;
    color: #fff;
  }

  .setting .imageIcon {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    display: block;
    background-size: 100%;
  }

  .user-top .name {
    margin: 0.75rem 0 1rem;
    font-size: 0.6rem;
  }

  .user-top .money {
    font-size: 0.75rem;
    font-weight: 700;
    margin: 0 auto 0.35rem;
  }

  .user-top .btns {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 0.73rem;
  }

  .btns div {
    border: 1px solid #fff;
    border-radius: 20px;
    padding: 5px 20px;
  }

  .user-top .img {
    margin: 1.3rem auto 1rem;
    width: 1.5rem;
    height: 1.5rem;
  }

  .img img {
    width: 100%;
    height: 100%;
  }

  .user-top .button {
    border: 1px solid #fff;
    width: 2.5rem;
    height: 1rem;
    line-height: 1rem;
    margin: 0 auto;
    border-radius: 0.5rem;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
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

  li .text {
    color: #379aff;
  }

  li:nth-child(3) {
    /*border-top: 1px solid #c0c0c0;*/
    margin-top: 10px;
  }

  li span:nth-child(2) {
    float: right;
    margin-right: 30px;
  }

  li:last-child {
    border: none;
  }

  li .imageIcon {
    content: '';
    position: absolute;
    right: 0.3rem;
    bottom: 0.5rem;
    width: 17px;
    height: 17px;
  }
</style>
