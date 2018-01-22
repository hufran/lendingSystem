var express = require('express');
var path = require('path');
var config=require('./config');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');//图片上传格式处理
var multipartMiddleware = multipart();


var app = express();

// view engine setup
if(process.env.NODE_ENV==="production"){
  app.engine('html',require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', path.join(__dirname, config.prod.assetsViews));
}
console.log("process.env.NODE_ENV:",process.env.NODE_ENV);
var useragent = require('express-useragent');
app.use(useragent.express());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multipartMiddleware);//图片上传处理

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, config.prod.assetsSubDirectory)));
  console.log("进入该处判断了！");
  app.use("/",function(req,res,next){
    console.log("用户发起了index请求");
    res.status(200);
    res.render("index");
  })
}

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS");
  next();
});


// catch 404 and forward to error handler
app.all("*",function(req, res, next) {
  console.log("获取用户数据失败");
  var err = new Error('Not Found');
  err.status = 404;
  res.send("获取用户数据失败");
});
console.log("11111111111111111111111111111111111111111111111111111111111");
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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
