var express = require('express');
var config = require('./config.js');
var path = require('path');
// var router1 = require('./router1.js');

var router = require('./router.js');

var app = express();

// express配置模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

// express配置bodyParser解析请求报文体
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const jsonParser = bodyParser.json();


// express 配置路由
// router1(app);  // 这种方法不安全
// 应该这么做
// app.use('/', router)
// 等价于
app.use(router)


// 处理错误请求
app.use(function (req, res, next) {
    res.send('not found 404').status(404)
})

app.listen(config.port, function () {
    console.log('http:localhost:' + config.port)
})