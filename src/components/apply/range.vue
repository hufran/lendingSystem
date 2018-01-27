<template>
  <div class="range">
    <header-component :title="title" />
    <div class="range_body">
      <textarea>

      </textarea>
      <mt-button type="primary">保 存</mt-button>
    </div>
  </div>

</template>
<style>
  .range{
    height:100%;
  }
  .range_body{
    background-color: rgb(242, 242, 242);
  }
  .range_body textarea{
    margin:0.2rem;
    padding:0.1rem;
    font-size:0.41rem;
    width:93.4%;
    line-height:0.8rem;
    color: #000;
    border:1px solid #c0c0c0;
  }

  .range_body .mint-button--normal{
    line-height:1.2rem;
    margin:0.48rem 0;
    width:70%;
    font-size:0.5rem;
  }
</style>
<script>
import HeaderComponent from '@/components/header/header'
export default{
  data(){
    return {
      title:"担保机构经营范围"
    }
  },
  components: {
    HeaderComponent
  }
}

</script>
