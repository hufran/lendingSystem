/**
 * Created by Administrator on 2018/2/1.
 */
let express = require('express');
let router=express.Router();
var os=require("os");
var fs=require("fs");
global.urlHandle=require("../util/urlHandler");
let formatReq=require("../util/formatReq");
let rest=require('../model/rest');
let secret=require('../util/secret');
let util=require('../util/util');
let oauth=require("../util/oauth");
let oauthAuthentication=new oauth();
let event=require('../util/event');
let {apiUrl,extraUrl}=global.urlHandle;
let first=0;

router.all("*", formatReq(),function(req,res,next){
  if(process.env.NODE_ENV==="production"&&first==0){
    var netWork=os.networkInterfaces();
    for(var key in netWork){
      for(var i= 0,len=netWork[key].length;i<len;i++){
        if(netWork[key][i]["family"]==="IPv4"){
          console.log('netWork[key][i]["family"]:',netWork[key][i]["family"]==="IPv4"&&netWork[key][i]["address"]==="10.4.33.251");
        }
        if(netWork[key][i]["family"]==="IPv4"&&netWork[key][i]["address"]==="10.4.33.251"){
          global.urlHandle.baseUrl="http://127.0.0.1:9999/";
        }
      }
    }
    console.log("global.baseUrl222222:",global.urlHandle.baseUrl);
    first=1;
  }
  next();
});

router.post("/getSessionInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendSessionInfo(req,res,next);
});

router.post("/userInfo/login",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.login},function(req,res,next,resValue){
    if(resValue.status==0||!req.session.access_token){
      req.session.user=resValue.userInfo;
      if(resValue.userInfo){
        req.session.access_token=secret.createAccessToken(resValue.userInfo.id);
      }
    }
  });
});

//新接口自动登录用户
router.post("/ylpayHfiveUser/telphoneLogin",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.autoLogin},function(req,res,next,resValue){
    if(resValue.status==0){
      req.session.user=resValue.userInfo;console.log("req.session:",req.session);
      if(resValue.userInfo){
        req.session.access_token=secret.createAccessToken(resValue.userInfo.id);
      }
    }
  });
});



router.post("/userInfo/save",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.register},function(req,res,next,resValue){
    if(resValue.status==0){
      console.log("resValue:",resValue);
      req.session.user=resValue.data;
      req.session.access_token=secret.createAccessToken(resValue.data.id);
    }
  });
});

router.post("/userInfo/:mobile/sms4Register",oauthAuthentication.pass(),function(req,res,next){
  rest.registerSendMsg(req,res,next);
});

router.post("/userInfo/:mobile/sms4ChangePassword",oauthAuthentication.pass(),function(req,res,next){
  rest.sms4ChangePassword(req,res,next);
});

router.post("/userInfo/verifyCaptcha",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.verifyCaptcha});

});

router.post("/userInfo/resetPassword",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.resetPass});
});

router.post("/addInfoForylpayCapply/queryCapplyInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.applyInfo},function(req,res,next,resValue){
    if(resValue.status==0){
      req.session.applyInfo=resValue.data;
    }
  });

});

router.post("/addInfoForylpayCapply/addPersonalInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.addPersonalInfo},function(req,res,next,resValue){
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.personalInfo){
      req.session.applyInfo.personalInfo=util.extend(req.applyInfo.personalInfo,req.body);
    }
  });

});
router.post("/addInfoForylpayCapply/addPropertyInfoForPc",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.addPropertyInfo},function(req,res,next,resValue){
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.houseInfo){
      req.session.applyInfo.houseInfo=util.extend(req.applyInfo.houseInfo,req.body);
    }
  });

});

router.post("/addInfoForylpayCapply/addShopInfoForPc",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.addShopInfo},function(req,res,next,resValue){
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.shopInfo){
      req.session.applyInfo.shopInfo=util.extend(req.applyInfo.shopInfo,req.body);
    }
  });

});

router.post("/addInfoForylpayCapply/addRiskInfoForPcOrH5",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req,res,next,{url:apiUrl.addRiskInfo},function(req,res,next,resValue){
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.RiskInfo){
      req.session.applyInfo.RiskInfo=util.extend(req.applyInfo.RiskInfo,req.body);
    }
  });

});
//担保信息
router.post("/addInfoForylpayCapply/addEnsureInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.addEnsureInfo}, function (req, res, next, resValue) {
    if (resValue.status == 0 && req.applyInfo && req.applyInfo.ensureInfo) {
      req.session.applyInfo.ensureInfo = util.extend(req.applyInfo.ensureInfo, req.body);
    }
  });
});
//贷款信息补件
router.post("/addInfoForylpayCapply/addLoanInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.addLoanInfo}, function (req, res, next, resValue) {
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.loanInfo){
      req.session.applyInfo.loanInfo=util.extend(req.applyInfo.loanInfo,req.body);
    }
  });
});

router.post("/addInfoForylpayCapply/addBankInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.addBankInfo}, function(req, res, next, resValue){
    if(resValue.status==0&&req.applyInfo&&req.applyInfo.bankInfo){
      req.session.applyInfo.bankInfo=util.extend(req.applyInfo.bankInfo,req.body);
    }
  });
});

router.post("/addInfoForylpayCapply/queryEnum",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.queryEnum});

});

router.post("/addInfoForylpayCapply/submitApply",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.submitApply});
});

router.post("/ylpayCredit/queryCreditInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.queryCreditInfo});
});

router.post("/ylpayCredit/createCloanWithdraw",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.createCloanWithdraw});
});

router.post("/ylpayHfive/createCloanWithdrawHfive",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.createCloanWithdrawHfive});
});

router.post("/ylpayLoanAndBill/queryLoanInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.queryLoanInfo});
});

router.post("/ylpayLoanAndBill/queryLoanSchedule",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.queryLoanSchedule});
});

router.post("/ylpayLoanAndBill/createPrepayLoan",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.createPrepayLoan});
});

router.post("/ylpayLoanAndBill/queryLoanBill",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.queryLoanBill});
});

router.post("/ylpayLoanAndBill/payLoanBill",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.payLoanBill});
});

router.post("/ylpayLoanAndBill/queryCustomerInfo",oauthAuthentication.pass(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.queryCustomerInfo});
});

router.post("/ylpayLoanAndBill/queryCustomerAmount",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.queryCustomerAmount});
});

router.post("/lccb/openAccount",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.openAccount});
});

router.post("/lccb/customerRecharge",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.customerRecharge});
});

router.post("/lccb/customerEnchashment",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.customerEnchashment});
});

router.post("/lccb/customerAmountRecoed",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.customerAmountRecoed});
});

router.post('/addInfoForylpayCapply/delManyPic',oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.delManyPic});
});

router.post('/addInfoForylpayCapply/addPic',oauthAuthentication.user(),function(req,res,next){
  var form={"loginName":req.body.loginName};
  var files=req.files;
  for(var key in files){
    form[key]=fs.createReadStream(req.files[key].path);
  }
  rest.sendRequest(req, res, next, {url: apiUrl.addPic},null,form);
});

router.post("/loginOut",oauthAuthentication.pass(),function(req,res,next){
  rest.loginOut(req,res,next);
});



//新接口查询云联申请进件额度信息
router.post("/ylpayHfive/queryApplyInfo",oauthAuthentication.user(),function(req,res,next){
  rest.sendRequest(req, res, next, {url: apiUrl.ylLimit});
});


//251获取数据(访问非登陆状态下的接口)
router.get("/category/:category/name/:name",oauthAuthentication.pass(),function(req,res,next){
  if(req.params.category.length>0&&req.params.name.length>0){
    console.log("req.params.name:",req.params.name);
    rest.sendRequest(req, res, next, {url: apiUrl.getArticle,method:'GET',urlParam:{baseUrl:extraUrl.articleUrl,category:req.params.category,name:req.params.name}});
  }else{
    res.send(new event.eventError(400,"category or name parameter exceptions.",null,"The parameters you requested are not complete."));
  }

});

//251获取数据 获取理财合同列表
router.post("/findContractByRequestId/:requestId",oauthAuthentication.user(),function(req,res,next){
  if(req.params.requestId.length>0){
    console.log("req.params.requestId:",req.params.requestId);
    rest.sendRequest(req, res, next, {url: apiUrl.findContract,method:'POST',urlParam:{baseUrl:extraUrl.articleUrl,requestId:req.params.requestId}});
  }else{
    res.send(new event.eventError(400,"requestId =parameter exceptions.",null,"The parameters you requested are not complete."));
  }
});

//251获取数据 获取合同信息
router.post("/compact/:segment",oauthAuthentication.user(),function(req,res,next){
  if(req.params.segment.length>0){
    console.log("req.params.segment:",req.params.segment);
    rest.sendRequest(req, res, next, {url: apiUrl.getCompct,method:'POST',urlParam:{baseUrl:extraUrl.articleUrl,requestId:req.params.segment}});
  }else{
    res.send(new event.eventError(400,"requestId parameter exceptions.",null,"The parameters you requested are not complete."));
  }
});

/*router.all('*',function (req,res,next) {
  res.send(new event.eventError(404,"Invalid request",null,"Invalid request"));
});*/

module.exports = router;
