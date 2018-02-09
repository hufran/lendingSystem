<template>
  <div class="index">
    <div class="swiper-wrap">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
              <img src="/static/images/wx.png" alt="" class="swiper-img">
          </mt-swipe-item>

          <mt-swipe-item>
              <img src="/static/images/vr.png" alt="" class="swiper-img">
          </mt-swipe-item>
          <mt-swipe-item>
              <img src="/static/images/wx.png" alt="" class="swiper-img">
          </mt-swipe-item>
        </mt-swipe>
    </div>

    <div class="info-wrap">
        <div class="title">
            <h3>小额经营贷</h3>
            <span>最高可贷：</span><span class="text">￥20万</span>
        </div>
        <div class="list">
            <p>申请条件：</p>
            <ul>
                <li>1.拥有烟草专门零售许可证的商户。</li>
                <li>2.年龄在18-60之间。</li>
                <li>3.经营时间一年以上。</li>
                <li>4.区域（除西藏、新疆、青海、内蒙外，所有区域）</li>
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
      linkUrl:""
    }
  },
  created: function(){
    this.checkApplyResult().then(()=>{
      if(this.applyStatus.applyInfo){
        if(this.applyStatus.applyInfo.applyStatusCode=="3025001"){
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
            }else if(this.applyStatus.creditInfo.creditStatusCode=="3019001"){
              this.linkUrl="/auditResult";
            }else if(this.applyStatus.creditInfo.creditStatusCode=="3019003"||this.applyStatus.creditInfo.creditStatusCode=="3019005"){
              this.linkUrl="/apply";
            }
          }
        }
      }else{
        this.linkUrl="/apply";
      }
    },(data)=>{
      if(data){
        this.linkUrl="/apply";
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
        $.post("/rest/ylpayCredit/queryCreditInfo",{loginName:window.userinfo.loginName})
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
  font-size: 22px;
  font-weight: 600;
  color: #f95758;
}

.list{
    width: 90%;
    margin: 0 auto;
}

.list p{
    text-align: left;
  margin:0.4rem 0;
}

.list ul{
    list-style: none;
    font-size: 14px;
    margin: 0;
    padding: 0;
    text-align: left;
}

.button{
    color: #fff;
    font-size: 18px;
    background-color: #379aff;
    padding: 10px 20px;
    width: 50%;
    margin: 0.26rem auto;
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
