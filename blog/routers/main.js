var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // console.log(1111,req.userInfo)
    res.render('main/index',{
        //第二个参数就是模板使用的
        userInfo:req.userInfo
    })
});

module.exports = router;