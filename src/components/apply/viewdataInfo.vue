<template>
  <div class="shopInfo_body">
    <router-view />
  </div>
</template>
<style>

</style>
<script>
export default{
  data(){
    return {
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","影响信息");
  }
}
</script>
