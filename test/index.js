'use strict' //设置为严格模式
const express = require('express')
var passport = require('passport')
var bodyParser = require('body-parser');

const app = express()
var Strategy = require('../lib').Strategy

//将body转为json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//token验证,需要传递req时
passport.use(new Strategy(
    {
        passReqToCallback: true
    }, function (req, token, done) {
        //token验证并返回对象实体,check=token检查结果，next=是否继续后续签名验证
        done(null, {
            check: true,
            next: true
        });
    }));

//token验证
// passport.use(new Strategy(function (token, done) {
//     //token验证并返回对象实体,check=token检查结果，next=是否继续后续签名验证
//     done(null, {
//         check: true,
//         next: true
//     });
// }));

//中间件
app.use(passport.authenticate('token-signature'));



app.get('/test', function (req, res) {
    res.send('hellokitty');
});
app.post('/test', function (req, res) {
    res.send('hellokitty');
});

module.exports = app.listen(8888, () => console.log('Example app listening on port 3000!'))