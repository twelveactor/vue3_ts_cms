import HYRequest from "@/service/request";
import {BASE_URL, TIME_OUT} from "@/service/request/config";
import LocalCache from '@/utils/Cache'

// 封装的axios请求构造有三个参数，url,timeout,和拦截器
// 此实例如果有多个需要请求的接口，非统一接口就可以创建多个实例，每个实例请求对应的接口
const hyRequest = new HYRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    showLoading: true,
    interceptors: {
        requestInterceptors: (config) => {
            // 拦截携带token
            const token = LocalCache.getCache('token')
            if (token) {
                // 也有用，通过解构将原有`config`复制一份，再拼接要添加的新属性即可
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${token}`
                }
                // ts 类型这样有误,在headers加一个!告诉ts这个东西是一定存在的,有用
                // config.headers!.Authorization = `Bearer ${token}`
                // config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        requestInterceptorsCatch: error => {
            //   console.log('请求拦截失败')
            return error
        },
        responseInterceptors: res => {
            //   console.log('响应拦截成功')
            return res
        },
        responseInterceptorsCatch: error => {
            //   console.log('响应拦截失败')
            return error
        }
    }
})

export default hyRequest