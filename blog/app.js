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



/*
* 根据不同功能划分不同模块
* */
app.use('/admin', require('./routers/admin'));
// app.use('/api', require('./routers/api'));
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


//数据库连接
mongoose.connect();

//监听http请求
app.listen(9000);
