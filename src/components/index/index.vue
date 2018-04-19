<template>
  <div class="index">
    <div class="swiper-wrap">
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item>
            <img :src="imageList[0]" alt="" class="swiper-img">
          </mt-swipe-item>

          <!-- <mt-swipe-item>
            <img :src="imageList[1]" alt="" class="swiper-img">
          </mt-swipe-item>
          <mt-swipe-item>
            <img :src="imageList[2]" alt="" class="swiper-img">
          </mt-swipe-item> -->
        </mt-swipe>
    </div>

    <div class="info-wrap">
        <div class="title">
            <h3>云毅融</h3>
            <span>最高可贷：</span><span class="text">￥20万</span>
        </div>
        <div class="list">
            <p>申请条件：</p>
            <ul>
                <li>1.拥有烟草专门零售许可证的商户。</li>
                <li>2.年龄在18-60之间。</li>
                <li>3.经营时间一年以上。</li>
                <!-- <li>4.暂时仅限陕西地区</li> -->
            </ul>
        </div>
        <div class="button" :class="{gray:linkUrl==''}">
          <router-link :to="linkUrl">
            立即申请
          </router-link>
        </div>
    </div>
    <my-footer :comein="comein"></my-footer>
  </div>
</template>

<script>
import MyFooter from '@/components/footer/footer'
import { Toast } from 'mint-ui'
import {util} from '@/assets/js/util'
import $ from 'jquery';
import C from '@/assets/js/cookie'

export default {
  data () {
    return {
      comein: '首页',
      linkUrl:"",
      imageList:[window.baseUrl+"static/images/banner.jpg",window.baseUrl+"static/images/vr.png",window.baseUrl+"static/images/wx.png"],
      customerInfo:null
    }
  },
  created: function(){
    this.checkApplyResult().then(()=>{
      this.customerInfo = window.customerInfo || {};
      const status = this.customerInfo.openAccountResultCode || null;
      if (status) {
        if (status == "3055003") {
          //开户成功
          if(this.applyStatus.applyInfo){
            if(this.applyStatus.applyInfo.applyStatusCode=="3025001"||this.applyStatus.applyInfo.applyStatusCode==""){
              //申请中
              this.linkUrl="/apply";
            }else if(this.applyStatus.applyInfo.applyStatusCode=="3025003"){
              //审核中
              this.linkUrl="/auditResult";
            }else if(this.applyStatus.applyInfo.applyStatusCode=="3025002"){
              //{3019001,未使用；3019002,冻结；3019003,已取消；3019004,已使用；3019005，已过期}
              if(this.applyStatus.creditInfo){
                if(this.applyStatus.creditInfo.creditStatusCode=="3019004"){
                  this.linkUrl="";
                }else if(this.applyStatus.creditInfo.creditStatusCode=="3019001"||this.applyStatus.creditInfo.creditStatusCode==""){
                  this.linkUrl="/auditResult";
                }else if(this.applyStatus.creditInfo.creditStatusCode=="3019003"||this.applyStatus.creditInfo.creditStatusCode=="3019005"){
                  this.linkUrl="/apply";
                }
              }else{
                Toast("暂无授信信息，请耐心等待！");
              }
            }
          }else{
            Toast("暂无进件信息，请耐心等待！");
          }
        }else if (status == "3055004"||status == "3055005"||status == "3055001" || status == "3055002") {
          //开户失败 未开户 审核中
          this.linkUrl="/open";
        }else {
          Toast("获取用户开户状态异常，请刷新页面重新尝试！");
        }
      }else{
        Toast("网络异常，请稍后尝试！");
      }
    },(data)=>{
      if(data){
        Toast(data.message);
        this.linkUrl="";
      }else{
        this.linkUrl="/login";
      }
    });
  },
  methods: {
    checkApplyResult:function(){
      return new Promise((resolve, reject)=>{
        if(!util.checkObjectIsEmpty(this.applyStatus)){
          resolve();
          return this.applyStatus;
        }
        $.post(window.baseUrl+"rest/ylpayCredit/queryCreditInfo",{loginName:window.userinfo.loginName})
          .then((response)=>{
            if(response.status==0){
              this.applyStatus=response.data;
              resolve();
            }else{
              reject(response);
            }
          })
          .catch(function(response) {
            reject();
          });
      });
    }
  },
  components: {
    MyFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{
    background-color: #e0e0e0;
    width: 100%;
    height: 100%;
    padding-bottom:80px;
}
.swiper-wrap{
    width: 100%;
    height: 7.1rem;
    background: #379aff;
}
.swiper-img{
   width: 100%;
   height: 100%;
}

.info-wrap{
    background-color: #fff;
    width: 94%;
    margin: 15px auto;
    border-radius: 8px;
    padding-bottom: 10px;
}
.info-wrap .title{
  width: 90%;
  margin: 0  auto;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.26rem;
  padding-top: 0.26rem;
}
.title h3{
    margin: 0;
    margin-bottom: 10px;
}
.title .text{
  font-size: 16px;
  font-weight: 400;
  color: #f95758;
}

.list{
    width: 90%;
    margin: 0 auto;
}

.list p{
    text-align: left;
  margin:0.4rem 0 0.3rem;
}

.list ul{
    list-style: none;
    font-size: 12px;
    margin: 0;
    padding: 0;
    text-align: left;
}

.list ul li{
  height: 20px;
  line-height: 20px;
}
.button{
    color: #fff;
    font-size: 18px;
    background-color: #379aff;
    padding: 10px 20px;
    width: 50%;
    margin: 0.4rem auto 0.2rem;
    border-radius: 20px;
}
.button a{
  color:#fff;
  display: block;
}
.button.gray{
  background: rgba(159, 159, 159, 0.47);
}

</style>
