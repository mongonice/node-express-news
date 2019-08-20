/**
 * 2019-08-20 新闻数据库创建
 */
var mongoose = require("mongoose");
var db = require('./../lib/mongo.js');
//一个用户模型
var NewsSchema = new mongoose.Schema({
	title    : { type:String },
	url    : {type: String},
	text      : {type: String},
	// age         : { type:Number, default:0 },
	// description : { type: String},
	// email       : { type: String },
	// github      : { type: String },
	// time        : { type:Date, default:Date.now }
});
//创建Model
var NewsModel = mongoose.model("news", NewsSchema );
module.exports = NewsModel