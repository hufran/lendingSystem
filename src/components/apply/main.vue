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
    <button @click="submit($event)">提交申请</button>
  </div>
</template>
<style>

</style>
<script>

export default{
  data(){
    return {
      title:"小额经营贷",
      applyList:[
        {title:"个人信息",linkUrl:"/apply/person"},
        {title:"财产信息",linkUrl:"/"},
        {title:"店铺信息",linkUrl:"/"},
        {title:"风控信息",linkUrl:"/"},
        {title:"担保信息",linkUrl:"/"},
        {title:"借款情况",linkUrl:"/"},
        {title:"影像资料",linkUrl:"/"},
      ]
    }
  },
  methods:{
    submit:function(){
      console.log(this.$router);

    }
  },

}
</script>
