let mongoose = require('mongoose');
let contentsSchema = require('../schemas/content');

//模型类创建
module.exports = mongoose.model('Content', contentsSchema)
