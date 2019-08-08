## 安装依赖并启动

1. 先安装依赖：npm install
2. 再安装： npm install -g nodemon
3. 启动：nodemon index.js

## express框架

- express
- body-parser
- ejs

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






