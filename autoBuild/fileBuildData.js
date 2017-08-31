let projectData = {
    'name' : 'LZJ',
    'fileData': [
        {
            'name' : 'css',
            'type' : 'dir'
        },
        {
            'name' : 'js',
            'type' : 'dir'
        },
        {
            'name' : 'images',
            'type' : 'dir'
        },
        {
            'name' : 'index.html',
            'type' : 'file',
            'contant': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><head>\n\t<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">\n\t<title></title>\n</head>\n<body>\n</body>\n</html>'
        }
    ]
}

let fs = require('fs');

if(projectData.name){
    fs.mkdirSync(projectData.name);

    let fileData = projectData.fileData;

    if(fileData && fileData.forEach) {
        fileData.forEach(function (item) {
            item.path = projectData.name + '/' + item.name;
            item.contant = item.contant || '';

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
}