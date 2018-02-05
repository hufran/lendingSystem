var _ = require('lodash')
var ef = require('errto')
var debug = require('debug')('auth')
var errs = require('errs')
var rest=require('../model/rest')

var proto = {};

//auth.pass() 永远让匿名用户可访问
proto.pass = function () {
  return function (req, res, next) {
    req.authPass = true;
    next();
  }
}

//带有客户端信息的请求可通过
proto.client = function () {
  return this(function (req) {
    if (req.authInfo && req.authInfo.client) {
      return true;
    } else {
      return errs.create({
        status: 403,
        code: 'access_denied',
        message: "Your auth information doesn't contain information of the client you are using."
      });
    }
  });
}

//带有 req.user 信息的请求可通过
proto.user = function () {
  return this(function (req,res,next) {
    rest.checkToken(req,res,next);
    if (req.user && ['null', '{}'].indexOf(JSON.stringify(req.user)) == -1) {
      return true;
    } else {
      return errs.create({
        status: 403,
        code: 'access_denied',
        message: "You must sign in to get this resource."
      });
    }
  });
}

//当用户带有的 scopes 与接口需要的 scopes 有重合的时候可通过
proto.scope = function () {
  var scopes = _.flatten(arguments);
  return this(function (req) {
    if (req.authInfo && _.intersection(scopes, req.authInfo.scope || []).length) {
      return true;
    } else {
      return errs.create({
        status: 403,
        code: 'access_denied',
        message: "You are not allowed to get this resource."
      });
    }
  });
}

//如果你的 url 设置的是 app.get('/api/user/:userId/privacy')
//auth.owner() 会让 userId 与当前访问用户匹配的用户通过
proto.owner = function () {
  return this(function (req) {
    if (req.user && req.user.id === req.params.userId) {
      return true;
    } else {
      return errs.create({
        status: 403,
        code: 'access_denied',
        message: "This is not your own resource."
      });
    }
  });
}

//auth() 让调用者设定自己的验证逻辑，与 auth.bearer() 不一样的是不需要通过 bearer middleware 从 token 获取用户身份
exports = module.exports = function (preauth) {
  var nopreauth = function nopreauth(fn) {
    return function (req, res, next) {
      if (req.authPass) return next(); //可能已经做过验证了
      debug('req.params: %j', req.params);
      debug('req.url: %s', req.url);
      debug('req.user: %j', req.user);
      debug('req.authInfo: %j', req.authInfo);
      result = fn(req);
      if (result instanceof Error) {
        next(result);
      } else {
        req.authPass = !!result;
        next();
      }
    }
  }
  var auth = function (fn) {
    var authfn = nopreauth(fn);
    return function (req, res, next) {
      auth.preauth(req, res, ef(next, authfn.bind(null, req, res, next)));
    }
  }
  auth.nopreauth = nopreauth;
  auth.preauth = preauth || function (req, res, next) { next(); };
  _.extend(auth, proto);
  return auth;
}
