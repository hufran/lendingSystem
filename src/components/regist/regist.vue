<template>
  <div class="register">
    <my-header  :title="title"></my-header>
    <div class="logo">
      <img src="/static/images/logo.png" alt="">
    </div>
    <form action="">
    <label for="">
       <input type="text" placeholder="请输入手机号"/>
    </label>
     <label for="" class="identifying">
        <input type="text" placeholder="请输入验证码" />
        <span class="identify">获取验证码</span>
     </label> 
      <label for="">
         <input type="password" placeholder="请输入密码" />
      </label>
      
    </form>
    <div class="protocal">
      <input type="checkbox" class="checkbox" />
      <span>阅读并同意《新毅金融用户注册协议》</span>
    </div>

    <input type="button" value="立即注册" class="button">
  </div>
</template>

<script>
import MyHeader from '@/components/header/header'
// import { Header } from 'mint-ui';
// Vue.component(Header.name, Header);
export default {
  data () {
    return {
      title: '注册'
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
  height: 2rem;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  padding-left:2rem;
  margin-top: 2rem;
}

.checkbox:checked{
  background-color: #379aff;
  color: #fff;
}
.protocal{
  text-align: left;
  width: 80%;
  padding-left: 2rem;
  margin-top: 2px;
}
.protocal input{
  vertical-align: middle;
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
  font-size: 0.8rem;
  position: absolute;
  right: 0.5rem;
  top: 0;
  padding: 5px 10px;
  border-radius: 8px;
}
.button{
  margin-top: 6rem;
  border: none;
  background-color: #379aff;
  color:#fff;
  width: 50%;
  height: 50px;
  border-radius: 60px;
  font-size: 22px;
  outline: none;
}

</style>