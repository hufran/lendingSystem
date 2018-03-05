// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import * as flexable from './assets/js/flexible'
import Swiper from 'swiper'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.min.css';
import {util} from '@/assets/js/util'
import C from '@/assets/js/cookie'
import $ from 'jquery';


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(MintUi)

if(window.ver=='production'){
  //正式环境
  window.baseUrl="./";

}else{
  //测试环境
  window.baseUrl="/";

}

window.eventHandle = new Vue()
window.userinfo={};
function getSessionInfo() {

  if (!(util.checkObjectIsEmpty(window.userinfo))) {
    return;
  }
  $.ajax({
    type: "post",
    url: "./rest/getSessionInfo",
    async: false,
    success: (response) => {
      if (response.status == 0) {
        window.userinfo = response.data.userinfo;
        window.customerInfo=response.data.customerInfo;
        window.applyInfo=response.data.applyInfo;
      }
    },
    error: (response) => {
      console.log(response);
    }
  });
}
getSessionInfo();

function checkUserIsLogin(to, from, next){
  let path= [
    "apply",
    "setting","money",
    "jiekuan",
    "auditResult","useCredit",
    "open","recharge",
    "withdraw"
  ];
  for(let key in path){
    if(to.path.indexOf(path[key])!=-1){
      if(!util.checkObjectIsEmpty(window.userinfo)&&C.GetCookie("token")){
        if(to.path.indexOf("regist")!=-1||to.path.indexOf("login")!=-1){
          next("/user");
          return;
        }
        next(true);
      }else{
        next('/login');
      }
      return;
    }else if(to.path.indexOf("login")!=-1||to.path.indexOf("regist")!=-1){
      if(!util.checkObjectIsEmpty(window.userinfo)&&C.GetCookie("token")){
        next("/user");
        return;
      }else{
        next(true);
      }
    }
  }
  next(true);

}

router.beforeEach((to, from, next) => {
  checkUserIsLogin(to, from, next);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

