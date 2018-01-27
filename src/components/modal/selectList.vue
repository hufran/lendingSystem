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
    }
  },
  methods:{
    open:function(){
      this.showToolbar=true;
    },
    onValuesChange:function(obj,values){
      eventHandle.$emit('change',obj,values);
    },
    close() {
      this.showToolbar = false;
      eventHandle.$emit('cancel',this.selectValue);
    },
    confirm:function(){
      this.showToolbar = false;
      eventHandle.$emit('confirm',this.selectValue);

    }
  }

}
</script>
