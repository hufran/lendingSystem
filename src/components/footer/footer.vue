<template>
  <footer class="footer">
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="首页" @click.native="toGo">
        <img slot="icon" src="/static/images/logo.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="借款" @click.native="toGo">
        <img slot="icon" src="/static/images/logo.png">
        借款
      </mt-tab-item>
      <mt-tab-item id="我的" @click.native="toGo">
        <img slot="icon" src="/static/images/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      selected: '首页'
    }
  },
  methods: {
    toGo: function(){
        if(this.selected == "首页"){
            this.$router.push('/')
        }else if(this.selected == "我的"){
            this.$router.push('/user')
        }else{
            this.$router.push('/jiedai')
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>