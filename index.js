var express = require('express');
var config = require('./config.js');
var path = require('path');
var ejs = require('ejs');
// var router1 = require('./router1.js');

var router = require('./router.js');

console.log('当前进程所在目录', process.cwd())
console.log('当前进程所起项目名称', process.argv[3])


var app = express();

// express配置模板引擎
app.set('views', path.join(__dirname, 'views'))
// 以下设置，只能使用模板后缀为.ejs的
// app.set('view engine', 'ejs');

// 2019-08-12 添加
// 以下两行的写法，可以是模板继续使用.html后缀
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
// "__express是ejs模块的一个公共属性，表示渲染的文件扩展名"


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


