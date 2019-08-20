var express = require('express');
var router = express.Router();
var handler = require('./handler.js');
var path = require('path');

router.get('/', handler.index)

// router的第一个参数是虚拟路径，随便你怎么起名字
// router.get('/index', handler.index)
router.get('/home', handler.index)

router.get('/submit', handler.submit)

router.get('/detail/:id', handler.detail)

router.get('/add', handler.addget)

router.post('/add', handler.addpost)

// 2019-08-19 
router.get('/search', handler.search)
router.get('/handleSearch', handler.getSearch)
router.get('/results', handler.results)

// 一定要记住 /static是虚拟路径，而非真实的路径，后面加载的才是真正的静态文件
// 你在茫茫人群中喊一声 小明， 然后就有人通过 身份证号把人找出来，因为叫小明的人太多了哈哈
router.use('/static', express.static(path.join(__dirname, 'public')))

module.exports = router