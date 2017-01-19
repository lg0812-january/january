$(function () {
    $.get("http://zkh.successinfo.com.cn/january/messionOperation/get_messions",
        function (data, status) {
            console.log(data)
//alert(typeof data.code);
            if (data.code == "1001") {
                if (data.result.length > 0) {
                    var html = '';
                    var obj = data.result;
                    for (var i = 0; i < data.result.length; i++) {
                        html += '<li>' +
                            '<div class="panel panel-default">' +
                            '<div class="panel-body" style="padding: 0">' +
                            '<a href="./detail.html?taskUrl=' + data.result[i].mission_href + '&taskId=' + obj[i].messionId + '&title=' + obj[i].title + '">' +
                            '<img src="img/banner1@2x.png" class="img-responsive">' +
                            '</a>' +
                            '</div>' +
                            '<div class="panel-footer">' +data.result[i].title + '</div>' +
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
        },"json");
});
// $.ajax({
//     url: 'http://zkh.successinfo.com.cn/messionOperation/get_messions',
//     type: 'get',
//     dataType: 'jsonp',
//     data: {
//     },
//     success: function (result, status, xhr) {
//         if (result.success) {
//             alert(data)
//         }
//     },
//     error: function (result, status, xhr) {
//         // alert(status)
//     }
// });
