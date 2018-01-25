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
        <div class="button">
            立即申请
        </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '@/components/footer/footer'
export default {
  data () {
    return {
      msg: ''
    }
  },
  created: function(){
    this.selected = "首页"
  },
  methods: {
    touser: function(){
        this.$router.push('/login')
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
    height: 265px;
    background: #379aff;
}
.swiper-img{
   width: 100%;
   height: 100%;
}
.mint-swipe-indicator.is-active{
  background: red;
  opacity: 1;
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
  padding-bottom: 10px;
  padding-top: 10px;
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
    margin: 10px auto;
    border-radius: 20px;
}

</style>