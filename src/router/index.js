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

Vue.use(Router)

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
        component: Regist
    },
    {
        path: '/login',
        name: 'login',
        component: Login
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
      children: [
        {path:'',component:ApplyMain},
        {path:'person', component:Person},
        {path:'property', component:Property},
        {path:'shop', component:Shop},
        {path:'risk', component:Risk},
        {path:'guarantee', component:Guarantee},
        {path:'loan', component:Loan},
      ]
    },
    {
      path: '/apply/guarantee/range',
      component:Range
    }
  ]
})
