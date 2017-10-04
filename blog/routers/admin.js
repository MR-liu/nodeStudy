let express = require('express');
let router = express.Router();
let User = require('../models/user');
let Category = require('../models/category');
let Content = require('../models/content');

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


/*
* 文章列表
* */

router.get('/content', function (req,res,next) {
    let page = Number(req.query.page || 1),
        limit = 2,
        skip = (page - 1) * limit;

    Content.count().then(function (count) {

        //计算总页数
        let pageNum = Math.ceil(count / limit);

        Content.find().limit(limit).skip(skip).then(function (content) {
            // console.log()
            res.render('admin/content',{
                userInfo:req.userInfo,
                content:content,
                //第二个参数就是模板使用的
                page : page,
                pageNum : pageNum,
                url: 'content'
            })
        })
    })
})

/*
* 增加文章
* */

router.get('/content/add', function (req,res,next) {
    Category.find().sort({_id: -1}).then(function (categories) {
        res.render('admin/content_add',{
            userInfo:req.userInfo,
            categories:categories
        })
        return
    })
})
/*
* 保存文章
* */
router.post('/content/add', function (req,res,next) {
    if (req.body.category == ''){
        res.render('admin/err',{
            userInfo:req.userInfo,
            message:'分类不能为空'
        })
        return
    }
    if (req.body.title == ''){
        res.render('admin/err',{
            userInfo:req.userInfo,
            message:'标题不能为空'
        })
        return
    }
    // 保存数据到数据库
    new Content({
        category:req.body.category,
        title:req.body.title,
        user:req.userInfo._id.toString(),
        description:req.body.description,
        content:req.body.content
    }).save().then(function () {
        res.render('admin/success', {
            userInfo:req.userInfo,
            message:'内容保存成功',
            url:'/admin/content'
        })
    })

})

/*
* 修改文章
* */
router.get('/content/edit',function (req, res, next) {
    let id = req.query.id;

    Category.find().sort({_id:-1}).then(function (category) {
        // console.log(category)
        Content.findOne({
            _id:id
        }).then(function (content) {
            // console.log(content)
            res.render('admin/content_edit', {
                userInfo:req.userInfo,
                content:content,
                categories:category
            })
        })
    })
})

/*
* 保存修改
* */
router.post('/content/edit',function (req, res, next) {
    let id = req.query.id;

    Content.findOne({
        _id:id
    }).then(function (content) {
        if (!content){
            res.render('admin/err', {
                message: '文章不存在',
                userInfo: req.userInfo
            })
        } else {
            Content.update({
                _id:id
            },{
                category:req.body.category,
                title:req.body.title,
                description:req.body.description,
                content:req.body.content
            }).then(function (updata) {
                res.render('admin/success', {
                    userInfo: req.userInfo,
                    message: '修改成功',
                    url:'/admin/content'
                });
            })
        }
    })

})

/*
* 删除文章
*
* */
router.get('/content/detele',function (req, res, next) {
    let id = req.query.id;

    Content.remove({
        _id:id
    }).then(function (removeid) {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:'删除成功',
            url:'/admin/content'
        })
    })
})

module.exports = router;