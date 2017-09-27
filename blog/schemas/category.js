//数据结构文件
let mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({
    //分类名
    name: String
});