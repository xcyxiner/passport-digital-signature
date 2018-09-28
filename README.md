# token-signature
token add signature

## Install

    npm install token-signature

## Usage

```
var Strategy = require('token-signature').Strategy

//covert body to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//token check by req
passport.use(new Strategy(
    {
        passReqToCallback: true
    }, function (req, token, done) {
        //token check,check=token check result，next=continue signature handle
        done(null, {
            check: true,
            next: true
        });
    }));

//token check
// passport.use(new Strategy(function (token, done) {
//     //token check,check=token check result，next=continue signature handle
//     done(null, {
//         check: true,
//         next: true
//     });
// }));

//express loopback middleware
app.use(passport.authenticate('token-signature'));
```

## test

```
./node_modules/mocha/bin/mocha test/reqtest.js
```

console log

```
Example app listening on port 3000!
  get /test
token hello
    ✓ respond with json

  post /test
token hello
    ✓ respond with json


  2 passing (65ms)
```

## link

* [nodejs api实现数字签名验证](http://www.icafebolger.com/nodejs/nodeapipassportdigital.html)
* [TOKEN+签名验证](https://www.cnblogs.com/Leo_wl/p/5982927.html)
* [关于JWT 和Token](https://blog.csdn.net/hzlnice/article/details/80906465)
* [App开放接口api安全性—Token签名sign的设计与实现](https://www.cnblogs.com/softidea/p/5836967.html)
* [RESTful Api 身份认证中的安全性设计探讨](https://mengkang.net/625.html)
* [Node JWT/jsonwebtoken 使用与原理分析](https://www.jianshu.com/p/a7882080c541)

## License

The MIT License (MIT)

Copyright (c) 2014 John Henry john@iamjohnhenry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
