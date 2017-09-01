let projectData = {
    'name' : 'LZJ',
    'path' : 'LZJ',
    'fileData': [
        {
            'name' : 'css',
            'type' : 'dir',
            'path' : '/'
        },
        {
            'name' : 'js',
            'type' : 'dir',
            'path' : '/'
        },
        {
            'name' : 'images',
            'type' : 'dir',
            'path' : '/'
        },
        {
            'name' : 'source',
            'type' : 'dir',
            'path' : '/'
        },
        {
            'name' : 'index.html',
            'type' : 'file',
            'path' : '/',
            'contant': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head>\n\t<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">\n\t<title></title>\n<link rel="stylesheet" href="./css/main.css"/>\n</head>\n<body>\n<script src="./js/main.js"></script>\n</body>\n</html>'
        },
        {
            'name' : 'main.js',
            'type' : 'file',
            'path' : '/js/'
        },
        {
            'name' : 'main.css',
            'type' : 'file',
            'path' : '/css/'
        }
    ]
}

let fs = require('fs');

if(projectData.name && isexists(projectData.path)){
    fs.mkdirSync(projectData.name);
    let fileData = projectData.fileData;

    if(fileData && fileData.forEach) {
        fileData.forEach(function (item) {
            item.path = projectData.name + item.path + item.name;
            item.contant = item.contant  || '';

            switch( item.type ){
                case 'dir':
                    fs.mkdirSync(item.path);
                    break;
                case 'file':
                    fs.writeFileSync(item.path, item.contant)
                    break;
            }
        })
    }
    console.log('自动构建完成！')
}

function isexists(path) {
    if (!fs.existsSync(path)){
        return true;
    } else {
        console.log('文件: ' + path + ' 已存在');
        return false;
    }

}