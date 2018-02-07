/**
 * Created by Administrator on 2018/2/1.
 */
let secret=require('../util/secret');
let util=require('../util/util');
let event=require('../util/event');
let urlHandle=require("../util/urlHandler");
let baseUrl=urlHandle.baseUrl;

let {apiUrl}=urlHandle;

class rest{
  constructor(){
  }

  registerSendMsg(req,res,next){
    //注册时获取验证码端口
    let mobile=req.params.mobile;
    console.log("mobile1111111:",mobile);
    if(/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile)){
      let param=req.body;
      let options={
        url:apiUrl.registerSendMsg,
        urlParam:{baseUrl:baseUrl,mobile:mobile},
        method:"POST",
        form:param
      };
      try{
        util.createRequest(options,(err,resp,datas)=>{
          var resValue=JSON.parse(datas);
          res.send(resValue);
          return;
        });
      }catch(err){
        next(new event.eventError(500,err,null,"Server exception"));
      }
    }else{
      next(new event.eventError(400,"The mobile parameter format is not correct.",null,"mobile error"));
    }

  }

  sms4ChangePassword(req,res,next){
    //找回密码发送验证码接口
    let mobile=req.params.mobile;
    console.log("mobile1111111:",mobile);
    if(/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile)){
      let options={
        url:apiUrl.findMsg,
        urlParam:{baseUrl:baseUrl,mobile:mobile},
        method:"POST"
      };
      try{
        util.createRequest(options,(err,resp,datas)=>{
          var resValue=JSON.parse(datas);
          res.send(resValue);
          return;
        });
      }catch(err){
        next(new event.eventError(500,err,null,"Server exception"));
      }
    }else{
      next(new event.eventError(400,"The mobile parameter format is not correct.",null,"mobile error"));
    }

  }

  sendRequest(req,res,next,optionValue,fn){
    let {url,urlParam,method="POST"}=optionValue;
    if(url==""||typeof url=="undefined"){
      next(new event.eventError(500,"Your auth information doesn't contain information of the client you are using.",null,"access_denied"));
      return;
    }
    let param=req.body;
    let options={
      url:url,
      urlParam:urlParam||{baseUrl:baseUrl},
      method:method,
      headers:req.headers,
      form:param
    };
    try{
      util.createRequest(options,(err,resp,datas)=>{
        var resValue=JSON.parse(datas);
        console.log("resValue111:",resValue);
        if(typeof fn =="function"){
          fn.call(this,req,res,next,resValue);
        }
        res.send(resValue);
        return;
      });
    }catch(err){
      next(new event.eventError(500,err,null,"Server exception"));
    }
  }
  checkToken(req,res,next){
    console.log("req.session1111111:",req.session);
    if(!req.accessToken||req.accessToken.length<=0||!req.cookies.token){

      delete req.session.access_token;
      delete req.session.user;
      delete req.session.authInfo;
      delete req.accessToken;
      next(new event.eventError(403,"Your auth information doesn't contain information of the client you are using.",null,"access_denied"));
    }else{
      let result=secret.decodeAccessToken(req.accessToken,req.user.id);
      if(result==true){
        return;
      }else{
        next(result);
      }
    }
  }
  sendSessionInfo(req,res,next){
    res.send(new event.event("查询成功",{userinfo:req.user,applyInfo:req.applyInfo}));
  }
}

module.exports=new rest();
