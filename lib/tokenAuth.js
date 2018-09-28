'use strict' //设置为严格模式
var crypto = require('crypto');


/**
* 获取签名
*/
exports.getSign = function (data) {
    if (data && data.length > 0) {
        var buf = new Buffer(data);
        var str = buf.toString('binary');
        let md5Str = crypto.createHash('sha1').update(str).digest('hex');
        return md5Str.toUpperCase();
    }
}



/**
* 获取参数字符串 ascall码排序
*/
exports.getVerifyParams = function (params, body = {}, method = 'GET') {
    var sPara = [];
    if (!params) return null;
    for (var key in params) {
        if ((!params[key]) || key == "sign") {
            continue;
        };
        sPara.push([key, params[key]]);
    }

    if (method == "POST" || method == "PUT") {
        if (body != null & body != undefined) {
            var bodyJson = JSON.stringify(body);
            if (bodyJson.length > 0) {
                sPara.push(['body', bodyJson]);
            }
        }
    }
    sPara = sPara.sort();
    var prestr = '';
    for (var i2 = 0; i2 < sPara.length; i2++) {
        var obj = sPara[i2];
        if (i2 == sPara.length - 1) {
            prestr = prestr + obj[0] + '=' + obj[1] + '';
        } else {
            prestr = prestr + obj[0] + '=' + obj[1] + '&';
        }
    }
    // prestr += '&key=' + params.token;
    return prestr;
};