let mongoose = require('mongoose');
let usersSchemo = require('../schemas/user');

//模型类创建
module.exports = mongoose.model('User', usersSchemo);
