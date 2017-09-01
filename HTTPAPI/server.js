let http = require('http');

let server = http.createServer();

server.on('request', function (req, res) {
    console.log('有客户端请求')
    // console.log(res)
    // console.log(req)
    res.writeHead(200,'LZJ`s code', {
        'content-type':'text/html; charset=utf-8'
    })

    res.write('hello')

    res.end()
})


//服务器监听中
server.on('listening', function () {
    console.log('listening```')
})

//监听报错
server.on('error', function (err) {
    console.log(err)
})

server.listen(10086)

console.log(server.address())