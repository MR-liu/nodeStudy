var express = require('express');
var router = express.Router();
let Category = require('../models/category');

/*
* 排序 sort
* 1 升序
* -1 降序
* */
router.get('/', function (req, res, next) {
    Category.find().sort({_id:-1}).then(function (data) {
        return data
    }).then(function (category) {
        res.render('main/index',{
            //第二个参数就是模板使用的
            userInfo:req.userInfo,
            category:category
        })
    })
});

module.exports = router;