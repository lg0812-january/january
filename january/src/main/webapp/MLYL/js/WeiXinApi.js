$(function () {
    $.get(
        "http://zkh.successinfo.com.cn/january/WeixinController/getJsApiTicket",
        {
            reqUrl: location.href
        }, function (data) {
            if (data.code == "1001") {
                console.log(data);
                wx.config({
                    debug: true,
                    appId: data.result.appId,
                    timestamp: data.result.timestamp,
                    nonceStr: data.result.nonceStr,
                    signature: data.result.signature,
                    jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 功能列表，我们要使用JS-SDK的什么功能
                });
            }
        }, function (data) {
            // $("#abc").append(JSON.stringify(data));
        });

    //需要加载页面时就完成的接口放在ready里
    wx.ready(function () {
        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
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

        wx.error(function (res) {
        });

        document.querySelector('#onMenuShareAppMessage').onclick = function () {
            wx.onMenuShareAppMessage({
                title: '互联网之子',
                desc: '在长大的过程中，我才慢慢发现，我身边的所有事，别人跟我说的所有事，那些所谓本来如此，注定如此的事，它们其实没有非得如此，事情是可以改变的。更重要的是，有些事既然错了，那就该做出改变。',
                link: 'http://movie.douban.com/subject/25785114/',
                imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
                trigger: function (res) {
                    alert("点击分享：" + JSON.stringify(res));
                    // 用户确认分享后执行的回调函数
                },
                success: function (res) {
                    alert("分享成功：" + JSON.stringify(res));
                    // 用户确认分享后执行的回调函数
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

        document.querySelector('#onMenuShareTimeline').onclick = function () {
            wx.onMenuShareTimeline({
                title: '互联网之子',
                link: 'http://movie.douban.com/subject/25785114/',
                imgUrl: 'http://img3.douban.com/view/movie_poster_cover/spst/public/p2166127561.jpg',
                trigger: function (res) {
                    alert("点击分享：" + JSON.stringify(res));
                    // 用户确认分享后执行的回调函数
                },
                success: function (res) {
                    alert("分享成功：" + JSON.stringify(res));
                    // 用户确认分享后执行的回调函数
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
    });
})

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
