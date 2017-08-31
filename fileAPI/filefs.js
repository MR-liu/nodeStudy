//fs文件模块
let fs = require('fs');

/*
* 异步读文件
* fs.open(path, flags, [mode], callback)
*
* path：要打开文件的路径
* flags：打开文件的方式 读/写
* mode：设置文件的模式 读/写/执行
* callback：回调 err打开文件失败的错误 成功的话err为null fd是被打开文件的标识
 */

// fs.open('1.txt', 'r', function (err, fd) {
//     console.log(err, fd)
// })

/*
* 同步读文件
* fs.openSync(path, flags, [mode], callback)
*/

// let fd = fs.openSync('1.txt', 'r')
//
// console.log('ok', fd)

// fs.open('1.txt', 'r', function (err, fd) {
//     if(err){
//         console.log('文件打开失败')
//     }else{
//         /*
//         *  读取文件
//         *  fs.read(fd, buffer, offset, length, position, callback)
//         *  fd: 返回的fd
//         *  buffer: 缓冲区对象
//         *  offset: 偏移量 新的内容添加到buffer内容的起始位置
//         *  position：读取文件的起始位置
//         *  callback：回调
//         *      err：错误
//         *
//         */
//
//         let bf = new Buffer(100);
//
//         fs.read(fd, bf, 0, 10, null, function(err){
//             console.log(bf)
//         })
//     }
// })

// fs.open('1.txt', 'r+', function (err, fd) {
//     if(err){
//         console.log('err')
//     }else{
//         /*
//         * fs.write(fd, buffer, offset, length[, option], callback)
//         * fd: 打开的文件
//         * buffer：要写入的数据
//         * length: 要写入buffer的数据的长度
//         * position：fd的起始位置
//         */
//         let bf = new Buffer('3333333')
//         fs.write(fd, bf, 0, 5, function () {
//             console.log(arguments)
//
//         })
//
//         fs.close(fd, function () {
//
//         })
//     }
// })

//读写文件 没文件就创建文件 有文件就覆盖内容
// fs.writeFile('2.txt','LZJ', function () {
//     console.log('over')
// })

//添加内容到文件末尾
// fs.appendFile('2.txt','sjdfh',function () {
//     console.log('over')
// })

//检测文件是否存在
//判断存在 不存在就创建存在就追加
// let z = 'skdjhsjk';
// fs.exists('4.txt',function (isExists) {
//     if (!isExists){
//         fs.writeFile('4.txt',z, function (err) {
//             if(err){
//                 console.log('创建失败')
//             }else{
//                 console.log('创建成功')
//             }
//         })
//     } else {
//         fs.appendFile('4.txt', z, function (err) {
//             if(err){
//                 console.log('追加失败')
//             }else{
//                 console.log('追加成功')
//             }
//         })
//     }
// })

//读取文件内容
// fs.readFile('2.txt', function (err, data) {
//     if (err){
//         console.log('读取失败')
//     } else{
//         console.log(data)
//         console.log(data.toString())
//     }
// })

//更改名字
// fs.rename('1.txt', '1.new.txt', function (err) {
//     if (err){
//         console.log('命名出错')
//     }else{
//         console.log('成功')
//     }
// })

//创建文件夹
// fs.mkdir('.ssh', function (err) {
//     if (err){
//         console.log('创建失败')
//     }else{
//         console.log('创建成功')
//     }
// })

//删除文件夹
// fs.rmdir('.ssh', function (err) {
//     if (err){
//         console.log('删除失败')
//     }else{
//         console.log('删除成功')
//     }
// })

//获取文件信息 判断文件类型
// fs.readdir('../node', function (err, fileList) {
//     if(!err){
//         fileList.forEach(function (filename) {
//             fs.stat(filename, function (err, info) {
//                 switch(info.mode) {
//                     case 16877:
//                         console.log('文件夹')
//                         break
//                     case 33188:
//                         console.log('文件')
//                         break
//                     default:
//                         console.log('其他')
//                         break
//                 }
//             })
//         })
//     }
// })