import hyRequest from "@/service";
var LoginAPI;
(function (LoginAPI) {
    LoginAPI["AccountLogin"] = "/login";
    LoginAPI["LoginUserInfo"] = "/users/";
    LoginAPI["UserMenus"] = "/role/";
})(LoginAPI || (LoginAPI = {}));
// post 登录请求
export function accountLoginRequest(account) {
    return hyRequest.post({
        url: LoginAPI.AccountLogin,
        data: account
    });
}
// get 获取用户信息
export function requestUserInfoById(id) {
    return hyRequest.get({
        url: LoginAPI.LoginUserInfo + id
    });
}
// get 获取主页菜单角色id
export function requestUserMenuByRoleId(id) {
    return hyRequest.get({
        url: LoginAPI.UserMenus + id + '/menu'
    });
}
//# sourceMappingURL=LoginRequest.js.map