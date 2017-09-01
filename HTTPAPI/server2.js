let http = require('http');
let url = require('url')
let server = http.createServer();


server.on('request', function(req, res) {
    // console.log(req.url)
    var urlStr = url.parse(req.url)

    switch(urlStr.pathname){
        case '/':
            res.writeHead(200,{
                'content-type':'text/html;charset=utf-8'
            })
            res.write('首页')
            res.end();
            break
        case '/user':
            res.writeHead(200,{
                'content-type':'text/html;charset=utf-8'
            })
            res.write('user')
            res.end();
            break
        case '/info':
            res.writeHead(200,{
                'content-type':'text/html;charset=utf-8'
            })
            res.write('info')
            res.end();
            break
        case '/news':
            res.writeHead(200,{
                'content-type':'text/html;charset=utf-8'
            })
            res.write('news');
            res.end()
            break
        default:
            res.writeHead(404,{
                'content-type':'text/html;charset=utf-8'
            })
            res.write('404');
            res.end()
            break
    }
})

//监听报错
server.on('error', function (err) {
    console.log(err, )
})

server.listen(8080)