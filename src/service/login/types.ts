// post登录需要的账号和密码
export interface IAccount {
    name: string,
    password: string
}

// 接收post响应的登录数据
export interface ILoginResult {
    id: number,
    name: string,
    token: string
}
