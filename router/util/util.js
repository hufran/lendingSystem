/**
 * Created by Administrator on 2017/2/22.
 */
var request = require('request');
var syncRequest = require('sync-request');
var utils={
    extend:function(obj,newObj){
      if(!this.checkObjectIsEmpty(obj)||!this.checkObjectIsEmpty(newObj)){
        return {};
      }else{
        for(var key in newObj){
          obj[key]=newObj[key];
        }
        return obj;
      }
    },
    checkObjectIsEmpty:function(obj){
        /*检查对象是否为空*/
        if(obj){
            var key;
            for(key in obj){
                return false;
            }
            return true;
        }
        return true;
    },
    bind: function (fn, selfObj) { //修改指定函数作用域
        if (fn.bind) {
            return fn.bind(selfObj);
        } else {
            return function () {
                fn.apply(selfObj, arguments);
            }
        }
    },
    inherits: function (child, parent) { //继承
        child.prototype = new parent();
        child.prototype.constructor = child;
    },
    analyzetpl:function(url,json){

        if(typeof url=="undefined"||typeof json=="undefined"){
            return url;
        }

        return url.replace(/\{(.*?)\}/ig,function(){
            if(typeof json[arguments[1]]=="undefined"){
                return ""
            }
            return json[arguments[1]];
        });
    },
    createRequest:function(options,fn){
        if(!this.checkObjectIsEmpty(options)){
            if(typeof options["url"] !="undefined"&&options["url"].length>0){
                var url;
                if(typeof options["urlParam"] !="undefined"&&!this.checkObjectIsEmpty(options["urlParam"])){

                    url=this.analyzetpl(options["url"],options["urlParam"]);
                    options.url=url;
                    delete  options["urlParam"];
                }
                console.log("options:",options);
                request(options,fn);
                console.log("11111111111");
            }
        }
    },
    createSyncRequest:function(options,fn){
        if(!this.checkObjectIsEmpty(options)){
            if(typeof options["url"] !="undefined"&&options["url"].length>0){

                var url=options["url"];
                if(typeof options["urlParam"] !="undefined"){
                    url=this.analyzetpl(options["url"],options["urlParam"]);
                    delete options["urlParam"];
                }

                var method="GET";//没有指定默认为get
                if(typeof options["method"]!="undefined"&&options["method"].length>0){
                    method=options["method"]
                }
                fn(syncRequest(method,url));
            }
        }
    },
    checkDeviceType:function(useragent){

        if(useragent.isiPad||useragent.isiPod||useragent.isiPhone||useragent.isMac){
            return "Ios"
        }else if(useragent.isAndroid||useragent.isBlackberry||useragent.isSamsung||useragent.isRaspberry){
            return "Android";
        }else{
            return "MWeb";
        }
    },
    cookieParse:function(req,res){
        var cookie=req.headers.cookie,cookies={};

        if(typeof cookie=="undefined"){//第一次登陆没有cookie
            return null;
        }else{
            var ccatArr=cookie.split(';');//将cookie根据’；‘分成数组
            for ( var i = 0; i < ccatArr.length; i++) {//循环cookie的数组
                var pattern=ccatArr[i].split("=");
                var values=pattern[0].trim();
                cookies[values]=pattern[1];
            };
            return cookies;
        }

    },
    createMandomString:function(len){
        var str="abcdefghigklmnopqrstwvuxyzABCDEFGHIGKLMNOPQRSTWVUXYZ0123456789";
        len=len||16;var length=str.length-1;
        var randomString="";
        for(var i=0;i<len;i++){
            randomString+=str.substr(Math.random()*length,1)
        }
        return randomString;
    },
    percentEncode:function(strUrl){
        strUrl=encodeURIComponent(strUrl);
        return strUrl.replace('+','%20').replace("*","%2A").replace("%7E",'~');
    }
};
module.exports=utils;
