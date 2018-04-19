<template>
  <div class="open">
    <my-header :title="title"></my-header>
    <div class="info" v-if="openAccountStatus==0||openAccountStatus==null">
      <p>
        您尚未开通银行存管，未开通银行存管将无法进行绑卡、充值、提现、投资等操作
      </p>
    </div>
    <form :action="actionUrl" method="post">
      <label for="userName" class="icon">
        <span>真实姓名</span>
        <input v-if="openAccountStatus==0||openAccountStatus==null" type="text" id="userName" placeholder="填写真实姓名" v-model="name" @blur="blur()"/>
        <span class="paramValue" v-else>{{customerInfo.customerName.substr(0,1)}}{{customerInfo.customerName.substr(1,customerInfo.customerName.length-1).replace(/[\u4e00-\u9fa5]/g,'*')}}</span>
      </label>
      <label for="idNumber" class="icon">
        <span>身份证号</span>
        <!-- <input  v-if="openAccountStatus==0||openAccountStatus==null" type="text" id="idNumber" placeholder="填写身份证号" v-model="idcard" @blur="idblur()"/> -->
        <span class="paramValue" v-if="openAccountStatus==0||openAccountStatus==null" >{{customerInfo.idCard}}</span>
        <span class="paramValue" v-else>{{customerInfo.idCard.substr(0,4)}}&nbsp;****&nbsp;****&nbsp;{{customerInfo.idCard.substr(-4,4)}}</span>
      </label>

      <label class="icon" v-if="openAccountStatus==1&&customerInfo.LccbBankNo">
        <span>银行卡号</span>
        <span class="paramValue">{{customerInfo.LccbBankNo}}</span>
      </label>

      <label class="icon" v-if="openAccountStatus==1&&customerInfo.bankCode">
        <span>所属银行</span>
       <!--  <span class="images">
           <img :src="imageList[0]+customerInfo.bankCode+'.png'" alt="所属银行" width="50" height="50" />
        </span> -->
        <span class="paramValue">{{customerInfo.bankName}}</span>
      </label>

    </form>

    <div class="protocal" v-if="openAccountStatus==0||openAccountStatus==null">
      <img :src="checked? imageList[1]:imageList[2]" alt=""
           @click="changebox">
      <span>我同意</span>
      <span class="pro"><router-link tag="a" to="/article?protocol=open">《廊坊银行网络借贷交易资金存管业务三方协议》</router-link></span>
    </div>
    <button v-if="openAccountStatus==0||openAccountStatus==null" class="button" @click="submit">确认开通</button>

    <footer v-if="openAccountStatus==0||openAccountStatus==null">
      <span>温馨提示：</span>
      <p>1、718金融用户必须是年满18岁的具有完全民事行为能力的自然人。</p>
      <p>2、填写的额姓名、身份证号码须一致。</p>
      <p>3、开通银行存管过程中遇到问题，请查看帮助中心或者联系客服：4001-718-718（工作日：8:30-17:30）。</p>
    </footer>

  </div>
</template>

<script>
  import MyHeader from '@/components/header/header'
  import {Toast} from 'mint-ui';
  import $ from 'jquery';
  import C from '@/assets/js/cookie';

  export default {
    data () {
      return {
        title: '银行存管开户',
        name: '',
        idcard: '',
        flag: true,
        checked: false,
        actionUrl:"",
        openAccountStatus:null,
        customerInfo:{},
        imageList:[
          window.baseUrl+'static/images/bankIcons/',
          window.baseUrl+'static/images/icon/checked.png',
          window.baseUrl+'static/images/icon/unchecked.png',
        ]
      }
    },
    created(){
      if(window.customerInfo&&window.customerInfo.openAccountResultCode){
        if(window.customerInfo.openAccountResultCode=="3055005"||window.customerInfo.openAccountResultCode=="3055004"||window.customerInfo.openAccountResultCode=="3055001"){
          this.openAccountStatus=0
        }else if(window.customerInfo.openAccountResultCode=="3055002"||window.customerInfo.openAccountResultCode=="3055003"){
          this.openAccountStatus=1
        }
        this.customerInfo=window.customerInfo;
        this.customerInfo.bankCode = this.customerInfo.bankCode.toLowerCase()
      }
    },
    methods: {
      blur: function () {
        if (!(/^[\u4e00-\u9fa5]+((·|•|●)[\u4e00-\u9fa5]+)*$/.test(this.name)) || this.name.length < 2 || this.name.length > 15) {
          Toast("请输入正确的姓名");
          this.flag = false;
          return;
        }
      },
      submit: function () {
        console.log('aaaa')
        var that = this;
        this.blur();
        if (!this.flag) {
          return
        }
        // this.idblur();
        if (!this.checked) {
          Toast('请同意协议');
          return
        }

        $.post(window.baseUrl+'rest/lccb/openAccount', {
          loginName: window.userinfo.loginName,
          realName:this.name,
          idNumber: this.customerInfo.idCard,
          successUrl: window.location.href
        }).then((res)=>{
          if (res.status == 0) {
            this.actionUrl=res.data;
            $(".open form").attr("action",res.data)
            $(".open form").submit();
          } else {
            Toast(res.message)
          }
        }, (res)=>{
          Toast("服务器异常，请稍后重试！")
        })

      },
      changebox: function () {
        this.checked = !this.checked;
      }
    },
    components: {
      MyHeader
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .info {
    width: 100%;
    color: #379aff;
    text-align: left;
    border-top: 1px solid #ccc;
  }

  .info p {
    width: 80%;
    margin: 0.5rem auto;
  }

  form label {
    display: inline-block;
    width: 90%;
    border-bottom: 1px solid #cccccc;
  }

  form input,form .paramValue {
    width: 75%;
    height: 1rem;
    border: none;
    /*border-bottom: 1px solid #cccccc;*/
    /*outline: none;*/
    margin: 0.5rem 0.3rem 0rem;
    display: inline-block;
    text-align: right;
  }
  form .images{
    width: 75%;
    display: inline-block;
    margin: 0.5rem 0.3rem 0rem;
    vertical-align: middle;
  }
  .protocal {
    text-align: left;
    width: 90%;
    padding-left: 0.5rem;
    margin-top: 5px;
    font-size: 12px;
  }

  .protocal img {
    vertical-align: middle;
    width: 0.4rem;
    height: 0.4rem;
  }

  .protocal .pro {
    color: #379aff;
  }

  .button {
    margin-top: 4.5rem;
    border: none;
    background-color: #379aff;
    color: #fff;
    width: 50%;
    height: 50px;
    border-radius: 60px;
    font-size: 22px;
    outline: none;
  }

  footer {
    position: fixed;
    bottom: 0.5rem;
    width: 95%;
    text-align: left;
    margin-left: 0.5rem;
    color: #a4a4a4;
  }


</style>

