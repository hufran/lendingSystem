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

import Setting from '@/components/setting/setting'
import MoneyDetail from '@/components/moneyDetail/moneyDetail'
import Jiekuan from '@/components/jiekuan/jiekuan'
import JiekuanDetail from '@/components/jiekuanDetail/jiekuanDetail'
import PayList from '@/components/paylist/paylist'
import AboutUs from '@/components/aboutus/aboutus'
import Help from '@/components/help/help'
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
        {path: '', component: ApplyMain},
        {path: 'person', component: Person}
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      component:Setting
    },
    {
      path: '/money',
      name: 'money',
      component: MoneyDetail
    },
    {
      path: '/jiekuan',
      name: 'jiekuan',
      component: Jiekuan,
      children:[
        {
          path: ':id',
          name: 'jiekuanDetail',
          component: JiekuanDetail,
          children:[
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
      path: '/aboutus',
      name: 'aboutus',
      component: AboutUs
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    }
  ]
})
