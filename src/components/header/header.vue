<template>
  <header class="m-header">
    <i class="el-icon-back" @click="back"></i>
    <h1 class="text">{{title}}</h1>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    back: function(){
      this.$router.back()
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
  font-size: 0.6rem;
  font-weight: normal;
  margin:0;
}
.el-icon-back{
  position: absolute;
  left: 0.5rem;
  top:10px;
  font-style: normal;
  width:0.6rem;
  height:0.6rem;
  background: url("/static/images/icon/back.png");
  background-size: 100% 100%;
}
</style>
