var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('main/index',{
        //第二个参数就是模板使用的
        userInfo:req.userInfo
    })
});

module.exports = router;