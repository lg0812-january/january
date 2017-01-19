var paramObj = {
    user_name: "s",
    user_id: "1234gsjshk"
};
var listObj = null;
$(function () {
    //跨域请求的demo，请求任务列表数据
    $.ajax({
        url: 'http://www.baidu.com?callback=?',
        type: 'get',
        dataType: 'jsonp',
        data: {
            param: paramObj
        },
        success: function (result, status, xhr) {
            if (result.success) {
                //jquery 渲染任务列表页面
            }
        },
        error: function (result, status, xhr) {
            // alert(status)
        }
    });

    $.post("/",
        {
            user_name: "s",
            user_id: "1234gsjshk"
        },
        function (data, status) {
            //jquery 渲染任务列表页面
            if (data.length > 0) {
                listObj = JSON.parse(JSON.parse(data));
                if (listObj.Result == true) {
                    var html = '';
                    if (listObj.ProjectList != null && listObj.ProjectList.length > 0) {
                        for (var i = 0; i < listObj.ProjectList.length; i++) {
                            html += '<li>' +
                                '<div class="panel panel-default">' +
                                '<div class="panel-body" style="padding: 0">' +
                                '<a href="./detail.html?taskUrl='+obj.ProjectList[i].taskUrl+'&taskId='+obj.ProjectList[i].taskId+'">' +
                                '<img src="' + listObj.ProjectList[i].taskImgUrl + '" class="img-responsive" alt="banner1.png">' +
                                '</a>' +
                                '</div>' +
                                '<div class="panel-footer">' + listObj.ProjectList[i].taskName + '</div>' +
                                '</div>' +
                                '</li>';
                        }
                        $('#taskList').append(html);
                    } else {
                        $('#taskList').append();
                    }
                } else {
                    alert("无数据");
                }
            } else
                alert("接口错误");
        });
});
