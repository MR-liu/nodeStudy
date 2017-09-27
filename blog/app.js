/*
* 启动程序
* */

//用户发送HTTP请求 --> url --> 解析路由 --> 找到匹配规则 --> 执行指定的绑定函数，同时返回对应内容给用户


//获取express模块
let express = require('express');

//加载模板
let swig = require('swig');

//创建app应用 ==> NODEJS http.createServer();
let app = express();

//数据库
let mongoose = require('mongoose');

//加载body-parser,用来加载处理post提交过来的数据
let bodyParser = require('body-parser');

//加载cookies
let Cookies = require('cookies');

//加载用户类型
let User = require('./models/user');

//设置静态文件托管
//当用户访问的url以public开始，那么直接返回对应 __dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));

//配置模板引擎
//定义当前应用所使用的模板引擎
//第一个参数，模板引擎的名称， 同时也是模板文件的后缀， 第二个参数表示用于解析模板内容的方法
app.engine('html', swig.renderFile);

//设置模板文件的存放目录， 第一个参数必须是views， 第二个参数是目录
app.set('views', './views');

//注册所使用的模板引擎 第一个参数必须是view engine 第二个参数跟app.engine定义的名称相同
app.set('view engine', 'html');


//开发过程中不需要缓存
swig.setDefaults({cache: false});

//使用中间件body-parser
app.use(bodyParser.urlencoded({extended:true}));

//设置cookies

//对cookies的设置
//不要缺少next
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res)

    //解析用户登录的cookies信息
    req.userInfo = {}
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'))

            // 获取当前登录用户的身份类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin)
                next()
            })
        }catch (e){
            console.log(e);
            next()
        }
    }else {
        next()
    }
})

/*
* 根据不同功能划分不同模块
* */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));


/*
* 首页
* req request对象
* res respones对象
* */
// app.get('/', function (req , res, next) {
//     //读取制定目录下的文件并返回给客户端
//     //第一个参数是模板的文件，文件位置相对于views views/index.html
//     res.render('index');
// });


//test================================================
app.post('/test', function (req, res ,next) {
    console.log('test');
    res.json({1:1});
});



//数据库连接
//命令：mongod --dbpath= --port=29019
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:29019/blog',{useMongoClient: true}, function (err) {
    if(err){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功');

        //监听http请求
        app.listen(9000);
    }
});

