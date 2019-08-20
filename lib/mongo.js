var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://localhost:27017/news',  { useNewUrlParser: true });

module.exports = db