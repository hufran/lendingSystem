<template>
  <div>
    <ul>
      <li v-for="list in applyList" class="clear">
        <a :href="list.linkUrl" class="clear">
          <span class="floatLeft">{{list.title}}</span>
          <span class="floatRight">&gt;</span>
        </a>
      </li>
    </ul>
    <mt-button type="primary" @click="submit($event)">提交申请</mt-button>
  </div>
</template>
<style>

</style>
<script>

export default{
  data(){
    return {
      applyList:[
        {title:"个人信息",linkUrl:"/apply/person"},
        {title:"财产信息",linkUrl:"/apply/property"},
        {title:"店铺信息",linkUrl:"/apply/shop"},
        {title:"风控信息",linkUrl:"/apply/risk"},
        {title:"担保信息",linkUrl:"/apply/guarantee"},
        {title:"借款情况",linkUrl:"/apply/loan"},
        {title:"影像资料",linkUrl:"/apply/Viewdata"},
      ]
    }
  },
  beforeCreate(){

    eventHandle.$emit("title","小额经营贷");
  },
  methods:{
    submit:function(){
      console.log(this.$router);

    }
  },

}
</script>
