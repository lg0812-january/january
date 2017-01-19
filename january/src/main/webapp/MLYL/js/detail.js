$(function () {
    var taskUrl = getParam("taskUrl");
    var taskId = getParam("taskId");
    var isPass = false;
    var time = setInterval(function () {
        //判断活动是否过期
        // $.post("/", {
        //         id: taskId,
        //     },
        //     function (data, status) {
        //         isPass = data.isPass;
        //     });
        if (isPass) {//过期
            clearInterval(time)
        } else { //未过期
        }
        isPass = isPass;//test
    }, 3000);

    if (isPass) {//过期
        $("iframe").hide();
        $("#noneTask").show();
    } else { //未过期
        $("iframe").attr("src", taskUrl);
    }
});

//根据参数名获得该参数 pname等于想要的参数名
function getParam(pname) {
    var params = location.search.substr(1); // 获取参数 平且去掉？
    var ArrParam = params.split('&');

    if (ArrParam.length == 1) {
        //只有一个参数的情况
        return params.split('=')[1];
    }
    else {
        //多个参数参数的情况
        for (var i = 0; i < ArrParam.length; i++) {
            if (ArrParam[i].split('=')[0] == pname) {
                return ArrParam[i].split('=')[1];
            }
        }
    }
}