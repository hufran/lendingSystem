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
import ArticleInfo from '@/components/aboutus/articleInfo'
import Help from '@/components/help/help'
import OpenBank from '@/components/user/openBank'
import Recharge from '@/components/user/recharge'
import AuthorizationCompact from '@/components/compact/authorizationCompact'
import LoanCompact from '@/components/compact/loanCompact'
import LoanServiceCompact from '@/components/compact/loanServiceCompact'
import Compact from '@/components/compact/compact'
import CompactUrl from '@/components/compact/url'
import CompactList from '@/components/compact/compactList'
import NotFound from '@/components/404/notFound'
import Exception from '@/components/500/exception'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/lend/h5/',
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
        {path: '',name:"applyMain",component: ApplyMain},
        {path: 'person',name:"applyPerson", component: Person},
        {path: 'bank',name:"applyBank", component: Bank},
        {path: 'property',name:"applyProperty", component: Property},
        {path: 'shop',name:"applyShop", component: Shop},
        {
          path: 'risk', component: Viewdata,
          children: [
            {path: '',name:"applyRiskMain", component: Risk},
            {path: 'riskInfo',name:"applyRiskInfo", component: Range},
          ]
        },
        {
          path: 'guarantee', component: Viewdata,
          children: [
            {path: '',name:"applyGuaranteeMain", component: Guarantee},
            {path: 'guaranteeInfo',name:"applyGuaranteeInfo", component: Range},
          ]
        },
        {path: 'loan',name:"applyLoan", component: Loan},
        {
          path: 'Viewdata', component: Viewdata,
          children: [
            {path: '',name:"applyViewdataMain", component: ViewdataList},
            {path: ':item',name:"applyViewdataUpdate", component: Update}
          ]
        }
      ]
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/money',
      name: 'money',
      component: MoneyDetail,
    },
    {
      path: '/jiekuan',
      name: 'jiekuan',
      component: Jiekuan,
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
      component: Audit
    },
    {
      path: '/useCredit',
      name: 'useCredit',
      component: UseCredit
    },
    {
      path: '/article',
      name: 'ArticleInfo',
      component: ArticleInfo
    },
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    {
      path:'/compact',
      name:'compact',
      component:Compact,
      children:[
         {
          path: 'url',
          name: 'url',
          component: CompactUrl
        },
        {
          path: 'compactList',
          name: 'compactList',
          component: CompactList
        }
      ]
    },
    {
      path:'/authorizationCompact',
      name:'authorizationCompact',
      component:AuthorizationCompact
    },
    {
      path:'/loanCompact',
      name:'loanCompact',
      component:LoanCompact
    },
    {
      path:'/loanServiceCompact',
      name:'loanServiceCompact',
      component:LoanServiceCompact
    },
    {
      path: '/open',
      name: 'openBank',
      component: OpenBank
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: Recharge
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: Recharge
    },
    {
      path:'/error',
      name:'error',
      component:Exception
    },
    {
      path: '*',
      name: "404",
      component: NotFound
    }
  ]
})
