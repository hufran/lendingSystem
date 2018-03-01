/**
 * Created by Administrator on 2018/3/1.
 * node service 服务,通过参数接受处理服务启动以及暂停
 */
let childProcess=require('child_process');
let spwan=childProcess.spawn;
let exec=childProcess.exec;
let config=require('../config').prod;
let argv=process.argv;
let file=require('fs');

console.log(argv);
function startService(){
  console.log('pid:',process.pid);
  exec('netstat -ano |grep '+config.port,{encoding:'utf8'},(err,stdout,stderr)=>{
    if(err){
      //查询端口不存在
      let spwanObj=spwan(process.execPath,['www','production'],{cwd:process.cwd(),silent:true,detached:true,encoding: 'utf-8'}).unref();
      spwanObj.stdout.on('data',(chunk)=>{
        console.log(chunk.toString('utf8'));
      });
      spwanObj.stderr.on('data',(data)=>{
        console.log(data.toString('utf8'));
      });
      spwanObj.on('close',(code)=>{
        stopService();
        console.log('close code : ' + code);
      });
      spwanObj.on('exit',(code) => {
        stopService();
        console.log('exit code : ' + code);
      })

    }else{
      //端口存在
      console.log("The service is started, and if you need to close the service, pass the stop parameter.");
    }

  })

}

function stopService(fn){
  file.readdir('./proc/',(err,files)=>{
    if(err){
      console.log("Close the service exception.")
    }
    if(files.length>0){
      files.forEach((fil)=>{
        console.log(fil);
        process.kill(fil);
        file.rmdir('./proc/'+fil,(err)=>{
          if(err){
            console.log(err);
          }
        })
      });
      if(fn){fn.call(this)}
      console.log('The server has been shut down.');
    }else{
      console.log("The server is not started.");
    }

  });
}
if(argv[2]){
  switch(argv[2]){
    case "start":
      startService();
      break;
    case "stop":
      stopService();
      break;
    case "reload":
      stopService(startService);
      break;
    default:
      console.log("The instruction you entered is incorrect.");
      break;
  }
}else{
  console.log("You need to specify the parameters to start the service.");
}

