let http = require('http'),
    url = require('url'),
    fs = require('fs'),
    querystring = require('querystring');

let server = http.createServer();

let htmldir = __dirname;
server.on('request',function (req, res) {
    var urlStr = url.parse(req.url);

    switch(urlStr.pathname){
        case '/':
            sendData(htmldir + '/html/index.html', req, res);
            break
        case '/user':
            sendData(htmldir + '/html/user.html', req, res);
            break
        case '/info':
            sendData(htmldir + '/html/info.html', req, res);
            break
        case '/news':
            sendData(htmldir + '/html/news.html', req, res);
            break
        case '/login':
            sendData(htmldir + '/html/login.html', req, res);
            break
        case '/login/check':
            //获取登录账户密码
            //使用querystring.stringify()
            //反序列化
            //转义

            //get
            // console.log(req.method, querystring.parse(urlStr.query))

            //post
            // console.log(req.method, )

            if (req.method.toUpperCase() == "POST") {
                let str = '';
                
                req.on('data', function (chunk) {
                    str += chunk
                })
                
                req.on('end', function () {
                    console.log(str);
                    console.log(querystring.parse(str))
                })
            } else if (req.method.toUpperCase() == "GET") {
                console.log(querystring.parse(urlStr.query))
            }

            break
        default:
            res.writeHead(404,{
                'content-type':'text/html;charset=utf-8'
            })
            res.write('页面疯掉啦2');
            res.end()
            break
    }
})

//共同方法 读文件
function sendData(file, req, res){
    console.log(file);
    fs.readFile(file, function (err, data) {
        if(err){
            res.writeHead(404, {
                'content-type':'text/html;charset=utf-8'
            })
            res.end('页面疯掉了1')
        }else{
            res.writeHead(200, {
                'content-type':'text/html;charset=utf-8'
            })
            res.end(data)
        }
    })
}


//监听报错
server.on('error', function (err) {
    console.log(err )
})

server.listen(3520)