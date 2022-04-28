// 类型定义，抽离
// 定义拦截器钩子接口
import {AxiosRequestConfig, AxiosResponse} from "axios";

export interface HYRequestInterceptors<T = AxiosResponse> {
    // 请求拦截
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    requestInterceptorsCatch?: (error: T) => T
    // 响应拦截
    responseInterceptors?: (res: any) => any,
    responseInterceptorsCatch?: (error: any) => any
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    // 可以选择是否给实例添加属于自己的拦截器
    interceptors?: HYRequestInterceptors<T>
    // 可以选择开启是否添加loading请求加载
    showLoading?: boolean
}
