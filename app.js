var express = require('express');
var path = require('path');
var config=require('./config');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');//图片上传格式处理
var session=require('express-session');
var FileStore = require('session-file-store')(session);
var multipartMiddleware = multipart();
var app = express();

if(process.env.NODE_ENV==="production"){
  app.engine('html',require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, config.prod.assetsViews));
}

var useragent = require('express-useragent');
app.use(useragent.express());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:"1346e3df95aae99d8dca79932d9a74a3",
  saveUninitialized: true,
  cookie:{maxAge:process.env.NODE_ENV==="production"?config.prod.sessionTimeOut:config.dev.sessionTimeOut,secure:false},//设置过期时间
  resave: false,
  store:new FileStore({reapInterval:-1,path : "./router/session",ttl:process.env.NODE_ENV==="production"?config.prod.sessionTimeOut:config.dev.sessionTimeOut})
}));
app.use(multipartMiddleware);//图片上传处理


//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  next();
});


if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, config.prod.assetsSubDirectory)));
  app.get("/",function(req,res,next){
    console.log("用户发起了index请求");
    res.status(200);
    res.render("index");
  })
}
var ctrl=require("./router/controller");
app.use('/rest',ctrl);




// catch 404 and forward to error handler
app.all("*",function(req, res, next) {
  res.status(404);
  res.render("index");
});
//express不崩
process.on('uncaughtException', function (err) {
  console.log(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  delete err.stack;
  delete err.name;
  res.status(err.status || 500);
  if(res.endParam){
    return;
  }
  try{
    res.send(err);
  }catch(err){
  }
});

module.exports = app;
