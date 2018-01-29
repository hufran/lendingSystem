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
import Setting from '@/components/setting/setting'
import MoneyDetail from '@/components/moneyDetail/moneyDetail'
import Jiekuan from '@/components/jiekuan/jiekuan'
import JiekuanDetail from '@/components/jiekuanDetail/jiekuanDetail'
import PayList from '@/components/paylist/paylist'
import Audit from '@/components/auditResult/audit'
import UseCredit from '@/components/useCredit/useCreditInfo'
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
        {path:'',component:ApplyMain},
        {path:'person', component:Person},
        {path:'property', component:Property},
        {path:'shop', component:Shop},
        {path:'risk', component:Risk},
        {path:'guarantee', component:Guarantee},
        {path:'loan', component:Loan},
        {path: '', component: ApplyMain},
        {path: 'person', component: Person},
        {path: 'Viewdata', component: Viewdata,
          children:[{path:'',component:ViewdataList},{path:':item',component:Update}]
        }
      ]
    },
    {
      path: '/apply/guarantee/range',
      component:Range
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
      path:'/auditResult',
      name:'auditResult',
      component:Audit
    },
    {
      path: '/useCredit',
      name: 'useCredit',
      component: UseCredit
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
