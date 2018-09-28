# token-signature
token 添加数字签名

## Install

    $ npm install https://github.com/xcyxiner/passport-digital-signature.git

## Usage

```
var Strategy = require('token-signature').Strategy

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
```

## test

```
./node_modules/mocha/bin/mocha test/reqtest.js
```

输出如下所示

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
