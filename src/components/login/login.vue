<template>
  <div class="user">
    <my-header  :title="title" :coming="coming"></my-header>
    <form action="">
    <label for="">
       <input type="text" placeholder="请输入手机号" v-model="phone" @blur="blur('phone')"/>
    </label>
      <label for="">
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
export default {
  data () {
    return {
      title: '登录',
      coming: 'login',
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
      this.blur('phone');
      if(!this.flag){return}
      this.blur('password');
      if(!this.flag){return}
      this.$router.push('/user')
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
  height: 0.5rem;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  padding-left:0.8rem;
  margin-top:1.8rem;
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
</style>
