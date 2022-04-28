import axios from 'axios';
// 请求时加载组件
import { ElLoading } from 'element-plus';
// 封装了一个类
class HYRequest {
    // axios 内部已经有封装实例的类型 AxiosInstance
    instance;
    // 官方： interceptors: {request: AxiosInterceptorManager<AxiosRequestConfig>;}
    interceptor;
    showLoading;
    loading;
    // 构造函数，在创建实例的时候需要传递base_url等配置
    // 封装了一个HYRequestConfig，继承AxiosRequestConfig,拦截器继承自定义拦截接口
    // 让这个 config 有更大的扩展性,也就是主要扩展一个拦截器 interceptor
    constructor(config) {
        // 可以使调用者可以创建多个实例，互不干扰，扩展了传递的config配置
        // 把axios创建的实例赋值给 instance
        // create(config?: AxiosRequestConfig): AxiosInstance;
        this.instance = axios.create(config);
        this.interceptor = config.interceptors;
        // 如果没有传递该数据就使用 ？？ 设置默认为false
        this.showLoading = config.showLoading ?? false;
        // 可选，请求拦截,自己封装的实例拦截器
        this.instance.interceptors.request.use(this.interceptor?.requestInterceptors, this.interceptor?.requestInterceptorsCatch);
        // 可选，响应拦截,自己封装的实例拦截器
        this.instance.interceptors.response.use(this.interceptor?.responseInterceptors, this.interceptor?.responseInterceptorsCatch);
        // 全局，在添加一个所有的实例都有的拦截器
        this.instance.interceptors.request.use((config) => {
            console.log('所有实例都有的拦截器：请求拦截成功');
            // 在请求的时候显示加载,通过扩展判断是否为true开启，反之就不进行加载
            this.showLoading
                ? this.loading = ElLoading.service({
                    lock: true,
                    text: '正在请求数据....',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                : false;
            return config;
        }, (error) => {
            console.log('所有实例都有的拦截器：请求拦截失败');
            return error;
        });
        this.instance.interceptors.response.use((res) => {
            console.log('所有实例都有的拦截器：响应拦截成功');
            // 响应的成功就关闭loading
            this.showLoading ? this.loading?.close() : false;
            return res;
        }, (error) => {
            console.log('所有实例都有的拦截器：响应拦截失败');
            this.showLoading ? this.loading?.close() : false;
            return error;
        });
    }
    // 请求方法：也可以配置单独拦截，就是属于请求的拦截
    // 采用泛型，根据调用者想获取什么样的泛型数据 ， 返回什么样的泛型数据
    request(config) {
        return new Promise((resolve, reject) => {
            // 单个请求对数据config的处理， 如有interceptors拦截器不为空就进行请求拦截
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config);
            }
            // 显示隐藏loading ,根据传递过来的数据，默认为false
            this.showLoading = !!config.showLoading;
            // 因为把创建的实例赋值给了instance
            // 此处写法就是 axios.request ,因为已经把创建的实例给了instance，所有instance也有该axios所有方法
            this.instance.request(config).then((res) => {
                if (config.interceptors?.responseInterceptors) {
                    res = config.interceptors.responseInterceptors(res);
                }
                // 成功返回数据
                resolve(res);
            }).catch(err => {
                reject(err);
                return err;
            });
        });
    }
    get(config) {
        // 可变长config.method 也是AxiosRequestConfig中有用的
        return this.request({ ...config, method: 'GET' });
    }
    post(config) {
        return this.request({ ...config, method: 'POST' });
    }
    delete(config) {
        return this.request({ ...config, method: 'DELETE' });
    }
    patch(config) {
        return this.request({ ...config, method: 'PATCH' });
    }
}
export default HYRequest;
//# sourceMappingURL=index.js.map