<template>
  <div class="shopInfo_body">
    <ul>
      <li class="clear" v-for="(list,i) in data">
        <router-link :to="typeof list.linkUrl=='undefined'?'':list.linkUrl" class="clear">
          <span class="floatLeft">{{list.name}}</span>
          <span class="floatRight" v-if="list.value==''" @click="showSelect(i)">
              <i>{{list.options[list.checked].name}}</i>&gt;
              <mt-actionsheet
                :actions="list.options"
                v-model="list.sheetVisible">
              </mt-actionsheet>
          </span>
          <span  class="floatRight" v-if="!(list.value=='')">
              {{list.value}}
          </span>
        </router-link>
      </li>
    </ul>
    <mt-button type="primary">保 存</mt-button>
  </div>
</template>
<style>

</style>
<script>
import { Toast } from 'mint-ui';
import {util} from '@/assets/js/util'
export default{
  data(){
    return {
      data: [
        {name:"身份证照片",value:">",linkUrl:"./Viewdata/identification",options:[]},
        {name:"营业执照",value:">",linkUrl:"./Viewdata/businessLicense",options:[]},
        {name:"烟草经营许可证",value:">",linkUrl:"./Viewdata/businessCertificate",options:[]},
        {name:"门头照片",value:">",linkUrl:"./Viewdata/doorOut",options:[]},
        {name:"店内照片",value:">",linkUrl:"./Viewdata/doorIn",options:[]},
        {name:"信用报告",value:">",linkUrl:"./Viewdata/pictureCredit",options:[]},
        {name:"结婚证",value:">",linkUrl:"./Viewdata/marriageCertificate",options:[]},
        {name:"户口本",value:">",linkUrl:"./Viewdata/residenceBooklet",options:[]},
        {name:"店铺租赁合同或所有权证",value:">",linkUrl:"./Viewdata/pictureLeaseContract",options:[]},
        {name:"近半年批烟数量及金额",value:">",linkUrl:"./Viewdata/inTobacco",options:[]}
      ],
      applyInfo:{}
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","影响信息");
    eventHandle.$on("setApplyInfo",(data)=>{
      if(!util.checkObjectIsEmpty(data)){
        this.applyInfo=data.applyInfo;
        let {
          Identification,
          BusinessLicense,
          BusinessCertificate,
          DoorOut,
          DoorIn,
          pictureCredit,
          MarriageCertificate,
          ResidenceBooklet,
          pictureLeaseContract,
          InTobacco
        }=this.applyInfo;
        this.data[0].value=!Identification?">":Identification.length+" >";
        this.data[1].value=!BusinessLicense?">":BusinessLicense.length+" >";
        this.data[2].value=!BusinessCertificate?">":BusinessCertificate.length+" >";
        this.data[3].value=!DoorOut?">":DoorOut.length+" >";
        this.data[4].value=!DoorIn?">":DoorIn.length+" >";
        this.data[5].value=!pictureCredit?">":pictureCredit.length+" >";
        this.data[6].value=!MarriageCertificate?">":MarriageCertificate.length+" >";
        this.data[7].value=!ResidenceBooklet?">":ResidenceBooklet.length+" >";
        this.data[8].value=!pictureLeaseContract?">":pictureLeaseContract.length+" >";
        this.data[9].value=!InTobacco?">":InTobacco.length+" >";
      }
    });
  },
  created(){
    eventHandle.$emit("getApplyInfo");

  },
  destoryed(){
    eventHandle.$off("setApplyInfo");
  }
}
</script>
