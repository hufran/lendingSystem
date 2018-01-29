<template>
  <mt-popup
    v-model="showToolbar"
    position="bottom"
    popup-transition="popup-fade" class="mint-datetime">
    <mt-picker class="mint-datetime-picker" ref="picker" :slots="slots" @change="onValuesChange" show-toolbar>
      <span class="mint-datetime-action mint-datetime-cancel" @click="close">{{cancelText}}</span>
      <span class="mint-datetime-action mint-datetime-confirm" @click="confirm">{{confirmText}}</span>
    </mt-picker>
  </mt-popup>
</template>
<style>
  .picker-slot {
    width: 100%;
    text-align: center;
  }
</style>
<script>

export default{
  data(){
    return {
      selectValue:"",
      first:false,
      showToolbar:false
    }
  },
  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    slots:{
      type: Array
    },
    index:{
      type:Number
    }
  },
  methods:{
    open:function(){
      this.showToolbar=true;
    },
    onValuesChange:function(obj,values){
      this.selectValue=values;
      if(!this.first){this.first=true;return}
      eventHandle.$emit('change',obj,values,this.index);
    },
    close() {
      this.showToolbar = false;
      eventHandle.$emit('cancel');
    },
    confirm:function(){
      this.showToolbar = false;
      eventHandle.$emit('confirm',this.selectValue,this.index);

    }
  }

}
</script>
