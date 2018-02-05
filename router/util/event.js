/**
 * Created by Administrator on 2018/2/1.
 */
let errs = require('errs');
let events=require('events').EventEmitter;

class event extends events{
  constructor(msg,extraData){
    super();

    return {
      msg:msg,
      status:200,
      extraData:extraData
    };
  }
}
class eventError extends event{
  constructor(status,msg,extraData,code){
    super(msg,extraData);
    return errs.create({
      extraData:extraData,
      status:status,
      msg:msg,
      code:code
    });
  }
}

module.exports={event,eventError};
