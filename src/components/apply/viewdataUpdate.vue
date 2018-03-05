<template>
  <div class="viewdataUpdate_body">
    <ul class="clear">
      <li v-for="(list,i) in data" :class="{editor:list.del}" @click="addDel(i)">
        <img :src="list.src" :title="list.title" />
        <span class="suerBtn" :style="{'background-image':'url('+list[1]+')','background-repeat':'no-repeat'}"></span>
      </li>
      <li class="uploadFile" v-show="!editorEmit">
        <div class="uploadImg">
          <img :src="imageList[0]" alt="点击上传" />
          点击上传
        </div>
        <input type="file" name="upload" @change="uploadFile" />
      </li>
    </ul>
    <div class="textCenter" v-if="editorEmit">
      <mt-button type="primary" @click="remove">删 除</mt-button>
    </div>
  </div>
</template>
<style>
  .viewdataUpdate_body ul{
    padding-bottom: 0.6rem;
    min-height:2.78rem;
  }
  .viewdataUpdate_body li{
    float: left;
    width:2.18rem;
    height:2.18rem;
    margin:0.6rem 0.52rem 0;
    position: relative;
    overflow: hidden;
    box-shadow:0 0 7px 0 #cbc9ca;
    border-radius:0.3rem;
  }
  .viewdataUpdate_body li img,.viewdataUpdate_body .uploadFile input{
    width:2.18rem;
    height:2.18rem;
    display: block;
    padding:0;
  }
  .viewdataUpdate_body li.editor{
    border:2px solid #379aff;

  }
  .viewdataUpdate_body li.editor .suerBtn{
    width:0.8rem;
    height: 0.8rem;
    background-size:contain;
    position: absolute;
    top:50%;
    left:50%;
    margin-left:-0.4rem;
    margin-top:-0.4rem;
  }
  .viewdataUpdate_body .uploadFile{
    border: 2px solid #ccc;
    line-height:2.18rem;
    font-size: 1rem;
    text-align:center;
    position: relative;
  }
  .viewdataUpdate_body .uploadImg{
    text-align: center;
    font-size:0.3rem;
    width:2.18rem;
    height:2.18rem;
    color: #ccc;
    line-height: 0.8rem;
  }
  .viewdataUpdate_body .uploadImg img{
    width:0.8rem;
    height:0.8rem;
    margin-top:0.4rem;
    margin-left:0.69rem;
  }
  .viewdataUpdate_body .uploadFile input{
    opacity: 0;
    position: absolute;
    top:0;
    left:0;
  }
</style>
<script>
import { Toast } from 'mint-ui';
export default{
  data(){
    return {
      data: [],
      editorEmit:false,
      titleText:"编辑",
      title:"影响信息",
      imageList:[window.baseUrl+'static/images/icon/upload.png',window.baseUrl+'/static/images/icon/sure.png']
    }
  },
  beforeCreate(){
    eventHandle.$on("editorEvent",(event)=>{
      if(this.titleText=="编辑"){
        this.editorEvent(event);
      }else if(this.titleText=="完成"){
        this.cancelEvent(event);
      }

    });
  },
  created(){
    eventHandle.$emit("title",this.title,this.titleText);
  },
  methods:{
    remove:function(index){
      let i=this.data.length-1;
      for(i;i>=0;i--){
        if(this.data[i].del){
          console.log(this.data[i].del);
          this.data.splice(i,1);
        }
      }
    },
    add:function(){
      this.data.push({title:"图片四",src:"https://creditmanager.b0.upaiyun.com/a95b6b5a39180b1e383183baec5d7dff",index:3,del:false});
    },
    uploadFile:function(event){
      let target=event.target;
      let files=target.files;
      for(let i=0,len=files.length;i<len;i++){
        if(files[i].size){
          let size=this.conversionType(files[i].size);
          if(size>2){
            Toast(files[i].name+"文件大小不能超过2M!");
            return;
          }
        }
        let pos=files[i].name.lastIndexOf(".");
        let extension=files[i].name.substring(pos+1);
        if(/jpg|jpeg|png|gif/i.test(extension)){
          var reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = (e)=>{
            console.log(e.target.result);
            this.data.push({title:files[i].name,src:e.target.result,index:(this.data.length-1),del:false});
          }
          reader.onerror=(err)=>{
            console.log(err);
            Toast("文件上传异常，请更换文件后尝试！");
          }
          reader.onabort=(data)=>{
              console.log(data);
            Toast("文件上传被中断...");
          }
          //此处需要对接ajax接口;

        }else{
          Toast(files[i].name+"文件格式(jpg,jpeg,gif,png)不支持!");
          return;
        }
      }
      console.log(files);
    },
    addDel:function(i){
      if(this.editorEmit){
        if(!this.data[i].del){
          this.data[i].del=true;
        }else{
          this.data[i].del=false;
        }
      }
    },
    cancelEvent:function(event){
      this.editorEmit=false;
      this.titleText="编辑";
      this.data.forEach((list,index)=>{
        list.del=false;
      });
      eventHandle.$emit("title",this.title,this.titleText);
    },
    editorEvent:function(event){
      this.editorEmit=true;
      this.titleText="完成";
      eventHandle.$emit("title",this.title,this.titleText);
    },
    conversionType:function(size=0){
      return (size/1024/1024);
    }
  }
}
</script>
