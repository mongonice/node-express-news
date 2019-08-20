## 环境
macOS Mojave  
版本10.14.5

node：8.11.1

## 安装依赖并启动

1. 先安装依赖：npm install
2. 再安装： npm install -g nodemon
3. 启动：nodemon index.js

## express框架

- express
- body-parser
- ejs
- mongoose

## 安装mongodb数据库及下载可视化数据库Robomongo(现在改名robo3t)或者mongoChef

~ [robo3t](https://robomongo.org/download)  
~ [mongoChef](https://studio3t.com/#mongochef-download-compare)

## 如果MongoDB是通过HOMEBREW安装的，默认位置是：/usr/local/var/mongoDB

  1. 先安装mongodb: brew install mongodb

## 目录结构

├── README.md
├── config.js----------------------------- 公共配置文件
├── database------------------------------ 未连接数据库之前手造数据文件存储
│   └── data.json
├── handler.js---------------------------- 具体业务(处理页面数据渲染)文件
├── index.js
├── lib----------------------------------- 数据库连接
│   ├── api.js
│   └── mongo.js
├── models-------------------------------- 数据库处理
│   └── news.js
├── package-lock.json
├── package.json
├── public-------------------------------- 公共文件
│   ├── css
│   │   ├── common.css
│   │   ├── detail.css
│   │   ├── index.css
│   │   └── submit.css
│   └── images
├── router.js----------------------------- 路由文件
└── views--------------------------------- 模板文件
    ├── detail.html
    ├── index.html
    ├── layout.html
    ├── result.html
    ├── search.html
    └── submit.html

## 知识点

#### 1. fs.readFile 读取文件

- 1) 如果没指定encoding，则返回Buffer（即：一个个字节）
- 2) 如果指定是utf8编码，则返回utf8编码的字符串

```js

fs.readFile('/data.json'[, options='utf8'], function (err, data) {
    if (err) throw err;

    console.log(data)
})
```

2. fs.writeFile 往文件写入数据

```js

fs.writeFile('/data.json', 'express'[, options='utf8'], function (err) {
    if (err) throw err;
    console.log('写入成功')
})
```

#### 2. vh含义

1) 含义

单位  |  解释
------|------
vw    | 1vw = 视口宽度的1%
vh    | 1vh = 视口高度的1%
vmin  | 选取vw和vh中最小的那个
vmax  | 选取vw和vh中最大的那个

2) vh/vw 与 % 的区别

单位  |  依赖于
------|-------
%     | 元素的父级元素
vh/vw | 视口尺寸






