var path = require('path');
var fs = require('fs');
var config = require('./config.js');

// 其实 handler.js 做的事情就是 controller做的事情，处理具体的业务
// 只不过将handler.js 拆分成不同业务模块
module.exports.index = function (req, res) {
    // res.sendFile() 不建议使用，因为要对 html中模板代码进行执行并替换
    // res.sendFile(path.join(__dirname, 'views', 'index.html'))

    // res.render() 必须配置了模板才能使用
    // 要给express配置个模板引擎，就可以使用了

    // ejs.renderFile(path.join(__dirname, 'views', 'index.html'), {title: '首页', list: list}, function (err, result) {
    //     if (err) {
    //         throw err
    //     }

    //     res.send(result)
    // })
   
    readData(config.dataPath, function (list) {
        list = list || [];
        res.render(path.join(__dirname, 'views', 'index.html'), {title: '首页', list: list})
    })
}

module.exports.submit = function (req, res) {
    res.render(path.join(__dirname, 'views', 'submit.html'), {title: '表单提交'})
}


module.exports.detail = function (req, res) {
    console.log('参数', req.params)  // {id: '2'}

    readData(config.dataPath, function (data) {
        
        var list = data;
        var item = {};

        for (var i = 0; i < list.length; i++) {
            if (list[i].id === Number(req.params.id)) {
                item = list[i]
                break;
            }
        }

        console.log('item', item)

        res.render(path.join(__dirname, 'views', 'detail.html'), {title: '详情', item: item})
    })
}

module.exports.addget = function (req, res) {
    // get方式请求
    readData(config.dataPath, function (data) {
        
        var list = data || [];
        var userData = req.query;
        userData.id = list.length + 1;
        console.log('userData', userData)
        
        list.push(userData);

        writeData(list, function () {
            res.redirect('/')
        })
    })

}

module.exports.addpost = function (req, res) {
    // post请求
    console.log('bodyParser', req.body)
    readData(config.dataPath, function (data) {
        
        var list = data || [];
        var userData = req.body;
        userData.id = list.length + 1;
        
        list.push(userData);

        writeData(list, function () {
            res.redirect('/')
        })
    })

}


/**
 * 读取文件数据
 * @param {文件路径} url 
 * @param {回调函数} cb 
 */
function readData (url, cb) {
    fs.readFile(url, 'utf8', function (err, data) {

        if (err && err.code !== 'ENOENT') {
            throw err;
        }

        data = data || '[]'

        data = data.toString();
        data = JSON.parse(data);

        console.log('index读取数据时' + data)
    
        cb(data)
    })
}

/**
 * 写入数据
 * @param {数据} data 
 * @param {回调函数} cb 
 */
function writeData (data, cb) {
    
    data = JSON.stringify(data);

    fs.writeFile(config.dataPath, data, 'utf8',function (err) {
        if (err && err.code != 'ENOENT') {
            throw err;
        }

        cb()
    })
}
