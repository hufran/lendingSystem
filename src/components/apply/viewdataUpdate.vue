<template>
  <div class="viewdataUpdate_body">
    <ul class="clear">
      <li v-for="(list,i) in data" :key="" :class="{editor:list.del}" @click="addDel(i)">
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
import { Toast,MessageBox } from 'mint-ui';
import {util} from '@/assets/js/util'
import $ from 'jquery';
export default{
  data(){
    return {
      data: [],
      editorEmit:false,
      titleText:"编辑",
      title:"影像信息",
      imageList:[window.baseUrl+'static/images/icon/upload.png',window.baseUrl+'/static/images/icon/sure.png'],
      applyInfo:{},
      requestItem:''
    }
  },
  beforeCreate(){
    eventHandle.$off("setApplyInfo");
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
    let restful=['identification','businessLicense','businessCertificate','doorOut','doorIn','pictureCredit','marriageCertificate','residenceBooklet','pictureLeaseContract','inTobacco'];
    for(let key of restful){
      if(key===this.$route.params.item){
        //符合要求的请求范围
        this.requestItem=(key.slice(0,1)).toUpperCase()+key.substring(1);
        eventHandle.$on("setApplyInfo",(data)=>{
          if(!util.checkObjectIsEmpty(data)){
            this.applyInfo=data.applyInfo;
            let imgList=this.applyInfo[this.requestItem]||this.applyInfo[this.$route.params.item];
            if(imgList&&imgList.length>0){
              this.data=[];
              for(let i=imgList.length-1;i>=0;i--){
                this.add(imgList[i].imageName,imgList[i].imageUrl,1);
              }
            }
          }
        });
        eventHandle.$emit("getApplyInfo");
        return
      }
    }
    //非符合要求的请求
    MessageBox.alert("访问资源地址错误，请确定后进入指定页面").then(()=>{
      this.$router.push("/apply/Viewdata");
    });


  },
  methods:{
    remove:function(index){
      let i=this.data.length-1;
      let delList=[],serviceDelList=[];
      for(let j=0,len=i;j<=len;j++){
        if(this.data[j].del){
          delList.push(this.data[j].title);
          if(this.data[j].method==1){
            serviceDelList.push(this.data[j].title);
          }
        }
      }
      if(delList.length>0){
        MessageBox.confirm("确定删除所有选中的图片吗？").then((action)=>{
          for(i;i>=0;i--){
            if(this.data[i].del&&this.data[i].method==2){
              this.data.splice(i,1);
            }
          }
          delList=null;
          if(serviceDelList.length>0){
            let self=this;
            $.ajax({
              url:window.baseUrl+"rest/addInfoForylpayCapply/delManyPic",
              method:'post',
              data:{loginName:window.userinfo.mobile,jsonImageNames:JSON.stringify(serviceDelList)},
              success({status,message,data}){
                if(status==0){
                  let i=self.data.length-1;
                  for(i;i>=0;i--){
                    console.log("this.data:",self.data);
                    if(self.data[i].del&&self.data[i].method==1){
                      self.data.splice(i,1);
                    }
                  }
                  eventHandle.$emit("updateApply");

                }else{
                  Toast(message);
                  return;
                }
              },
              error(err){
                console.log(err);
                Toast("网络异常，请稍后重试!");
              }
            });
          }

        });
      }else{
        Toast("您尚未选择需要删除的图片;");
      }

    },
    add:function(title="图片",src="https://creditmanager.b0.upaiyun.com/a95b6b5a39180b1e383183baec5d7dff",method=1){
      //method为添加方式，1代表用户已经上传的图片添加  2带面用户新选择上传的图片
      this.data.push({title:title,src:src,index:3,del:false,method:method});
    },
    uploadFile:function(event){
      console.log("1:",this.data);
      let target=event.target;
      let files=target.files;
      for(let i=0,len=files.length;i<len;i++){
        /*if(files[i].size){
          let size=this.conversionType(files[i].size);
          if(size>2){
            Toast(files[i].name+"文件大小不能超过2M!");
            return;
          }
        }
        let pos=files[i].name.lastIndexOf(".");
        let extension=files[i].name.substring(pos+1);
        if(/jpg|jpeg|png|gif/i.test(extension)){*/
          var reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = (e)=>{
            this.data.push({title:files[i].name,src:e.target.result,index:(this.data.length-1),del:false,method:1});
            reader=null;
          }
          reader.onerror=(err)=>{
            console.log(err);
            Toast("获取文件数据异常，请更换文件后尝试！");
          }
          reader.onabort=(data)=>{
            console.log(data);
            Toast("文件上传被中断...");
          }

          let fdLend = new FormData();
          fdLend.append("loginName",window.userinfo.mobile);
          const paramName=this.requestItem.indexOf("Picture")!=-1?this.requestItem.replace("P","p"):"picture"+this.requestItem;
          fdLend.append(paramName+"File",files[i]);
          $.ajax({
            url:window.baseUrl+'rest/addInfoForylpayCapply/addPic',
            method:'post',
            contentType: false,
            processData: false,
            data:fdLend,
            success({status,message,data}){
              if(status==0){
                Toast("文件上传成功");
                eventHandle.$emit("updateApply");
              }else{
                Toast(message);
              }
            },
            error(err){
              console.log(err);
              Toast("网络异常，请稍后重试！");
            }
          })
        /*}else{
          Toast(files[i].name+"文件格式(jpg,jpeg,gif,png)不支持!");
          return;
        }*/
      }
      console.log(files);
    },
    addDel:function(i){
      if(this.editorEmit){
        this.data[i].del=!this.data[i].del;
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
  },
  destoryed(){
    eventHandle.$off("setApplyInfo");
  }
}
</script>
