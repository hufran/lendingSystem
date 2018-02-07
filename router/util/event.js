/**
 * Created by Administrator on 2018/2/1.
 */
let errs = require('errs');
let events=require('events').EventEmitter;

class event extends events{
  constructor(msg,data,extraData){
    super();

    return {
      message:msg,
      data:data,
      status:0,
      extraData:extraData
    };
  }
}
class eventError extends event{
  constructor(status,msg,extraData,code,data){
    super(msg,data,extraData);
    return errs.create({
      extraData:extraData,
      status:status,
      message:msg,
      code:code,
      data:data
    });
  }
}

module.exports={event,eventError};
