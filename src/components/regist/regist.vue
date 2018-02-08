<template>
  <div class="register">
    <my-header  :title="title"></my-header>
    <div class="logo">
      <img src="/static/images/logo.png" alt="">
    </div>
    <form action="">
    <label for="" class="icon phone">
       <input type="text" placeholder="请输入手机号" v-model="phone" @blur="blur('phone')" maxlength="11"/>
    </label>

     <label for="" class="icon identifying">
        <input type="text" placeholder="请输入验证码" v-model="identify" @blur="blur('identify')"/>
        <span class="identify" @click="sendCode" :class="{send: isSend}">{{sendcode}}</span>
     </label>

      <label for="" class="icon idcard">
        <input type="text" placeholder="请输入身份证号" v-model="idcard" @blur="idblur"/>
      </label>

      <label for="" class="icon password">
         <input type="password" placeholder="请输入密码" v-model="password" @blur="blur('password')"/>
      </label>

    </form>
    <div class="protocal">
      <img :src="checked? '/static/images/icon/checked.png':'/static/images/icon/unchecked.png'" alt="" @click="changebox">
      <!--<input type="checkbox" class="checkbox" v-model="checked"/>-->
      <span>阅读并同意《新毅金融用户注册协议》</span>
    </div>

    <input type="button" value="立即注册" class="button" @click="submit">
  </div>
</template>

<script>
import MyHeader from '@/components/header/header'
import { Toast } from 'mint-ui';
import _ from 'lodash';
import $ from 'jquery';
import C from '@/assets/js/cookie';
export default {
  data () {
    return {
      title: '注册',
      phone: '',
      identify:'',
      password: '',
      idcard: '',
      checked: false,
      sendcode: "获取验证码",
      flag: true,
      isSend: false,
      send: false
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
        case 'identify':
          if(!/^\d{6}$/.test(this.identify)){
            this.flag = false;
            Toast('请输入6位数字的验证码');
          }else{
            this.flag = true;
          }
          break;
        case 'password':
          if(this.password.length < 6){
            this.flag = false;
            Toast('请输入正确的密码');
          }else{
            this.flag = true;
          }
          break;
        default:
          break;
      }
    },
    idblur:function(){
       this.checkIdNumber(this.idcard,(bool)=>{
         if(!bool){
           Toast('请输入正确的身份证号');
           this.flag=false;
         }
       })
    },
    sendCode: function(){
      this.blur('phone')
      if(!this.flag || this.isSend){
         return;
      }else{
        this.isSend = true;
        var count = 120;
        var that = this;
        var timer = setInterval(function(){
          count--;
          that.sendcode = count+'s';
          if(count == 0){
            that.sendcode = '获取验证码';
            that.isSend = false;
            clearInterval(timer)
          }
        },1000)
        this.$http.post(`/rest/userInfo/${this.phone}/sms4Register`).then(function (res) {
          if(res.body.status == 0){
            this.send = true;
          }else{
            Toast("验证码获取失败")
          }
        })
      }
    },
    submit: function(){
      this.blur('phone');
      if(!this.flag){return}
      if(!this.send){
        Toast('请先获取验证码')
        return;
      }
      this.blur('identify');
      if(!this.flag){return}
      this.blur('password');
      if(!this.flag){return}
      this.idblur()
      if(!this.flag){return}
      if(!this.checked){
        Toast('请先同意用户注册协议')
        return;
      }


      $.post("/rest/userInfo/save",{
        mobile: this.phone,
        password: this.password,
        captcha: this.identify,
        registChannel: 'h5',
        idCard: this.idcard
      }).then(function (res) {
        console.log(res)
        if(res.body.status == 0 ){
          C.SetCookie("token","00001")
          window.userinfo = Object.assign(window.userinfo, res.userInfo)
          this.$router.push('/user')
        }else{
          Toast("注册失败")
        }
      },function(res){
        Toast("注册失败")
      })
    },
    changebox: function(){
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

      if(!(/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/).test(idNumber) ){
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

        if(idNumber.length != 18) {
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
a {
  color: #42b983;
}
.logo{
  width: 100%;
  margin: 40px auto 10px;
}
form input{
  width: 80%;
  height: 0.8rem;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  padding-left:0.8rem;
  margin-top: 1rem;
}

.checkbox{
  display: none;
}
.protocal{
  text-align: left;
  width: 80%;
  padding-left: 1rem;
  margin-top: 5px;
}
.protocal img{
  vertical-align: middle;
  width:0.4rem;
  height:0.4rem;
}
.protocal span{
   font-size: 12px;
   color: #379aff;
}
.identifying{
  position: relative;
  left: 0;
  top: 0;
}
.identifying input{
  vertical-align: sub;
}
.identify{
  display: inline-block;
  border: 1px solid #379aff;
  color:  #379aff;
  font-size: 0.3rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.1rem;
  border-radius: 8px;
  width:2rem;
  height:1rem;
  line-height:1rem;
}
.send{
  background: #c0c0c0;
  color: #fff;
  border: none;
}
.button{
  margin-top:3.5rem;
  border: none;
  background-color: #379aff;
  color:#fff;
  width: 50%;
  height: 50px;
  border-radius: 60px;
  font-size: 22px;
  outline: none;
}

.icon{
  position: relative;
}
.phone:before,.password:after,.identifying:after,.idcard:after{
  content: '  ';
  width:0.6rem;
  height:0.6rem;
  position: absolute;
  bottom:0.01rem;
  left:0;
}
.phone:before{
  background: url("/static/images/icon/phone.png");
  background-size: 100% 100%;
}

.password:after{
  background: url("/static/images/icon/password.png");
  background-size: 100% 100%;
}

.identifying:after{
  background: url("/static/images/icon/identify.png");
  background-size: 100% 100%;
}
.idcard:after{
  background: url("/static/images/icon/idcard.png");
  background-size: 100% 100%;
}

</style>
