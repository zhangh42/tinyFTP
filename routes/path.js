var express = require('express');
var router = express.Router();

const path = require('path');
const file = require('../api/File');

// 该FTP的根路径
// 存在安全隐患，没有对路径范围进行检测
const rootPath = "F:\\FTP"

/* GET users listing. */
router.get('/', function (req, res, next) {
    var filesList = file.listFile(rootPath);
    var filesJson = [];
    for (var i = 0; i < filesList.length; i++) {

        var filepath = path.join(rootPath, filesList[i]);
        filesJson.push({
            name: filesList[i],
            type: file.isFile(filepath) ? 'file' : 'directory',
            size: file.fileSize(filepath),
            localPath: '\\'
        });
    }
    res.json(filesJson);
});

router.get('/file', function (req, res, next) {
    // 获取绝对路径
    var filename = req.query.name;
    var localPath = req.query.localPath;
    var filepath = path.join(rootPath, localPath, filename);

    res.download(filepath);
});

router.get('/dir', function (req, res, next) {
    var localPath = req.query.localPath;
    var dirname = req.query.name;
    var absPath = path.join(rootPath, localPath, dirname)

    var filesList = file.listFile(absPath);
    var filesJson = [];

    // 添加上一目录的按钮
    // 这里可能存在安全隐患
    filesJson.push({
        name: '..',
        type: 'directory',
        size: 0,
        localPath: path.join(localPath, dirname)
    });
    for (var i = 0; i < filesList.length; i++) {
        var filepath = path.join(absPath, filesList[i]);
        filesJson.push({
            name: filesList[i],
            type: file.isFile(filepath) ? 'file' : 'directory',
            size: file.fileSize(filepath),
            localPath: path.join(localPath, dirname)
        });
    }

    res.json(filesJson);
});

module.exports = router;