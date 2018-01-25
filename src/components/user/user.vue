<template>
  <div class="user">
     <div class="user-top">
         
     </div>

     <ul>
         <li>
             <span>银行存管</span>
             <span>立即开户</span>
         </li>
         <li>
             <span>资金明细</span>
         </li>
         <li>
             <span>联系客服</span>
             <span>工作日9:00--18:00</span>
         </li>
         <li>
             <span>帮助中心</span>
         </li>
         <li>
             <span>关于我们</span>
         </li>
     </ul>
     <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '@/components/footer/footer'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    MyFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user{
   background: #e0e0e0;
   width: 100%;
   height: 100%;
}
.user-top{
    width: 100%;
    height: 256px;
    background-color: #379aff;
    opacity: 0.3;
}
ul{
    margin: 0;
    padding: 0;
}
li{
  list-style: none;
  border-bottom: 1px solid #c0c0c0;
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  background: #fff;
  position: relative;
  left: 0;
  top: 0;
  text-align: left;
  padding-left: 8px;
}
li:nth-child(3){
    /*border-top: 1px solid #c0c0c0;*/
    margin-top: 10px;
}
li span:nth-child(2){
    float: right;
    margin-right: 30px;
}
li:after{
  content: '>';
  position: absolute;
  right: 15px;
}
</style>