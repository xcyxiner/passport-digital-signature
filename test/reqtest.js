'use strict' //设置为严格模式
var assert = require('assert');
var should = require('should');
var app = require('./index')
var request = require('supertest')(app);
// var request = require('supertest')("http://localhost:8888");
var tokenAuth = require('../lib').TokenAuth
describe('get /test', function () {
    it('respond with json', function (done) {

        var now = new Date().getTime();
        var params = {
            "name": "hellokitty",
            "token": 'hello',
            "timestamp": now,
            "sign": ''
        };
        var signParam = tokenAuth.getVerifyParams(params);
        params.sign = tokenAuth.getSign(signParam);
        request
            .get('/test')
            .query(params)
            .expect(200).
            end(function (err, res) {
                should.not.exist(err);
                if (res) {
                    assert.equal(res.status, 200);
                }
                done();
            })
    })
})
describe('post /test', function () {
    it('respond with json', function (done) {

        var now = new Date().getTime();
        var params = {
            "token": 'hello',
            "timestamp": now,
            "sign": ''
        };
        var bodydata = { "age": 99 };
        var signParam = tokenAuth.getVerifyParams(params, bodydata, "POST");
        params.sign = tokenAuth.getSign(signParam);
        request
            .post('/test')
            .query(params)
            .send(bodydata)
            .expect(200)
            .end(function (err, res) {
                should.not.exist(err);
                if (res) {
                    assert.equal(res.status, 200);
                }
                done();
            })
    })
})

