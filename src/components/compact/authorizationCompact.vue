<template>
  <div class="compact">
    <my-header :title="title" v-if="showTitle"></my-header>
    <div class="content">
      <h1 class="textCenter">电子签章授权委托协议</h1>
      <p class="bold">您在签署本《电子签章授权委托协议》时，视为您已阅读、理解并同意本协议的相关所有内容，同意按本协议约定的程序通过718金融系统申请数字证书服务。</p>
      <p>委托人（借款人）：</p>
      <p>   身份证号：</p>
      <p>   受托人（平台方）：<span class="underline">新毅网络科技有限公司（简称“718金融”）</span></p><br/><br><br/>
      <div>鉴于：</div>
      <p>1. 受托人系在北京市依法设立并有效存续的有限责任公司，投资运营718金融平台,能够为平台上注册的投资客户和借款客户提供借贷居间服务。</p>
      <p>2. 深圳法大大网络科技有限公司(以下简称“法大大公司”)为第三方在线电子签约平台服务提供商，能够为委托人提供电子签约服务。</p>
      <p>3. 委托人系718金融平台上注册的借款人/出借人，拟通过718金融平台进行借款/出借资金，并同意通过法大大公司的电子签约服务签订相关电子文件。</p>
      <p>为了能够更好的完成委托人的签约服务，现委托人特委托并授权受托人办理如下事宜：</p>
      <ul>
        <li>收集委托人的实名认证信息（包括但不限于姓名、身份证号、电话等），并将该等信息提交给法大大公司或法大大公司合作的CA认证机构，以委托人名义申请数字证书服务；</li>
        <li>代为管理委托人申请的数字证书；</li>
        <li>委托人使用数字证书签订合同文件时，由受托人将相关合同文件提交电子签约系统办理委托人的电子签约事宜；</li>
        <li>委托人通过718金融平台办理的其他需要使用委托人的数字证书签署文件的，由受托人代为向电子签约系统提交相关文件办理委托人的电子签约事宜；</li>
        <li>代为保管委托人通过718金融使用数字证书签署的全部文件。委托人承诺其提供的实名认证信息真实、合法、有效，委托人通过718金融平台使用数字证书产生的义务、责任由委托人自行承担，与受托人无关。受托人仅代委托人申请数字证书、提交需要签署的文件、保管已签署的文件，不代理委托人使用数字证书。</li>
      </ul><br><br><br><br><br><br>
      <p>本授权委托书由委托人通过在线点击确认的方式对受托人进行授权，自委托人在线点击确认之日起发生法律效力。委托期限至委托人与受托人之间的居间关系终止并且委托人停止使用718金融平台为止。</p><br>
      <br><br><br><br><br>
      <br>
      <p>（本页无正文，为《718金融平台借款合同》之签署页）</p><br><br><br>
      <p class="bold">委托人（签章）： </p><br><br><br>
      <p class="bold">受托人（签章）： </p><br><br><br>
      <p>日期： ________年________月________日</p><br>
      <p>日期： ________年________月________日</p>

    </div>

  </div>
</template>
<style>
  .compact{
    background: #fff;
  }
  .compact .content{
    border-top:1px solid #F5F5F5;
    text-align: left;
    font-size: 14px;
    line-height: 30px;
    color:#000;
    padding:0 0.5rem;
  }
  .compact p{
    text-indent: 2em;
  }
  .compact h1{
    font-size:18px;
  }
  .compact ul li{
    list-style-type:disc;
  }
  .compact h2{
    font-size:15px;
    margin-top:0.8rem;
  }
</style>
<script>
  import MyHeader from '@/components/header/header'
  export default{
    data(){
      return {
        title: '借款合同',
        showTitle:true
      }
    },
    created(){
      if(this.$route.params.show&&this.$route.params.show=='0'){
        this.showTitle=false
      }
    },
    components: {
      MyHeader
    }
  }
</script>
