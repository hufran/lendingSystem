<template>
  <header class="m-header">
    <i class="el-icon-back" @click="back">＜</i>
    <h1 class="text">{{title}}</h1>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    coming: {
      type: String,
      default: ''
    }
  },
  methods: {
    back: function(){
      if(this.comeing == 'login'){
         this.$router.push('/')
      }else{
         this.$router.back()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-header{
  width: 100%;
  height: 44px;
  line-height: 44px;
  position: relative;
  left: 0;
  top: 0;
}
.m-header h1{
  font-size: 1.2rem;
  font-weight: normal;
  margin:0;
}
.el-icon-back{
  position: absolute;
  left: 1rem;
  font-style: normal;
  font-size: 22px;
}
</style>
