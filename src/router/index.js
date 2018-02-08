import Vue from 'vue'
import Router from 'vue-router'
import Regist from '@/components/regist/regist'
import Index from '@/components/index/index'
import Login from '@/components/login/login'
import Forget from '@/components/forget/forget'
import User from '@/components/user/user'
import Apply from '@/components/apply/list'
import Person from '@/components/apply/personInfo'
import ApplyMain from '@/components/apply/main'
import Property from '@/components/apply/property'
import Shop from '@/components/apply/shopInfo'
import Risk from '@/components/apply/riskInfo'
import Guarantee from '@/components/apply/guaranteeInfo'
import Range from '@/components/apply/range'
import Loan from '@/components/apply/loanInfo'
import Viewdata from '@/components/apply/viewdataInfo'
import ViewdataList from '@/components/apply/viewdataList'
import Update from '@/components/apply/viewdataUpdate'
import Bank from '@/components/apply/bankInfo'
import Setting from '@/components/setting/setting'
import MoneyDetail from '@/components/moneyDetail/moneyDetail'
import Jiekuan from '@/components/jiekuan/jiekuan'
import JiekuanDetail from '@/components/jiekuanDetail/jiekuanDetail'
import PayList from '@/components/paylist/paylist'
import Audit from '@/components/auditResult/audit'
import UseCredit from '@/components/useCredit/useCreditInfo'
import AboutUs from '@/components/aboutus/aboutus'
import Help from '@/components/help/help'
import OpenBank from '@/components/user/openBank'
import Recharge from '@/components/user/recharge'
import Withdraw from '@/components/user/withdraw'
import {util} from '@/assets/js/util'
import C from '@/assets/js/cookie'

Vue.use(Router)
class checkUserIsLogin{
  constructor(to, from, next){
    console.log("nextssss:",next);
    if(!util.checkObjectIsEmpty(window.userinfo)&&C.GetCookie("token")){
      //用户已经登录
      if(to=="/regist"||to=="/login"){
        next("/user");
        return;
      }
      next(to);
    }else{
      //用户未登录
      next('/login');
    }
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/regist',
      name: 'regist',
      component: Regist,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/apply',
      component: Apply,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      },
      children: [
        {path: '', component: ApplyMain},
        {path: 'person', component: Person},
        {path: 'bank', component: Bank},
        {path: 'property', component: Property},
        {path: 'shop', component: Shop},
        {
          path: 'risk', component: Viewdata,
          children: [
            {path: '', component: Risk},
            {path: 'riskInfo', component: Range},
          ]
        },
        {
          path: 'guarantee', component: Viewdata,
          children: [
            {path: '', component: Guarantee},
            {path: 'guaranteeInfo', component: Range},
          ]
        },
        {path: 'loan', component: Loan},
        {path: '', component: ApplyMain},
        {path: 'person', component: Person},
        {
          path: 'Viewdata', component: Viewdata,
          children: [
            {path: '', component: ViewdataList},
            {path: ':item', component: Update}
          ]
        }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },
    {
      path: '/money',
      name: 'money',
      component: MoneyDetail,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },
    {
      path: '/jiekuan',
      name: 'jiekuan',
      component: Jiekuan,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      },
      children: [
        {
          path: ':id',
          name: 'jiekuanDetail',
          component: JiekuanDetail,
          children: [
            {
              path: ':num',
              name: 'paylist',
              component: PayList
            }
          ]
        }
      ]
    },
    {
      path: '/auditResult',
      name: 'auditResult',
      component: Audit,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },
    {
      path: '/useCredit',
      name: 'useCredit',
      component: UseCredit,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path: '/open',
      name: 'openBank',
      component: OpenBank,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Withdraw,
      beforeEnter: (to, from, next) => {
        new checkUserIsLogin(to, from, next);
      }
    },


    {
      path: '*',
      name: "404",
      redirect: '/'
    }
  ]
})
