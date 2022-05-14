// 登录接口请求封装
import {IAccount, ILoginResult} from "@/service/login/types";
import hyRequest from "@/service";
import {IDateType} from "@/service/types";


enum LoginAPI {
    AccountLogin = '/login',
    LoginUserInfo = '/users/',
    UserMenus = '/role/'
}

// post 登录请求
export function accountLoginRequest(account: IAccount) {
    return hyRequest.post<IDateType<ILoginResult>>({
        url: LoginAPI.AccountLogin,
        data: account
    })
}

// get 获取用户信息
export function requestUserInfoById(id: number) {
    return hyRequest.get<any>({
        url: LoginAPI.LoginUserInfo + id
    })
}

// get 获取主页菜单角色id
export function requestUserMenuByRoleId(id: number) {
    return hyRequest.get<any>({
        url: LoginAPI.UserMenus + id + '/menu'
    })
}