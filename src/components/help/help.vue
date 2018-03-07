<template>
   <div class="help">
     <my-header :title="title"></my-header>
      <!--<ul>-->
        <!--<li  @click="showPup(0)">恒普金融平台为什么安全？</li>-->
        <!--<li @click="showPup(1)">支付密码忘记或修改，应该怎么做？</li>-->
        <!--<li @click="showPup(2)">我想换手机号，怎么办？</li>-->
        <!--<li @click="showPup(3)">银行卡可以绑定几张？</li>-->
        <!--<li @click="showPup(4)">提现后，为什么一直不到账？</li>-->
        <!--<li @click="showPup(5)">到哪儿可以查看我的投资收益明细？</li>-->
        <!--<li @click="showPup(6)">为什么要进行实名认证？</li>-->
        <!--<li @click="showPup(7)">我怎么知道我投资成功了？</li>-->
        <!--<li @click="showPup(8)">投资后资金为什么会被冻结？</li>-->
      <!--</ul>-->

     <!--<mt-popup-->
       <!--v-model="popupVisible"-->
       <!--popup-transition="popup-fade">-->
       <!--<div v-html="content" class="content"></div>-->
     <!--</mt-popup>-->
     <el-collapse v-model="activeNames" @change="handleChange">
       <el-collapse-item title="恒普金融平台为什么安全？" name="1">
         <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
         <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
       </el-collapse-item>
       <el-collapse-item title="支付密码忘记或修改，应该怎么做？" name="2">
         <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
         <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
       </el-collapse-item>
       <el-collapse-item title="我想换手机号，怎么办？" name="3">
         <div>简化流程：设计简洁直观的操作流程；</div>
         <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
         <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
       </el-collapse-item>
       <el-collapse-item title="提现后，为什么一直不到账？" name="4">
         <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
         <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
       </el-collapse-item>
       <el-collapse-item title="银行卡可以绑定几张？" name="4">
         <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
         <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
       </el-collapse-item>
     </el-collapse>
   </div>
</template>
<script>
  import MyHeader from '@/components/header/header'
  export default {
    data () {
      return {
        title: '帮助中心',
        popupVisible: false,
        contents: [
            '<p>恒普金融为恒泰证券旗下恒泰先锋投资有限公司的全资子公司，执行严格的风控标准操作，严格遵循证券行业行为准则，真正做到服务投资者，帮助投资者投资的目的。 <p style="margin:10px 0;">恒普金融平台使用联动优势作为第三方资金托管方，恒普金融坚持金融中介服务机构，不触碰资金，真正做到合规合法。 <p>平台所有项目均有第三方担保公司提供担保，降低用户的投资风险。恒普金融拥有国内专业的风控团队，技术团队和运营团队，保证每个投资人的资金安全。',

            '<p>支付密码是您在投资和提现时需要在联动优势输入的密码，在开通托管账户时以短信形式发送到您手机上。 <p style="margin:10px 0;">＊忘记支付密码：编辑CSMM＃注册用户身份证号后四位。例如：用户身份证后四位是0542，则编辑：CSMM＃0542，发送到1069 0569 687。 <p>＊修改支付密码：编辑GGMM＃原密码＃新密码（新密码必须为6位数字）。例如：原密码123456，新密码456789，则编辑：GGMM＃123456＃456789，发送到1069 0569 687。',

          '<p>目前恒普金融平台暂不支持更换手机号。',

          '<p>每个注册用户只能绑定一张银行卡。',

          '<p>在您的提现申请提交后，联动优势将会为您进行转账操作，具体规则如下：<ul style="width: 80%;margin-left: 10%;font-size: 0.3rem;"> <li>＊16点之前提交提现申请，经联动优势审核后，当日到账； <li>＊16点以后提交的提现申请，将于第二个工作日10点审核。</ul> <p style="margin: 10px 0;">联动优势于工作日的10点，14点、16点，定时对用户发起的提现请求进行受理。 <p>若遇节假日顺延，每周一因要审核周五、周六、周日三天的付款申请，因此略有延时。',

          ' <p>个人中心－资金纪录中可以查看充值，提现，投资，收益等信息记录。',

          '<p>实名认证的目的是为了确认投资人的身份以及保证投资借款合同的有效性与合法性。通过实名认证验证可确认您设置的提现银行账户是否属于您本人。（为了确保您的资金安全，建议您在首次投资前必须进行实名认证。实名认证仅需您输入您的身份证号及姓名，恒普金融对于所有用户资料将严格保密）。',

          '<p>可以进入我的投资查看项目状态。',

          '<p>在您确认投资且投资项目还未满额时，您的资金将会被短暂冻结。当项目满额且成功放款的时候，投资人的投资就会生效。注意：被冻结资金仍然在您的联动优势账户中。'
        ],
        content: '',
        activeNames: ['1']
      }
    },
    created: function(){
      this.content = this.contents[0]
    },
    methods: {
      showPup: function(index){
        this.popupVisible = true
        this.content = this.contents[index]
      },
      handleChange(val) {
        console.log(val);
      }
    },
    components: {
      MyHeader
    }
  }
</script>

<style scoped>
.help{
  width:100%;
  height:100%;
}
  ul{
    text-align: left;
    width: 90%;
    margin: 1rem auto;
  }
  ul li{
    border: 1px solid #c0c0c0;
    height:1.2rem;
    line-height:1.2rem;
    padding-left:1rem;
  }

.mint-popup{
  width:100%;
  min-height:3rem;
  font-size:0.4rem;
}
  .mint-popup .content{
    width:90%;
    margin:10px auto;
    text-align: left;
  }
  .el-collapse{
    text-align: left;
  }

</style>
