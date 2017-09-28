let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Category = require('../models/category');

router.get('/', function (req, res, next) {
    if(!req.userInfo.isAdmin){
        res.send('对不起 您不是管理员')
        return
    }
    next()
});

/*
* 首页
* */
router.get('/', function (req, res, next) {
    res.render('admin/index',{
        //第二个参数就是模板使用的
        userInfo:req.userInfo
    })
});

/*
* 用户管理
*
* */
router.get('/user_index', function (req, res, next) {
    /*
    * 数据库中读取所有用户
    *
    * limit(Number): 限制数据长度
    * skip(Number): 忽视掉的数据条数
    *
    * User,count() 计算总数
    *
    * */

    let page = Number(req.query.page || 1),
        limit = 2,
        skip = (page - 1) * limit;

    User.count().then(function (count) {

        //计算总页数
        let pageNum = Math.ceil(count / limit);

        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index',{
                //第二个参数就是模板使用的
                userInfo : req.userInfo,
                users : users,
                page : page,
                pageNum : pageNum,
                url:'user_index'
            })
        })
    })
});


/*
* 分类管理
* */
router.get('/category', function (req, res, next) {
    /*
    * 数据库中读取所有分类
    *
    * limit(Number): 限制数据长度
    * skip(Number): 忽视掉的数据条数
    *
    * User,count() 计算总数
    *
    * */

    let page = Number(req.query.page || 1),
        limit = 2,
        skip = (page - 1) * limit;

    Category.count().then(function (count) {

        //计算总页数
        let pageNum = Math.ceil(count / limit);

        Category.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/category',{
                //第二个参数就是模板使用的
                user : users,
                page : page,
                pageNum : pageNum,
                url: 'category'
            })
        })
    })
})

/*
* 添加分类
* */
router.get('/category/add', function (req, res, next) {
    res.render('admin/category_add')
})

/*
*   分类
* */
router.post('/category/add', function (req, res, next) {
    let name = req.body.name;

    if(name == ''){
        res.render('admin/err', {
            message: '提交不为空',
            userInfo: req.userInfo
        })
        return
    }

    //查询数据库是否存在
    //数据库中是否已经存在同名分类名称
    Category.findOne({
        name:name
    }).then(function (rs) {
        if(rs){
            //如果成立，说明数据库中已经存在该分类名称
            res.render('admin/err',{
                userInfo: req.userInfo,
                message:'名称已经存在'
            })
            return Promise.reject()
        }else {
            return new Category({
                name:name
            }).save()
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '保存分类信息数据成功',
            url:'/admin/category'
        });
    })
})

/*
* 分类编辑
* */
router.get('/category/edit', function (req, res, next) {
    let id = req.query.id || '';

    Category.findOne({
        _id:id
    }).then(function (category) {
        if(!category){
            res.render('admin/err', {
                userInfo:req.userInfo,
                message:'分类不存在'
            })
            return Promise.reject();
        } else{
            res.render('admin/category_edit', {
                userInfo:req.userInfo,
                category:category
            })
        }
    })
})

router.post('/category/edit', function (req, res, next) {
    let id = req.query.id || '',
        name = req.body.name || '';

    //查找数据库中那条分类
    Category.findOne({
        _id:id
    }).then(function (category) {
        if(!category){
            res.render('admin/err', {
                userInfo:req.userInfo,
                message:'分类不存在'
            })
            return Promise.reject();
        } else{
            //这里要查找要修改的分类是否存在数据库中了
            //$ne 表示ID不相等
            if (name == category.name){
                res.render('admin/err', {
                    userInfo:req.userInfo,
                    message:'分类修改完毕',
                    url:'/admin/category'
                })
                return Promise.reject()
            } else {
                return Category.findOne({
                    _id:{$ne:id},
                    name:name
                })
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory){
            res.render('admin/err', {
                userInfo:req.userInfo,
                message:'已经存在相同类名',
                url:'/admin/category'
            })
            return Promise.reject()
        }else{
            return Category.update({
                _id:id
            },{
                name:name
            })
        }
    }).then(function (edit) {
        res.render('admin/success', {
            userInfo:req.userInfo,
            message:'修改成功',
            url:'/admin/category'
        })
    })
})

/*
* 删除
* */
router.get('/category/detele',function (req, res, next) {
    let id = req.query.id;

    Category.remove({
        _id:id
    }).then(function (removeid) {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/category'
        })
    })
})


module.exports = router;