var path = require('path');
var fs = require('fs');
var config = require('./config.js');
var api = require('./lib/api');
var mongoose = require("mongoose");

// 其实 handler.js 做的事情就是 controller做的事情，处理具体的业务
// 只不过将handler.js 拆分成不同业务模块
// 渲染主页面
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

    console.log('我是index')
    /**
     * 2019-08-20 添加mongodb/mongoose数据库
     */
    api.find({}).then(result => {
        console.log('haha', typeof result)

        let list = result
        res.render(path.join(__dirname, 'views', 'index.html'), {title: '首页', list: list})
    })
   
    // readData(config.dataPath, function (list) {
    //     list = list || [];
    //     res.render(path.join(__dirname, 'views', 'index.html'), {title: '首页', list: list})
    // })
}

// 渲染提交页面
module.exports.submit = function (req, res) {
    res.render(path.join(__dirname, 'views', 'submit.html'), {title: '表单提交'})
}

// 渲染详情页面
module.exports.detail = function (req, res) {
    console.log('参数', req.params)  // {id: '2'}

    // readData(config.dataPath, function (data) {
        
    //     var list = data;
    //     var item = {};

    //     for (var i = 0; i < list.length; i++) {
    //         if (list[i].id === Number(req.params.id)) {
    //             item = list[i]
    //             break;
    //         }
    //     }

    //     console.log('item', item)

    //     res.render(path.join(__dirname, 'views', 'detail.html'), {title: '详情', item: item})
    // })


    /**
     * 2019-08-20 添加mongodb/mongoose数据库操作
     * 注意点： 1) mongoose自动给每条新闻添加唯一标识id即: _id
           2) 然鹅这个_id值类型是mongoose赋予的一种轻量类型值ObjectId
           3) 所以前端再通过此值查询时，需要先通过mongoose.Types.ObejctId(id)变化一下
           4) 当从数据库中反映到页面中的时候_id 会变为页面中的 id
     */
    api.findOne({"_id" : mongoose.Types.ObjectId(req.params.id)})
        .then(result => {
            console.log('查找的新闻', result)

            let findItem = result;
            res.render(path.join(__dirname, 'views', 'detail.html'), {title: '详情', item: findItem})

        })
}

// 处理get方式提交数据
module.exports.addget = function (req, res) {

    /**
     * 2019-08-20 通过mongodb/mongoose数据库处理
     */
    let newItem = req.query;
    console.log('newItem', newItem)

    api.save(newItem)
        .then(result => {
            res.redirect('/')
        })
    // get方式请求
    // readData(config.dataPath, function (data) {
        
    //     var list = data || [];
    //     var userData = req.query;
    //     userData.id = list.length + 1;
    //     console.log('userData', userData)
        
    //     list.push(userData);

    //     writeData(list, function () {
    //         res.redirect('/')
    //     })
    // })
}

// 处理post方式提交数据
module.exports.addpost = function (req, res) {
    // post请求
    console.log('bodyParser', req.body)
    // readData(config.dataPath, function (data) {
        
    //     var list = data || [];
    //     var userData = req.body;
    //     userData.id = list.length + 1;
        
    //     list.push(userData);

    //     writeData(list, function () {
    //         res.redirect('/')
    //     })
    // })

    /**
     * 2019-08-20 添加mongodb/mongoose数据库
     */

    let newItem = req.body;
    api.save(newItem)
        .then(result => {
            res.redirect('/')
        })

}


// 2019-08-19 添加搜索功能
// 添加搜索页面
module.exports.search = function (req, res) {
    res.render(path.join(__dirname, 'views', 'search.html'), {title: '搜索页'})
}

// 处理搜索功能
module.exports.getSearch = function (req, res) {
    console.log('搜索', req.query);
    req.get("https://search.twitter.com/search.json")
        .data({q: 'vewewo'})
        .end(function (err, res) {
            if (err) throw new Error(err)

            console.log('res', res)
        })
}

// 渲染搜索结果页面
module.exports.results = function (req, res) {

}


/** ----------一下是封装函数--------*/
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
