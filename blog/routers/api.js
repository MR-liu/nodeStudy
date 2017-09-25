let express = require('express');
let router = express.Router();

//统一返回格式
var responseData;

router.use( function (req, res, next) {
    responseData = {
        code:0,
        message:''
    }

    next();
});

//注册逻辑
/*
* 1. 用户不能为空
* 2. 密码不为空
* 3. 两次密码是否一致
* 4. 用户名是否被注册
*       查询数据库
*
* */

router.post('/user/register', function (req, res ,next) {
    let username = req.body.username,
        password = req.body.password,
        repassword = req.body.repassword;

    // //用户名不为空
    // if (!username) {
    //     responseData.code = 1;
    //     responseData.message = '用户名不为空';
    //     //转换成json格式并返回
    //     console.log(responseData);
    //     res.json(responseData);
    //     return;
    // }
    //
    // //密码不为空
    // if (!password) {
    //     responseData.code = 2;
    //     responseData.message = '密码不为空';
    //     //转换成json格式并返回
    //     res.json(responseData);
    //     return;
    // }
    //
    // //重复密码不为空
    // if (!repassword) {
    //     responseData.code = 3;
    //     responseData.message = '重复密码不为空';
    //     //转换成json格式并返回
    //     res.json(responseData);
    //     return;
    // }
    //
    // //两次密码不一致
    // if (password !== repassword){
    //     responseData.code = 4;
    //     responseData.message = '两次密码不一致';
    //     //转换成json格式并返回
    //     res.json(responseData);
    //     return;
    // }

    //注册成功
    responseData.message = '注册成功';
    console.log(responseData);
    res.json(responseData);
});

module.exports = router;