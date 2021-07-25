$(function () {
    getUserInfo();

    let layer = layui.layer;

    $(".btnLogout").on("click", function () {
        layer.confirm(
            "确定退出登录?",
            { icon: 3, title: "提示" },
            function (index) {
                //do something

                localStorage.removeItem("token");
                location.href = "/login.html";

                // 关闭confirm 询问框
                layer.close(index);
            }
        );
    });
});

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",

        // 不论成功还是失败，最终都会调用这个complete函数

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败");
            }
            renderAvatar(res.data);
        },
    });
}

function renderAvatar(user) {
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        let firstLetter = name[0].toUpperCase();
        $(".layui-nav-img").hide();
        $(".text-avatar").html(firstLetter).show();
    }
}
