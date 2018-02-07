<template>
  <footer class="footer">
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="首页" @click.native="toGo">
        <img  slot="icon" :src="selected == '首页'? '/static/images/icon/index-2.png' : '/static/images/icon/index-1.png'">
        首页
      </mt-tab-item>
      <mt-tab-item id="借款" @click.native="toGo">
        <img  slot="icon" :src="selected == '借款'? '/static/images/icon/jiekuan-2.png' : '/static/images/icon/jiekuan-1.png'">
        借款
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="toGo">
        <img  slot="icon" :src="selected == '我的'? '/static/images/icon/user-2.png' : '/static/images/icon/user-1.png'">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>

<script>
  import C from '@/assets/js/cookie';
export default {
  props:{
    comein: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selected: this.comein
    }
  },
  methods: {
    toGo: function(){
        var token = C.GetCookie("token");
        if(this.selected == "首页"){
            this.$router.push('/')
        }else if(this.selected == "我的"){
            this.$router.push('/user')
        }else{
          if(token){
            this.$router.push('/jiekuan')
          }else{
            this.$router.push('/login')
          }
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
