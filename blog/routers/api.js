let express = require('express');
let router = express.Router();
let Content = require('../models/content');

//引用模型类 通过模型类进行数据库操作
let User = require('../models/User');

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

    //用户名不为空
    if (!username) {
        responseData.code = 1;
        responseData.message = '用户名不为空';
        //转换成json格式并返回
        res.json(responseData);
        return;
    }

    //密码不为空
    if (!password) {
        responseData.code = 2;
        responseData.message = '密码不为空';
        //转换成json格式并返回
        res.json(responseData);
        return;
    }

    //重复密码不为空
    if (!repassword) {
        responseData.code = 3;
        responseData.message = '重复密码不为空';
        //转换成json格式并返回
        res.json(responseData);
        return;
    }

    //两次密码不一致
    if (password !== repassword){
        responseData.code = 4;
        responseData.message = '两次密码不一致';
        //转换成json格式并返回
        res.json(responseData);
        return;
    }

    //数据库查询
    //查询数据库中用户名是否被注册
    //mongose中 . 代表类方法静态方法 #代表构造方法
    User.findOne({
        username:username
    }).then(function (userInfo) {
        if(userInfo){
            responseData.code = 5;
            responseData.message = '用户名已经被注册';
            //转换成json格式并返回
            res.json(responseData);
            return;
        }

        //保存数据
        //通过操作数据对象操作
        let user = new User({
            username: username,
            password: password
        });
        // 保存
        return user.save()
    }).then(function (userInfo) {

        req.cookies.set('userInfo', JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }))

        responseData.username = username;
        responseData.message = '注册成功';
        //转换成json格式并返回
        res.json(responseData);

        return;
    })
});


//登陆逻辑
/*
* 1. 用户不能为空
* 2. 密码不为空
* 3. 查询数据库
*
* */

router.post('/user/login', function (req, res ,next) {
    let username = req.body.username,
        password = req.body.password;

    //用户名不为空
    if (!username) {
        responseData.code = 1;
        responseData.message = '用户名不为空';
        //转换成json格式并返回
        res.json(responseData);
        return;
    }

    //密码不为空
    if (!password) {
        responseData.code = 2;
        responseData.message = '密码不为空';
        //转换成json格式并返回
        res.json(responseData);
        return;
    }
    
    //查询数据库
    User.findOne({
        username:username
    }).then(function (userInfo) {
        if (!userInfo){
            responseData.code = 4;
            responseData.message = '用户未注册';
            //转换成json格式并返回
            res.json(responseData);
            return;
        }
    });

    //查询数据库
    User.findOne({
        username:username,
        password:password
    }).then(function (userInfo) {
        if (!userInfo){
            responseData.code = 3;
            responseData.message = '密码出错';
            //转换成json格式并返回
            res.json(responseData);
            return;
        }else{
            responseData.code = 0;
            responseData.username = username;
            responseData.message = '登陆成功';

            //是否是管理员
            // if(userInfo.isAdmin){
            //     responseData.isAdmin = true;
            // }

            responseData.userInfo = {
                _id : userInfo._id,
                username: userInfo.username,
                isAdmin: userInfo.isAdmin
            }

            req.cookies.set('userInfo', JSON.stringify({
                _id:userInfo._id,
                username:userInfo.username
            }))
            //转换成json格式并返回
            res.json(responseData);
            return;
        }
    })
});

//退出登录
router.post('/user/loginout', function (req, res, next) {
    req.cookies.set('userInfo', null)
    res.json({
        code: 0,
        message: '用户退出'
    })
})

/*
* 评论提交
* 评论人 时间 内容
* */

router.post('/content/blog', function (req, res, next) {
    let contentId = req.body.contentID;
    let postData = {
        username: req.userInfo.username,
        posttime: new Date(),
        content:req.body.content
    }

    Content.findOne({
        _id: contentId
    }).then(function (content) {
        content.comments.push(postData);
        return content.save()
    }).then(function (newcontent) {
        responseData.message= ' sucuess '
        res.json(responseData)
    })

});
module.exports = router;