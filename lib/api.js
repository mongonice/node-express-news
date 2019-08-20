/**
 * desc: 对新闻的CRUD(Create|Read|Update|Delete)操作
 * date: 2019-08-20
 * author: mongo
 */

var NewsModel = require('../models/news.js');
module.exports = {
	/**
	 * 添加数据
	 * @param  {[type]} data 需要保存的数据对象
	 */
	// 存
	save(data) {
		return new Promise((resolve, reject) => {
			//model.create(保存的对象,callback)
			NewsModel.create(data, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},

	// 查找
	find(data={}, fields=null, options={}) {
		return new Promise((resolve, reject) => {
			//model.find(需要查找的对象(如果为空，则查找到所有数据), 属性过滤对象[可选参数], options[可选参数], callback)
			NewsModel.find(data, fields, options, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},

	// 查找一个
	findOne(data) {
		return new Promise((resolve, reject) => {
			//model.findOne(需要查找的对象,callback)
			NewsModel.findOne(data, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},

	// 通过id查找
	findById(data) {
		return new Promise((resolve, reject) => {
			//model.findById(需要查找的id对象 ,callback)
			NewsModel.findById(data, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},

	// 更新
	update(conditions, update) {
		return new Promise((resolve, reject) => {
			//model.update(查询条件,更新对象,callback)
			NewsModel.update(conditions, update, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	},

	// 删除
	remove(conditions) {
		return new Promise((resolve, reject) => {
			//model.update(查询条件,callback)
			NewsModel.remove(conditions, (error, doc) => {
				if(error){
					reject(error)
				}else{
					resolve(doc)
				}
			})
		})
	}
}