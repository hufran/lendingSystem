<template>
  <div class="recharge">
    <my-header  :title="title"></my-header>

    <div class="money-box">
      <div class="money">10.00</div>
      <p>当前余额 （元）</p>
    </div>

    <div class="bank">
      <div class="bankicon">
        <img src="/static/images/icon/招商银行.png" alt="">
      </div>
      <div class="info">
        <span class="bankName">招商银行</span>
        <span class="type">借记卡</span>
        <p class="banknum">6225******1234</p>
      </div>
    </div>
    <p>充值最高限额：单笔限额0.1万元， 当日限额5万元</p>

    <div class="getmoney">
      <input type="text" placeholder="请输入金额">
    </div>

    <div class="msg">
      <div v-if="title == '充值'">
        <span>温馨提示：</span>
        <p>
          718金融暂不收取您的充值费用（第三方收取的费用由718金融垫付）。
          为保障您的资金安全，认证支付充值、提现采用同卡进出原则，即提现
          银行卡需与充值银行卡一致。718金融不支持信用卡进行充值，请用储
          蓄卡进行相关操作。
        </p>
        <p>
          充值前请确认您的银行卡限额，718金融对您的充值额度没有限制，限
          额是由具体开户行决定，如有疑问详询银行客服。
        </p>
        <p>
          禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该
          账户的使用。
        </p>
        <p>
          充值金额通常会在当日内转入，请及时查看您的账户余额。如充值成功
          后未能及时到账，请联系客服：4001-718-718。
        </p>
      </div>
      <div v-else>
        <span>
          温馨提示：
        </span>
        <p>
          运营期间提现手续费由718金融垫付。每日提现限制3次以内(含3次)。
          试运营2016年12月31日截止，试运营结束后提现手续费另行公告。
          提现到账时间：提现申请提交成功后，资金预计T+1工作日到账，请您
          注意查收。
        </p>

        <p>
          据《反洗钱法》规定，718金融禁止洗钱、信用卡套现、虚假交易等行
          为。
        </p>
         <p>
           提现过程遇到问题，请联系客服：4001-718-718。
         </p>
      </div>

    </div>

    <footer>
      <div>确定充值</div>
    </footer>
  </div>

</template>
<script>
  import MyHeader from '@/components/header/header'
  import { Toast } from 'mint-ui';
  import $ from 'jquery';
  import C from '@/assets/js/cookie';

  export default {
    data () {
      return {
        title: ''
      }
    },
    created: function(){
      console.log(this.$route.query.option)
      if(this.$route.query.option == "recharge"){
        this.title = "充值"
      }else{
        this.title = "提现"
      }
    },
    methods: {
      blur: function(str){
        switch (str){
          case 'phone':
            if(!/^1\d{10}$/.test(this.phone)){
              Toast('请输入11位数字的手机号');
              this.flag = false;
            }else{
              this.flag = true;
            }
            break;
          case 'password':
            console.log(this.password)
            if(!/^\d{6}$/.test(this.password)){
              this.flag = false;
              Toast('请输入6位数字的密码');
            }else{
              this.flag = true;
            }
            break;
          default:
            break;
        }
      },
      submit: function(){
        var that = this;
        this.blur('phone');
        if(!this.flag){return}
        this.blur('password');
        if(!this.flag){return}

        $.post('/rest/userInfo/login',{
          loginName: this.phone,
          password: this.password,
          source: 'h5'
        }).then(function(res){
          if(res.status == 0){
            window.userinfo = Object.assign(window.userinfo, res.userInfo)
            C.SetCookie("token","00001")
            that.$router.push('/user')
          }else{
            Toast(res.msg)
          }
        },function(res){
          Toast("登陆失败")
        })

      }
    },
    components: {
      MyHeader
    }
  }
</script>

<style scoped>
.recharge{
  width: 100%;
  height:100%;
  background-color: #f4f4f4;
  color: #a4a4a4;
}
.money-box{
  margin-bottom: 0.5rem;
}
  .money{
    font-size:0.8rem;
    font-weight: 600;
    margin:0.4rem auto 0.1rem;
  }

.bank,.getmoney{
  width:90%;
  background-color: #fff;
  margin:0.2rem auto;
  height:2.17rem;
  border-radius: 0.2rem;
  text-align: left;
  box-shadow: 2px 3px 2px #ccc;
}

.bank>div{
  display: inline-block;
  vertical-align: middle;
}
.bankicon{
  width: 1.45rem;
  margin:0.36rem 0.5rem;
}

.bankicon img{
  width:100%;
  height:100%;
}
.bankName,.money,header{
  color: #000;
}
.bankName,.banknum{
  font-size:0.4rem;
  margin-top:0.2rem;
}
.type{
  color: #7ed322;
  padding-left:5px;
}
.getmoney input{
  border:none;
  outline: none;
  border-bottom:1px solid #cccccc;
  display: block;
  width:90%;
  height:1rem;
  margin:0 auto;
  position: relative;
  top:0.3rem;
}
.getmoney{
  position: relative;
}
.getmoney:after{
  content: "元";
  position: absolute;
  right: 0.6rem;
  bottom:50%;
}
.msg{
    text-align: left;
    width:85%;
    margin:0 auto;
    font-size:0.3rem;
  }

 .msg p{
   margin:0.1rem 0;
 }

  footer{
    position: fixed;
    bottom: 1rem;
    width: 100%;
  }
footer div{
  color: #fff;
  border:1px solid #fff;
  background-color: #379aff;
  width:50%;
  height:40px;
  line-height:40px;
  margin: 0 auto;
  border-radius: 40px;
  font-size:0.5rem;
}
</style>
