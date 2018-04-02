/**
 * Created by Administrator on 2018/2/2.
 */

let url={
  baseUrl:process.env.NODE_ENV==="production"?"http://www.718bank.com/throne":"http://10.4.33.251:9998",
  extraUrl:{
    articleUrl:process.env.NODE_ENV==="production"?"http://127.0.0.1":"http://10.4.33.251"
  },
  apiUrl:{
    "register":'{baseUrl}/rest/userInfo/save',//注册接口 POST GET
    "registerSendMsg":'{baseUrl}/rest/userInfo/{mobile}/sms4Register',//POST GET 注册时获取验证码端口
    "login":'{baseUrl}/rest/userInfo/login',//POST GET 登录接口
    "findMsg":'{baseUrl}/rest/userInfo/{mobile}/sms4ChangePassword',//找回密码发送验证码接口 POST GET
    "verifyCaptcha":'{baseUrl}/rest/userInfo/verifyCaptcha',//找回密码交验验证码接口 POST GET
    "resetPass":'{baseUrl}/rest/userInfo/resetPassword',//重置密码接口 POST GET
    "applyInfo":'{baseUrl}/rest/addInfoForylpayCapply/queryCapplyInfo',//进件信息展示接口 POST GET
    "addPersonalInfo":'{baseUrl}/rest/addInfoForylpayCapply/addPersonalInfo',//个人信息补件接口 POST GET
    "addPropertyInfo":'{baseUrl}/rest/addInfoForylpayCapply/addPropertyInfoForPc',//财产信息补件接口 POST GET
    "addShopInfo":'{baseUrl}/rest/addInfoForylpayCapply/addShopInfoForPc',//店铺信息补件接口 POST GET
    "addRiskInfo":'{baseUrl}/rest/addInfoForylpayCapply/addRiskInfoForPcOrH5',//风控信息 补件 POST GET
    "addEnsureInfo":'{baseUrl}/rest/addInfoForylpayCapply/addEnsureInfo',//担保信息补件 POST GET
    "addLoanInfo":'{baseUrl}/rest/addInfoForylpayCapply/addLoanInfo',//贷款信息补件 POST GET
    "addBankInfo":'{baseUrl}/rest/addInfoForylpayCapply/addBankInfo',//银行信息补件 POST GET
    "queryEnum":'{baseUrl}/rest/addInfoForylpayCapply/queryEnum',//补件枚举查询 POST GET
    "submitApply":'{baseUrl}/rest/addInfoForylpayCapply/submitApply',//申请页面提交接口 POST GET
    "queryCreditInfo":'{baseUrl}/rest/ylpayCredit/queryCreditInfo',//进件状态金额、授信状态金额查询 POST GET
    "createCloanWithdraw":'{baseUrl}/rest/ylpayCredit/createCloanWithdraw',//用信申请接口 POST GET
    "queryLoanInfo":'{baseUrl}/rest/ylpayLoanAndBill/queryLoanInfo',//-借款信息查询POST GET
    "queryLoanSchedule":'{baseUrl}/rest/ylpayLoanAndBill/queryLoanSchedule',//还款计划表查询接口（原型的【还款中/已逾期】和【已结清】均是此接口） POST GET
    "createPrepayLoan":'{baseUrl}/rest/ylpayLoanAndBill/createPrepayLoan',//申请提前还款（系统是预约机制，这里只是预约到离当期最近的还款日，到还款日系统自动进行提前还款） POST GET
    "queryLoanBill":'{baseUrl}/rest/ylpayLoanAndBill/queryLoanBill',//账单信息查询 POST GET
    "payLoanBill":'{baseUrl}/rest/ylpayLoanAndBill/payLoanBill',//账单信还款 POST GET
    "queryCustomerInfo":'{baseUrl}/rest/ylpayLoanAndBill/queryCustomerInfo',//客户信息查询 POST GET
    "queryCustomerAmount":'{baseUrl}/rest/ylpayLoanAndBill/queryCustomerAmount',//账户余额查询 POST GET
    "openAccount":'{baseUrl}/rest/lccb/openAccount',//开户 POST GET
    "customerRecharge":'{baseUrl}/rest/lccb/customerRecharge',//充值 POST GET
    "customerEnchashment":'{baseUrl}/rest/lccb/customerEnchashment',//提现 POST GET
    "customerAmountRecoed":'{baseUrl}/rest/lccb/customerAmountRecoed',//资金明细查询 POST GET
    "delManyPic":"{baseUrl}/rest/addInfoForylpayCapply/delManyPic",//进件信息图像删除--多张 POST GET
    "addPic":"{baseUrl}/rest/addInfoForylpayCapply/addPic",
    "getArticle":'{baseUrl}/api/v2/cms/category/{category}/name/{name}',
    "findContract":'{baseUrl}/api/v2/throne/findContractByRequestId/{requestId}',//合同展示 POST
    "getCompct":'{baseUrl}/api/v2/cms/category/DECLARATION/name/{segment}'
  }

};

module.exports=url;
