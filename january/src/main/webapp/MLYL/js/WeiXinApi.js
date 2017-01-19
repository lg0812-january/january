$(function () {
    var openid;
    //获取微信配置信息并配置
    $.get("http://zkh.successinfo.com.cn/january/WeixinController/getJsApiTicket",
        {
            reqUrl: location.href
        }, function (data) {
            if (data.code == "1001") {
                wx.config({
                    debug: true,
                    appId: data.result.appId,
                    timestamp: data.result.timestamp,
                    nonceStr: data.result.nonceStr,
                    signature: data.result.signature,
                    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
                });
            }
        },"json");
    //获取当前微信用户openid
    $.get("http://zkh.successinfo.com.cn/january/WeixinController/getuserinfo?code=" + getUrlArgObject("code"),
        function (data) {
            if (data.code == "1001") {
                openid =  data.result.openid
            }
        }, function (data) {
        },"json");

    wx.ready(function () {
        wx.checkJsApi({
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
            ],
            success: function (res) {
                alert("检测通过：" + JSON.stringify(res));
            },
            fail: function (res) {
                alert("检测失败：" + JSON.stringify(res));
            },
            complete: function (res) {
                alert("检测结束");
            }
        });

        $('#onMenuShareAppMessage').onclick = function () {
            wx.onMenuShareAppMessage({
                title: title,
                desc: '',
                link: taskUrl,
                imgUrl: 'img/banner1@2x.png',
                trigger: function (res) {
                    alert("点击分享：" + JSON.stringify(res));
                    // 用户确认分享后执行的回调函数
                },
                success: function (res) {
                    alert("分享成功：" + JSON.stringify(res));
                },
                cancel: function (res) {
                    alert("取消分享：" + JSON.stringify(res));
                    // 用户取消分享后执行的回调函数
                },
                fail: function (res) {
                    alert("分享失败：" + JSON.stringify(res));
                }
            });
            alert('已注册获取“发送给朋友”状态事件');
        };

        $('#onMenuShareTimeline').onclick = function () {
            wx.onMenuShareTimeline({
                title: title,
                link: taskUrl,
                imgUrl: 'img/banner1@2x.png',
                trigger: function (res) {
                    alert("点击分享：" + JSON.stringify(res));
                    // 用户确认分享后执行的回调函数
                },
                success: function (res) {
                    // 用户确认分享后执行的回调函数
                    $.post("http://zkh.successinfo.com.cn/january/messionOperation/share_mession",
                        {
                            sharedId:openid,
                            messionId:taskId
                        },
                        function (result) {
                        }, "json")
                    alert("分享成功：" + JSON.stringify(res));
                },
                cancel: function (res) {
                    alert("取消分享：" + JSON.stringify(res));
                    // 用户取消分享后执行的回调函数
                },
                fail: function (res) {
                    alert("分享失败：" + JSON.stringify(res));
                }
            });
            alert('已注册获取“分享到朋友圈”状态事件');
        };

        wx.error(function (res) {
        });
    });
})
