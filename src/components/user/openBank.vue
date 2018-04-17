<template>
  <div class="open">
    <my-header :title="title"></my-header>
    <div class="info">
      <p>
        您尚未开通银行存管，未开通银行存管将无法进行绑卡、充值、提现、投资等操作
      </p>
    </div>
    <form :action="actionUrl" method="post">
      <label for="userName" class="icon">
        <span>真实姓名</span>
        <input v-if="openAccountStatus==0||openAccountStatus==null" type="text" id="userName" placeholder="填写真实姓名" v-model="name" @blur="blur()"/>
        <span class="paramValue" v-else>{{name}}</span>
      </label>
      <label for="idNumber" class="icon">
        <span>身份证号</span>
        <input  v-if="openAccountStatus==0||openAccountStatus==null" type="text" id="idNumber" placeholder="填写身份证号" v-model="idcard" @blur="idblur()"/>
        <span class="paramValue" v-else>{{idcard}}</span>
      </label>
      <label class="icon" v-if="openAccountStatus==1&&customerInfo.bankCode">
        <span>所属银行</span>
        <span class="paramValue"><img :src="imageList[0]+customerInfo.bankCode+'.png'" alt="所属银行" /></span>
      </label>
      <label class="icon" v-if="openAccountStatus==1&&customerInfo.bankNo">
        <span>银行卡号</span>
        <span class="paramValue">{{customerInfo.bankNo.substring(0,4)+(4,customerInfo.bankNo.substring(customerInfo.bankNo.length-4)).replace("*")+customerInfo.bankNo.substring(customerInfo.bankNo.length-4)}}</span>
      </label>
    </form>

    <div class="protocal" v-if="openAccountStatus==0||openAccountStatus==null">
      <img :src="checked? imageList[1]:imageList[2]" alt=""
           @click="changebox">
      <span>我同意</span>
      <span class="pro">《廊坊银行网络借贷交易资金存管业务三方协议》</span>
    </div>

    <input type="button"  v-if="openAccountStatus==0||openAccountStatus==null" value="立即注册" class="button" @click="submit">

    <footer>
      <span>温馨提示:</span>
      <p>718金融用户必须是年满18岁的具有完全民事行为能力的自然人。</p>
      <p>填写的额姓名、身份证号码、银行卡号、银行的预留手机号须一致。</p>
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
        flag: false,
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
      idblur: function () {
        this.checkIdNumber(this.idcard, (bool) => {
          if (!bool) {
            Toast('请输入正确的身份证号');
            this.flag = false;
          }
        })
      },
      submit: function () {
        var that = this;
        this.blur();
        if (!this.flag) {
          return
        }
        this.idblur();
        if (!this.flag) {
          return
        }

        $.post(window.baseUrl+'rest/lccb/openAccount', {
          loginName: this.phone,
          realName:this.name,
          idNumber: this.idcard,
          successUrl: window.location.origin+"/user"
        }).then((res)=>{
          if (res.status == 0) {
            this.actionUrl=res.data;
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
      },
      checkIdNumber: function (idNumber, next) {
        idNumber = ('' + idNumber).replace(/^\s+|\s+$/g, '');
        var pcode = []; //只有这些数字开头的代码才是合法的
        pcode.push("11"); //北京
        pcode.push("12"); //天津
        pcode.push("13"); //河北
        pcode.push("14"); //山西
        pcode.push("15"); //内蒙古
        pcode.push("21"); //辽宁
        pcode.push("22"); //吉林
        pcode.push("23"); //黑龙江
        pcode.push("31"); //上海
        pcode.push("32"); //江苏
        pcode.push("33"); //浙江
        pcode.push("34"); //安徽
        pcode.push("35"); //福建
        pcode.push("36"); //江西
        pcode.push("37"); //山东
        pcode.push("41"); //河南
        pcode.push("42"); //湖北
        pcode.push("43"); //湖南
        pcode.push("44"); //广东
        pcode.push("45"); //广西
        pcode.push("46"); //海南
        pcode.push("50"); //重庆
        pcode.push("51"); //四川
        pcode.push("52"); //贵州
        pcode.push("53"); //云南
        pcode.push("54"); //西藏
        pcode.push("61"); //陕西
        pcode.push("62"); //甘肃
        pcode.push("63"); //青海
        pcode.push("64"); //宁夏
        pcode.push("65"); //新疆
        if (!~pcode.indexOf(idNumber.substring(0, 2))) {
          if (next) {
            next(false);
            return;
          } else {
            return {
              success: false
            };
          }
        }

        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9,
          10, 5, 8, 4,
          2
        ];
        var validEnding = ["1", "0", "X", "9", "8", "7",
          "6", "5", "4",
          "3", "2"
        ];

        if (!(/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/).test(idNumber)) {
          if (idNumber[17] != validEnding[_.reduce(factor,
              function (r, n, i) {
                return r + n * ~~idNumber[i];
              }, 0) % 11]) {
            if (next) {
              next(false);
              return;
            } else {
              return {
                success: false
              };
            }
          }

          if (idNumber.length != 18) {
            if (next) {
              next(false);
              return;
            } else {
              return {
                success: true
              };
            }
          }
        }

        if (next) {
          next(true);
          return;
        } else {
          return {
            success: true
          };
        }
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
  }

  form input,form .paramValue {
    width: 75%;
    height: 1rem;
    border: none;
    border-bottom: 1px solid #cccccc;
    outline: none;
    margin: 0.5rem 0.3rem 0rem;
    display: inline-block;
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

