<template>
  <div class="recharge" v-if="type=='recharge'||type=='withdraw'">
    <my-header  :title="title"></my-header>

    <div class="money-box">
      <div class="money">{{amount}}</div>
      <p>当前余额 （元）</p>
    </div>

    <form :action="actionUrl" method="post" class="bank">
      <div class="bankicon">
        <img :src="imageList[0]+customerInfo.bankCode+'.png'" :alt="customerInfo.bankName">
      </div>
      <div class="info">
        <span class="bankName">{{customerInfo.bankName}}</span>
        <p class="banknum" v-if="customerInfo.bankNo">{{customerInfo.LccbBankNo}}</p>
      </div>
    </form>
    <div v-if="title == '提现'" style="margin-top:20px;"></div>
    <p v-if="queryEnum.lccbBank&&title == '充值'">充值最高限额：单笔限额{{queryEnum.lccbBank[queryIndex].limit}}万元， 当日限额{{queryEnum.lccbBank[queryIndex].dayLimit}}万元</p>

    <div class="getmoney">
      <input type="number" @keyup="checkMoney" @blur="blur(type)" v-model="operateMoney" placeholder="请输入金额">
    </div>

    <div class="msg">
      <div v-if="title == '充值'">
        <span>温馨提示：</span>
        <p>
          1、718金融暂不收取您的充值费用（第三方收取的费用由718金融垫付）。
        </p>
        <p>
        2、充值前请确认您的银行卡限额，718金融对您的充值额度没有限制，限
          额是由具体开户行决定，如有疑问详询银行客服。
        </p>
        <p>
        3、禁止洗钱、虚假交易等行为，一经发现并确认，将终止该
          账户的使用。
        </p>
        <p>
          4、充值过程遇到问题，请查看帮助中心或联系客服：<a href="tel:4001-718-718">4001-718-718</a>（工作日：8:30-17:30）。
        </p>
      </div>
      <div v-else>
        <span>
          温馨提示：
        </span>
        <p>
          1、718金融暂不收取您的充值费用（第三方收取的费用由718金融垫付）。
        </p>
        <p>
        2、提现到账时间：提现申请提交成功后，T+1工作日到账。
        </p>

        <p>
          3、根据《反洗钱法》规定，718金融禁止洗钱、虚假交易等行
          为。
        </p>
         <p>
           4、提现过程遇到问题，请查看帮助中心或联系客服：<a href="tel:4001-718-718">4001-718-718</a>（工作日：8:30-17:30）。
         </p>
      </div>

    </div>

    <footer>
      <button class="btn" @click.prevent.stop="submit">确定{{title}}</button>
    </footer>
  </div>

</template>
<script>
  import MyHeader from '@/components/header/header'
  import { Toast,MessageBox } from 'mint-ui';
  import $ from 'jquery';
  import C from '@/assets/js/cookie';

  export default {
    data () {
      return {
        title: '',
        type:'',
        operateMoney:'',
        queryEnum:{},
        queryIndex:0,
        customerInfo:{},
        flag:false,
        actionUrl:'',
        amount:'',
        imageList:[
          window.baseUrl+'static/images/bankIcons/'
        ]
      }
    },
    beforeCreate(){
      eventHandle.$on("setEnumData",(data)=>{
        console.log(data)
        if(data.queryEnum){
          this.queryEnum=data.queryEnum;
        }
      });
    },
    created(){
      eventHandle.$emit("getEnumData");
      if(this.$route.query.operate == "recharge"){
        this.title = "充值";
        this.type="recharge";
      }else if(this.$route.query.operate == "withdraw"){
        this.title = "提现";
        this.type="withdraw";
      }else{
        this.$router.push("/index");
      }
      if(!(window.customerInfo&&window.customerInfo.openAccountResultCode=="3055003")){
        MessageBox.alert("您尚未开通银行存管，请开户后在进行该操作！").then(() => {
          this.$router.push("/open");
        });
        return;
      }
      this.customerInfo=window.customerInfo;
      this.amount = Number(this.customerInfo.amount).toFixed(2);
      this.customerInfo.bankCode = this.customerInfo.bankCode.toLowerCase()
      this.formatBankName();
    },
    destoryed(){
      eventHandle.$off("setEnumData");
    },
    methods: {
      blur: function(str){
        switch (str){
          case 'withdraw':
            this.flag = false;
            if(this.operateMoney==''){
              Toast('请填写提现金额！');
            }else if(Number.parseFloat(this.customerInfo.amount)==0){
              Toast('您的账户余额为0，无法进行提现操作！');
            }else if(!(/^((0\.\d?)||([1-9]\d*(\.\d*[1-9])?))+$/i.test(this.operateMoney))){
              Toast('提现金额格式不正确！');
            }else if(Number.parseFloat(this.customerInfo.amount)<=this.operateMoney){
              Toast('您提现的金额大于你当前账户余额！');
            }else{
              this.flag =true;
            }
            break;
          case 'recharge':
            this.flag = false;
            if(this.operateMoney==''){
              Toast('请填写充值金额！');
            }else if(!(/^((0\.\d?)||([1-9]\d*(\.\d*[1-9])?))+$/i.test(this.operateMoney))){
              Toast('充值金额格式不正确！');
            }else if(this.operateMoney>Number.parseFloat(this.queryEnum.lccbBank[this.queryIndex].limit)*10000){
              Toast('充值金额超出了当日该银行卡的充值限额，详情请咨询开户行!');
            }else{
              this.flag =true;
            }
            break;
          default:
            break;
        }
      },
      submit: function(){
        if(this.type=='withdraw'){
          this.blur('withdraw');
          console.log(this.flag)
          if(!this.flag){return}

          //下方对接提现接口

          $.post(window.baseUrl+'rest/lccb/customerEnchashment',{
            loginName:window.userinfo.loginName,
            amount:this.operateMoney,
            successUrl:window.location.href
          }).then((data)=>{
            if(data.status==0){
              this.actionUrl=data.data;
              $(".recharge form").attr("action",data.data)
              $(".recharge form").submit();
            }else{
              Toast(data.message);
            }
          },(err)=>{
            Toast("服务器异常,请稍后重试!");
          });
        }else if(this.type=='recharge'){
          this.blur('recharge');
          if(!this.flag){return}

          //下方对接充值接口
          $.post(window.baseUrl+'rest/lccb/customerRecharge',{
            loginName:window.userinfo.loginName,
            amount:this.operateMoney,
            successUrl:window.location.href
          }).then((data)=>{
            if(data.status==0){
              this.actionUrl=data.data;
              $(".recharge form").attr("action",data.data)
              $(".recharge form").submit();
            }else{ 
              Toast(data.message);
            }
          },()=>{
            Toast("服务器异常,请稍后重试!");
          });
        }
      },
      checkMoney:function(){
        this.operateMoney.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        this.operateMoney.replace(/^\./g,"");
        this.operateMoney.replace(/\.{2,}/g,".");
        this.operateMoney.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        this.operateMoney.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        if (this.operateMoney.length>2&&this.operateMoney.substr(1,1)!='.') {
          this.operateMoney.replace(/\b(0{2,})/gi,"");
        }
      },
      formatBankName:function(){
        if(!this.customerInfo.bankCode||!this.queryEnum.lccbBank){
          return ""
        }
        for(let key in this.queryEnum.lccbBank){
          var bankCode = this.customerInfo.bankCode.toUpperCase()
          if(this.queryEnum.lccbBank[key].code==bankCode){
            this.customerInfo.bankName=this.queryEnum.lccbBank[key].value;
            this.queryIndex=key;
            break;
          }
        }
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
  overflow:scroll;
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
    /*position: fixed;*/
    /*bottom: 1rem;*/
    margin-top: 40px;
    margin-bottom: 20px;
    width: 100%;
  }
  footer .btn{
    color: #fff;
    background-color: #379aff;
    width:50%;
    height:40px;
    line-height:40px;
    margin: 0 auto;
    border-radius: 40px;
    font-size:0.5rem;
    display: inline-block;
    outline: none;
  }
</style>
