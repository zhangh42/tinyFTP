
// 返回文件列表的html形式
// 或者说将json数据组装成html列表
function get_files_list_from_json(data) {
    data.sort(fileSortor);
    var content = "<ul class=\"list-group\">"
    for (var i = 0; i < data.length; i++) {
        if (data[i].type === 'file') {
            content += "<li class=\"list-group-item list-group-item-success li_file\">"
                + "<a href=\"path/file?name=" + data[i].name + "&localPath="
                + data[i].localPath + "\">"
                + data[i].name
                + "</a></li>";
        } else {
            content += "<li class=\"list-group-item list-group-item-info li_folder\">"
                + "<button name=" + data[i].name + "&localPath=" + data[i].localPath + " onclick=\"changedir(this)\">"
                + data[i].name
                + "</button></li>";
        }
    }
    content += "</ul>";

    return content;
}

/**
 * 文件列表排序比较
 * 目录排在文件前面，其余情况按照字母顺序排
 */
function fileSortor(a, b) {
    if (a.type === b.type) {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
    }
    else {
        if (a.type === 'directory') return -1;
        else return 1;
    }
}


function loadFilesList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("files_list").innerHTML = get_files_list_from_json(JSON.parse(this.response));
            // 关闭加载图标
            $('#wel_loading').get(0).hidden = true;
        }
    };
    xhttp.open("GET", "/path", true);
    xhttp.send();
}

// 监听按钮，切换目录
function changedir(btn) {
    document.getElementById("files_list").innerHTML = "";
    $('#wel_loading').get(0).hidden = false;
    var dirname = btn.name;
    var url = '/path/dir?name=' + dirname;
    $.get(url, function (data, status) {
        document.getElementById("files_list").innerHTML = get_files_list_from_json(data);
        $('#wel_loading').get(0).hidden = true;
    });


}