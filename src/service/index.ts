import HYRequest from "@/service/request";
import {BASE_URL, TIME_OUT} from "@/service/request/config";

// 封装的axios请求构造有三个参数，url,timeout,和拦截器
// 此实例如果有多个需要请求的接口，非统一接口就可以创建多个实例，每个实例请求对应的接口
const hyRequest = new HYRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptors: config => {
            console.log('请求拦截成功')
            return config
        },
        requestInterceptorsCatch: error => {
            console.log('请求拦截失败')
            return error
        },
        responseInterceptors: res => {
            console.log('响应拦截成功')
            return res
        },
        responseInterceptorsCatch: error => {
            console.log('响应拦截失败')
            return error
        }
    }
})

export default hyRequest