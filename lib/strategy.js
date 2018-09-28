'use strict' //设置为严格模式
var tokenAuth = require('./tokenAuth');
var passport = require('passport-strategy')
  , util = require('util')
  , bitauth = require('bitauth');

function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('DigitalSignatureStrategy requires a verify callback'); }
  passport.Strategy.call(this);
  this.name = 'token-signature';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}
/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

function errInfo(codeContent, codeMessage = null, codeValue = 401) {
  var e = new Error(codeMessage || 'Token Sign Error');
  e.status = e.statusCode = codeValue;
  e.code = codeContent;
  return e;
}

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} request
 * @api protected
 */
Strategy.prototype.authenticate = function (req, options) {
  options = options || {};
  var self = this;
  function verified(err, client) {
    if (err) { return self.error(errInfo(-1, "token handle error")); }
    //token检查结果存在
    if (client) {
      // keyId不存在
      if (!client.check) { return self.error(errInfo(1006, "token is error")); }
      if (client.next) {
        //时间戳timestamp、keyId和数字签名值sign 三个参数必传 
        if (!req.query || !req.query.sign || !req.query.timestamp || !req.query.token) {
          return self.error(errInfo(1005, "sign timestamp token  is require"));
        }
        var timestamp = req.query.timestamp;
        var now = new Date().getTime();
        //timestamp 必须是10位或者13位
        if (timestamp.length != 10 && timestamp.length != 13) {
          return self.error(errInfo(1001, "timestamp length is 10 or 13"));
        } else if (timestamp.length == 10) {
          timestamp = timestamp * 1000;
        }
        let grap = now - timestamp;
        //timestamp 3分钟内有效
        if (grap > 3 * 60 * 1000 || grap <= 0) {
          return self.error(errInfo(1001, "timestamp timeout"));
        }
        // 获取排序参数
        var params = tokenAuth.getVerifyParams(req.query, req.body, req.method);
        // console.log('params finished', params);
        // 获取正确签名
        var signVerfied = tokenAuth.getSign(params);
        // console.log('signVerfied', signVerfied);
        var sign = req.query.sign;
        var flag = false;
        flag = signVerfied == sign ? true : false
        // console.log('signVerfied == sign', signVerfied, sign);
        if (!flag) {
          return self.error(errInfo(1002, "token sign error"));
        }
      }
    }
    self.pass();
  }

  var token = '';
  if (req.query) {
    token = req.query.token;
  }
  if (self._passReqToCallback) {
    this._verify(req, token, verified);
  } else {
    this._verify(token, verified);
  }
};
/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
