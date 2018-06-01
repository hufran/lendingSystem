/**
 * Created by Administrator on 2018/2/2.
 */
let crypto=require("crypto");
let configure=require("../../config");
let errs = require('errs');
let secret=process.env.NODE_ENV==="production"?configure.prod.secret:configure.dev.secret;

let formatReq=()=>{
  return (req,res,next)=>{
    console.log("formatReq中的req.session:",req.session);
    if(typeof req.session.user !="undefined"&&req.session.user !=null&&req.session.user!=""&&req.session.user!=[]){
      req.user=req.session.user;
      req.authPass = true;
      req.authInfo=req.session.authInfo;
      req.applyInfo=req.session.applyInfo;
      req.accessToken=req.session.access_token;
    }
    next();
  }

};

module.exports=formatReq;
