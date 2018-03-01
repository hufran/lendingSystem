/**
 * Created by Administrator on 2018/3/1.
 * node service 服务,通过参数接受处理服务启动以及暂停
 */
var childProcess=require('child_process');
var spwan=childProcess.spawn;
var exec=childProcess.exec;
var config=require('../config').prod;
var path=require('path');
var argv=process.argv;
var file=require('fs');

console.log(argv);
function startService(){
  console.log('pid:',process.pid);
  exec('netstat -ano |grep '+config.port,{encoding:'utf8'},function(err,stdout,stderr){
    if(err){
      //查询端口不存在
      var spwanObj=spwan(process.execPath,[path.join(__dirname,'www'),'production'],{cwd:process.cwd(),silent:true,detached:true,encoding: 'utf-8'});//.unref()
      spwanObj.stdout.on('data',function(chunk){
        console.log(chunk.toString('utf8'));
      });
      spwanObj.stderr.on('data',function(data){
        console.log(data.toString('utf8'));
      });
      spwanObj.on('close',function(code){
        stopService();
        console.log('close code : ' + code);
      });
      spwanObj.on('exit',function(code) {
        stopService();
        console.log('exit code : ' + code);
      })
      return
    }else{
      //端口存在
      console.log(stdout);
      console.log("The service is started, and if you need to close the service, pass the stop parameter.");
    }

  })

}

function stopService(fn){
  file.readdir(path.join(__dirname,'proc/'),function(err,files){
    if(err){
      console.log("Close the service exception.")
      console.log(err);
      return
    }
    if(files.length>0){
      files.forEach(function(fil){
        console.log(fil);
        process.kill(fil);
        file.rmdir('./proc/'+fil,function(err){
          if(err){
            return
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

