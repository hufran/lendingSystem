<template>
  <div class="forget">
    <my-header  :title="title"></my-header>
    <form action="" v-if="forget == 1">
        <label for="">
           <input type="text" placeholder="请输入手机号"/>
        </label>
          <label for="" class="identifying">
             <input type="password" placeholder="请输入密码" />
             <span class="identify">获取验证码</span>
          </label>
    </form>

    <form action="" v-if="forget == 2">
        <label for="">
           <input type="password" placeholder="请输入密码"/>
        </label>
          <label for="">
             <input type="password" placeholder="请再次输入密码" />
          </label>
    </form>

    <input type="button" v-model="buttonMsg" class="button" @click="next">

  </div>
</template>

<script>
import MyHeader from '@/components/header/header'

export default {
  data () {
    return {
      title: '找回密码',
      buttonMsg: '下一步',
      forget: 1
    }
  },
  methods:{
    next: function(){
        console.log(this.forget)
        if(this.forget == 1){
            // console.log(this.forget)
            this.forget = 2
            this.buttonMsg = "完成"
        }else{
            // console.log(this.forget)
            this.$router.push('/login')
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
  top: 0;
  padding: 5px 10px;
  border-radius: 8px;
}

</style>
