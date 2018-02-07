/**
 * Created by Administrator on 2018/2/2.
 */
let configure=require("../../config");
let crypto=require("crypto");

let createAccessToken=(userId,createTime)=>{
  if(!userId){
    return errs.create({
      status: 400,
      code: 'access_denied',
      message: "Your auth information doesn't contain information of the client you are using."
    });
  }
  if(createTime==null||typeof createTime=="undefined"){
    createTime=new Date();
  }
  let expireDate=new Date(createTime+(process.env.NODE_ENV==="production"?configure.prod.sessionTimeOut:configure.dev.sessionTimeOut)).getTime();

  let shaString=userId+';'+expireDate+';'+configure.prod.secret;

  const cipher = crypto.createCipher('aes192', configure.prod.secret);
  var crypted = cipher.update(shaString, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;

};
let decodeAccessToken=(crypted,userId)=>{
  if(!userId){
    return errs.create({
      status: 400,
      code: 'access_denied',
      message: "Your auth information doesn't contain information of the client you are using."
    });
  }

  const decipher = crypto.createDecipher('aes192', configure.prod.secret);
  var decrypted = decipher.update(crypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  let secretUserId=decrypted.split(';')[0];
  let expireTime=decrypted.split(';')[1];
  let userSecret=decrypted.split(';')[2];
  console.log("11111111111:",decrypted);
  if(secretUserId==userId&&expireTime<=new Date().getTime()&&configure.prod.secret==userSecret){
    return true;
  }else{
    return errs.create({
      status: 400,
      code: 'access_denied',
      message: "Your auth information doesn't contain information of the client you are using."
    });
  }

};
module.exports={createAccessToken,decodeAccessToken};
