// 文件相关的api，一般情况下均为同步方法

const fs = require('fs')
const path = require('path');

/**
 * 获取指定路径下的所有文件
 * 该方法为同步方法
 * @param {string} path 路径
 * @return {object}
 */
exports.listFile = function(path){
    var filenames = fs.readdirSync(path);
    return filenames;
}

/**
 * @param {string} path
 * @return {bool}
 */
exports.isDirectory = function (path){
    return fs.lstatSync(path).isDirectory();
}

/**
 * @param {string} path
 * @return {bool}
 */
exports.isFile = function (path){
    return fs.lstatSync(path).isFile();
}

/**
 * 获取文件大小
 * @param {string} path
 * @return {number}
 */
exports.fileSize = function(path){
    return fs.lstatSync(path)['size'];
}