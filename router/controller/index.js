/**
 * Created by Administrator on 2018/2/1.
 */
let express = require('express');
let router=express.Router();
let formatReq=require("../util/formatReq");
let rest=require('../model/rest');
let urlHandle=require("../util/urlHandler");
let secret=require('../util/secret');
let util=require('../util/util');
let oauth=require("../util/oauth");
let oauthAuthentication=new oauth();
let {apiUrl}=urlHandle;


router.all("*", formatReq());
router.post("/userInfo/login",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.login},function(req,res,next,resValue){
    if(resValue.status==0||!req.session.access_token){
      req.session.user=resValue.userInfo;
      req.session.access_token=secret.createAccessToken(resValue.userInfo.id);
    }
  });
});

router.post("/userInfo/save",oauthAuthentication.pass(),(req,res,next)=>{
  rest.sendRequest(req,res,next,{url:apiUrl.register},function(req,res,next,resValue){
    if(resValue.status==0){
      req.session.user=resValue.data;
      req.session.access_token=secret.createAccessToken(resValue.userInfo.id);
    }
  });
  //rest.register(req,res,next);
});

router.post("/userInfo/:mobile/sms4Register",oauthAuthentication.pass(),(req,res,next)=>{
  rest.registerSendMsg(req,res,next);
});

router.post("/userInfo/:mobile/sms4ChangePassword",oauthAuthentication.user(),(req,res,next)=>{
  rest.sms4ChangePassword(req,res,next);
});

router.post("/userInfo/verifyCaptcha",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req,res,next,{url:apiUrl.verifyCaptcha});

  //rest.verifyCaptcha(req,res,next);
});

router.post("/userInfo/resetPassword",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req,res,next,{url:apiUrl.resetPass});
  //rest.resetPass(req,res,next);
});

router.post("/userInfo/queryCapplyInfo",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req,res,next,{url:apiUrl.applyInfo},function(req,res,next,resValue){
    if(resValue.status==0){
      req.session.applyInfo=resValue.data;
    }
  });

  //rest.applyInfo(req,res,next);
});

router.post("/addInfoForylpayCapply/addPersonalInfo",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req,res,next,{url:apiUrl.addPersonalInfo},(req,res,next,resValue)=>{
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.personalInfo){
      req.session.applyInfo.personalInfo=util.extend(req.applyInfo.personalInfo,req.body);
    }
  });

  //rest.addPersonalInfo(req,res,next);
});
router.post("/addInfoForylpayCapply/addPropertyInfoForPc",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req,res,next,{url:apiUrl.addPropertyInfo},function(req,res,next,resValue){
    if(resValue==0&&req.applyInfo&&req.applyInfo.houseInfo){
      req.session.applyInfo.houseInfo=util.extend(req.applyInfo.houseInfo,req.body);
    }
  });

  //rest.addPropertyInfo(req,res,next);
});

router.post("/addInfoForylpayCapply/addShopInfoForPc",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req,res,next,{url:apiUrl.addShopInfo},function(req,res,next,resValue){
    if(datas.status==0&&req.applyInfo&&req.applyInfo.shopInfo){
      req.session.applyInfo.shopInfo=util.extend(req.applyInfo.shopInfo,req.body);
    }
  });

  //rest.addShopInfo(req,res,next);
});

router.post("/addInfoForylpayCapply/addRiskInfo",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req,res,next,{url:apiUrl.addRiskInfo},function(req,res,next,resValue){
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.RiskInfo){
      req.session.applyInfo.RiskInfo=util.extend(req.applyInfo.RiskInfo,req.body);
    }
  });

});
//担保信息
router.post("/addInfoForylpayCapply/addEnsureInfo",oauthAuthentication.user(),(req,res,next)=> {
  rest.sendRequest(req, res, next, {url: apiUrl.addEnsureInfo}, function (req, res, next, resValue) {
    if (resValue.status == 0 && req.applyInfo && req.applyInfo.ensureInfo) {
      req.session.applyInfo.ensureInfo = util.extend(req.applyInfo.ensureInfo, req.body);
    }
  });
});
//贷款信息补件
router.post("/addInfoForylpayCapply/addLoanInfo",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req, res, next, {url: apiUrl.addLoanInfo}, function (req, res, next, resValue) {
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.loanInfo){
      req.session.applyInfo.loanInfo=util.extend(req.applyInfo.loanInfo,req.body);
    }
  });

  //rest.addLoanInfo(req,res,next)
});

router.post("/addInfoForylpayCapply/addBankInfo",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req, res, next, {url: apiUrl.addBankInfo}, function (req, res, next, resValue) {
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.bankInfo){
      req.session.applyInfo.bankInfo=util.extend(req.applyInfo.bankInfo,req.body);
    }
  });
});

router.post("/addInfoForylpayCapply/queryEnum",oauthAuthentication.pass(),(req,res,next)=>{
  rest.sendRequest(req, res, next, {url: apiUrl.queryEnum});

  //rest.queryEnum(req,res,next)
});

router.post("/addInfoForylpayCapply/submitApply",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req, res, next, {url: apiUrl.submitApply});
});

router.post("/ylpayCredit/queryCreditInfo",oauthAuthentication.user(),(req,res,next)=>{
  rest.sendRequest(req, res, next, {url: apiUrl.queryCreditInfo});
});

router.post("/ylpayCredit/createCloanWithdraw",oauthAuthentication.user(),(req,res,next)=> {
  rest.sendRequest(req, res, next, {url: apiUrl.createCloanWithdraw});
});

router.post("/ylpayLoanAndBill/queryLoanInfo",oauthAuthentication.user(),(req,res,next)=> {
  rest.sendRequest(req, res, next, {url: apiUrl.queryLoanInfo});
});

router.post("/ylpayLoanAndBill/queryLoanSchedule",oauthAuthentication.user(),(req,res,next)=> {
  rest.sendRequest(req, res, next, {url: apiUrl.queryLoanSchedule});
});

router.post("/ylpayLoanAndBill/createPrepayLoan",oauthAuthentication.user(),(req,res,next)=> {
  rest.sendRequest(req, res, next, {url: apiUrl.createPrepayLoan});
});

router.post("/ylpayLoanAndBill/queryLoanBill",oauthAuthentication.user(),(req,res,next)=> {
  rest.sendRequest(req, res, next, {url: apiUrl.queryLoanBill});
});

router.post("/ylpayLoanAndBill/payLoanBill",oauthAuthentication.user(),(req,res,next)=> {
  rest.sendRequest(req, res, next, {url: apiUrl.payLoanBill});
});

module.exports = router;
