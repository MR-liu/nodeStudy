let async = require("async"); 

let arr = ['1', '2', '3', '4', '5'];

// each
// Array的迭代器方法，很常用
// ARR -数组遍历。
// 迭代器（item，回调）——一个应用于数组中每个项的函数。迭代器传递一个回调函数，当它完成后必须调用它。如果没有错误发生，回调应该没有参数或一个明确的空参数。
// 回调（ERR）-一个回调，毕竟迭代器功能已经完成，或发生错误。

// async.each(arr, function(item, callback){   
//     console.log(item);  
//     callback(null);
// }, function(err){  
//     if(err){  
//         console.error("error");  
//     }  
// });  

// eachLimit
// 和each基本一样，但是顺序执行
// 也和each差不多，多出来的limit参数，是限制允许并发执行的任务数

async.eachLimit(arr, 2, function(item, callback){
    console.log(item);
    callback();// 必须调用，才能触发下一个任务执行
}, function(error){
    if(error){
        console.error("error: " + error);
    }
});