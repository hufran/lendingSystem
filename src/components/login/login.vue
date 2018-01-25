<template>
  <div class="user">
    <my-header  :title="title" :comein="comein"></my-header>
    <form action="">
    <label for="">
       <input type="text" placeholder="请输入手机号"/>
    </label>
      <label for="">
         <input type="password" placeholder="请输入密码" />
      </label>   
    </form>

    <input type="button" value="立即登录" class="button">

    <footer>
        <div class="link">
           <router-link to="/forget">忘记密码</router-link>
        </div>
        <div class="link">
            <router-link to="/regist">注册</router-link>
        </div>
    </footer>
    
    <!-- <div>
        <a href="../regist">注册</a>
    </div> -->
  </div>
</template>

<script>
import MyHeader from '@/components/header/header'

export default {
  data () {
    return {
      title: '登录',
      comein: 'login'
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
  height: 2rem;
  border: none;
  border-bottom: 1px solid #cccccc;
  outline: none;
  padding-left:2rem;
  margin-top: 2rem;
}

.button{
  margin-top: 5rem;
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
    margin-top: 6rem;
}
a{
    color: #2c3e50;
    text-decoration: none;
}
.link{
    margin-top: 10px;
}
</style>