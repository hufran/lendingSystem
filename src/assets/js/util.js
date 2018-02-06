/**
 * Created by Administrator on 2018/2/5.
 */
class util{
  constructor(){}
  checkObjectIsEmpty(obj){
    /*检查对象是否为空*/
    if(obj){
      let key;
      for(key in obj){
        return false;
      }
      return true;
    }
    return true;
  }
  selectValueForObject(obj=[],value=""){
    if(obj.length<=0){
      return "";
    }else{
      for(let key in obj){
        if(obj[key].value==value){
          return obj[key].code;
        }
      }
      return "";
    }
  }
}
let utilFun=new util();
export {
  utilFun as util
}
