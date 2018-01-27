<template>
  <div class="viewdataUpdate_body">
    <ul class="clear">
      <li v-for="(list,i) in data">
        <span class="operateImg" @click="remove(i)"></span>
        <img :src="list.src" :title="list.title" />
      </li>
      <li class="uploadFile" @click="add">
        +
        <input type="file" name="upload" />
      </li>
    </ul>
  </div>
</template>
<style>
  .viewdataUpdate_body ul{
    width:94%;
    padding:0 3% 0.6rem;
  }
  .viewdataUpdate_body li{
    float: left;
    width:2.67rem;
    height:2.67rem;
    border: 4px solid #ccc;
    margin:0.6rem 0.25rem 0 0;
    position: relative;
    overflow: hidden;
  }
  .viewdataUpdate_body li img,.viewdataUpdate_body .uploadFile input{
    width:2.67rem;
    height:2.67rem;
    display: block;
  }
  .viewdataUpdate_body .uploadFile{
    border: 2px solid #ccc;
    line-height:2.67rem;
    font-size: 1rem;
    text-align:center;
  }
  .viewdataUpdate_body .uploadFile input{
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
  }
  .operateImg{
    width:24px;
    height:20px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
<script>
export default{
  data(){
    return {
      data: [
        {title:"图片一",src:"https://creditmanager.b0.upaiyun.com/a95b6b5a39180b1e383183baec5d7dff",index:0},
        {title:"图片二",src:"https://creditmanager.b0.upaiyun.com/a95b6b5a39180b1e383183baec5d7dff",index:1},
        {title:"图片二",src:"https://creditmanager.b0.upaiyun.com/a95b6b5a39180b1e383183baec5d7dff",index:2},
      ]
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","影响信息");
  },
  methods:{
    remove:function(index){

      this.data=this.data.splice(index+1);
    },
    add:function(){
      this.data.push({title:"图片四",src:"https://creditmanager.b0.upaiyun.com/a95b6b5a39180b1e383183baec5d7dff",index:3});
    }
  }
}
</script>
