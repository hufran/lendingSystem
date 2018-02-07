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
export default{
  data(){
    return {
      data: [
        {name:"身份证照片",value:"3 >",linkUrl:"./Viewdata/idCard",options:[]},
        {name:"营业执照",value:">",linkUrl:"./Viewdata/businessLicense",options:[]},
        {name:"烟草经营许可证",value:">",linkUrl:"./Viewdata/license",options:[]},
        {name:"门头照片",value:">",linkUrl:"./Viewdata/storefront",options:[]},
        {name:"店内照片",value:">",linkUrl:"./Viewdata/shopPrice",options:[]},
        {name:"信用报告",value:">",linkUrl:"./Viewdata/credit",options:[]},
        {name:"结婚证",value:">",linkUrl:"./Viewdata/marriage",options:[]},
        {name:"户口本",value:">",linkUrl:"./Viewdata/residence",options:[]},
        {name:"店铺租赁合同或所有权证",value:">",linkUrl:"./Viewdata/ownership",options:[]},
        {name:"近半年批烟数量及金额",value:">",linkUrl:"./Viewdata/money",options:[]}
      ]
    }
  },
  beforeCreate(){
    eventHandle.$emit("title","影响信息");
  }
}
</script>
