let mongoose = require('mongoose');
let categorySchemo = require('../schemas/category');

//模型类创建
module.exports = mongoose.model('Category', categorySchemo);
