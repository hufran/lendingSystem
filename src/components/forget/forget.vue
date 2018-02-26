<template>
  <div class="forget">
    <my-header  :title="title"></my-header>
    <form action="" v-if="forget == 1">
        <label for="" class="icon phone">
           <input type="text" placeholder="请输入手机号" v-model="phone" @blur="blur('phone')"/>
        </label>
          <label for="" class="icon identifying">
             <input type="password" placeholder="请输入验证码" v-model="identify" @blur="blur('identify')"/>
             <span class="identify" :class="{send: isSend}" @click="getCode">{{sendcode}}</span>
          </label>
    </form>

    <form action="" v-if="forget == 2">
        <label for="" class="icon password">
           <input type="password" placeholder="请输入密码" v-model="password" @blur="blur('password')"/>
        </label>
          <label for="" class="icon password">
             <input type="password" placeholder="请再次输入密码" v-model="password2" @blur="blur('password2')"/>
          </label>
    </form>

    <input type="button" v-model="buttonMsg" class="button" @click="next">

  </div>
</template>

<script>
import MyHeader from '@/components/header/header'
import { Toast } from 'mint-ui';
import $ from 'jquery';
export default {
  data () {
    return {
      title: '找回密码',
      buttonMsg: '下一步',
      sendcode: '获取验证码',
      forget: 1,
      isSend: false,
      send: false,
      phone:'',
      identify: '',
      password: '',
      password2: '',
      flag: false
    }
  },
  methods:{
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
          if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(this.password))){
            this.flag = false;
            Toast('请输入8-16位数字与字母组合格式的密码!');
          }else{
            this.flag = true;
          }
          break;
        case 'password2':
          if(this.password2.length < 6){
            this.flag = false;
            Toast('请输入正确的密码');
          }else if(this.password2 !=this.password){
            Toast('两次密码不一样');
            this.flag = false;
          }else{
            this.flag = true;
          }
          break;
        default:
          break;
      }
    },
    getCode: function(){
      var that = this;
      this.blur('phone')
      if(!this.flag || this.isSend){
        return;
      }else{
        this.isSend = true;
        var count = 120;
        var timer = setInterval(function(){
          count--;
          that.sendcode = count+'s';
          if(count <= 0){
            that.sendcode = '获取验证码';
            that.isSend = false;
            clearInterval(timer)
          }
        },1000)

        $.post(`/rest/userInfo/${this.phone}/sms4ChangePassword`).then((res)=>{
          console.log(res)
          if(res.status ==0){
            this.send = true;
          }else{
            Toast("验证码获取失败")
            count =0;
            this.isSend = false;
          }
        })
      }
    },
    next: function(){
        if(this.forget == 1){
            this.blur('phone');
            if(!this.flag){return}
            if(!this.send){
              Toast('请先获取验证码')
              return;
            }
            this.blur('identify');
            if(!this.flag){return}

          $.post("/rest/userInfo/verifyCaptcha",{
            mobile: this.phone,
            captcha: this.identify
          }).then((res)=>{
              console.log(res)
            if(res.status ==0){
              this.forget = 2
              this.buttonMsg = "完成"
            }else{
              Toast("验证失败")
            }
          },(res)=>{
              console.log(res)
              Toast("验证失败")
          })

        }else{
            this.blur('password');
            if(!this.flag){return}
            this.blur('password2');
            if(!this.flag){return}

          $.post("/rest/userInfo/resetPassword",{
            mobile: this.phone,
            password: this.password,
            repPwd: this.password2
          }).then((res)=>{
            console.log(res)
            if(res.status ==0){
              Toast("设置成功")
              this.$router.push('/login')
            }else{
              Toast("设置失败")
            }
          },(res)=>{
            console.log(res)
            Toast("设置失败")
          })

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
form{
    margin-top: 50px;
}
form input{
  width: 80%;
  height:1rem;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  padding-left:1rem;
  margin-top: 1rem;
}

.button{
  margin-top: 2.2rem;
  border: none;
  background-color: #379aff;
  color:#fff;
  width: 50%;
  height: 50px;
  border-radius: 60px;
  font-size: 22px;
  outline: none;
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
  font-size: 0.35rem;
  position: absolute;
  right: 0.2rem;
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
.icon{
  position: relative;
}
.phone:before{
  content: '  ';
  width:0.6rem;
  height:0.6rem;
  position: absolute;
  bottom:0.01rem;
  background: url("/static/images/icon/phone.png");
  background-size: 100% 100%;
}
.identifying:after{
  content: '  ';
  width:0.6rem;
  height:0.6rem;
  position: absolute;
  bottom:0.01rem;
  left:0;
  background: url("/static/images/icon/identify.png");
  background-size: 100% 100%;
}
.password:after{
  content: '  ';
  width:0.6rem;
  height:0.6rem;
  position: absolute;
  bottom:0.01rem;
  left:0;
  background: url("/static/images/icon/password.png");
  background-size: 100% 100%;
}

</style>
