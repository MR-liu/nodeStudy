var express = require('express');
var router = express.Router();
let Category = require('../models/category');
let Content = require('../models/content');

/*
* 排序 sort
* 1 升序
* -1 降序
* */

router.get('/', function (req, res, next) {
    res.redirect('main/index')
    next()
})

router.get('/main/index', function (req, res, next) {

    let data = {
        categoryID : req.query.categoryID || ''
    }

    let where = {}
    if (data.categoryID){
        where.category = data.categoryID
    }

    Content.where(where).find().limit(10).sort({_id:-1}).then(function (content) {
        return content
    }).then(function (content) {
        Category.find().sort({_id:-1}).then(function (data) {
            return data
        }).then(function (category) {
            res.render('main/index',{
                //第二个参数就是模板使用的
                userInfo:req.userInfo,
                category:category,
                content:content
            })
        })
    })
});


/*
* 文章
* */
router.get('/content/blog', function (req, res, next) {

    let contentID = req.query.contentID;
    Content.findOne({_id:contentID}).then(function (content) {
        content.views++
        content.save()
        Category.find().sort({_id:-1}).then(function (data) {
            return data
        }).then(function (category) {
            res.render('main/blog',{
                //第二个参数就是模板使用的
                userInfo:req.userInfo,
                category:category,
                content:content
            })
        })
    })
});



module.exports = router;