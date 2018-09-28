'use strict' //设置为严格模式
const express = require('express')
var passport = require('passport')
var bodyParser = require('body-parser');

const app = express()
var Strategy = require('../lib').Strategy

//将body转为json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//token验证
passport.use(new Strategy(function (token, done) {
    //token验证并返回对象实体
    console.log('token', token);
    done(null, { "name": "hellokitty" });
}));

//中间件
app.use(passport.authenticate('token-signature'));



app.get('/test', function (req, res) {
    res.send('hellokitty');
});
app.post('/test', function (req, res) {
    res.send('hellokitty');
});

module.exports = app.listen(8888, () => console.log('Example app listening on port 3000!'))