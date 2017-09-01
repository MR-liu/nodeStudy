let fs = require('fs');

let filedir = './LZJ/source';

fs.watch(filedir, function (ev, file) {
    let arr = [];
    fs.readdir(filedir, function (err, dataList) {
        dataList.forEach(function (filename) {
            if (filename){
                let filepath = filedir+'/'+filename,
                    info = fs.statSync(filepath);

                if (info.mode === 33188){
                    arr.push(filepath);
                }
            }
        })

        // 读取文件内容并合并
        let content = '';
        arr.forEach(function (filepath) {
            let infos = fs.readFileSync(filepath);
            content += infos.toString() + '\n';
        })

        //合并后的内容
        fs.writeFileSync('./LZJ/js/main.js', content);
        console.log('更新完成')
    })
})