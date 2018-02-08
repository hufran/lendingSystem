<template>
  <div class="user">
    <my-header  :title="title"></my-header>
    <form action="">
    <label for="" class="icon phone">
       <input type="text" placeholder="请输入手机号" v-model="phone" @blur="blur('phone')"/>
    </label>
      <label for="" class="icon password">
         <input type="password" placeholder="请输入密码" v-model="password" @blur="blur('password')"/>
      </label>
    </form>

    <input type="button" value="立即登录" class="button" @click="submit">

    <footer>
        <div class="link">
           <router-link to="/forget">忘记密码</router-link>
        </div>
        <div class="link">
            <router-link to="/regist">注册</router-link>
        </div>
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
      title: '登录',
      phone: '',
      password: '',
      flag: false
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
          that.$router.back()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form{
    margin-top: 50px;
}
form input{
  width: 80%;
  height: 1rem;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  padding-left:0.8rem;
  margin-top:1rem;
}

.button{
  margin-top:1.5rem;
  border: none;
  background-color: #379aff;
  color:#fff;
  width: 50%;
  height: 50px;
  border-radius: 60px;
  font-size: 22px;
  outline: none;
}
footer{
    margin-top: 5.5rem;
}
a{
    color: #2c3e50;
    text-decoration: none;
}
.link{
    margin-top: 10px;
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
