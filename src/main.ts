import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
// import {globalRegister} from "@/global";
import hyRequest from "@/service";
// 导入初始化样式
import 'normalize.css/normalize.css'

import '@/assets/css/index.less'

// 创建app
const app = createApp(App)
// 注册路由
app.use(router)
app.use(store)
// 第一种方式：配置element plus,第二种是直接根据官网的方式进行，为了练习，目前先按照老师的来
// globalRegister(app)
// app.use(globalRegister)
// 挂载
app.mount('#app')

// 通过service统一的出口进行调用封装的实例对象方法，可以请求到数据
interface DataType {
    data: any,
    returnCode: string,
    success: boolean
}

// hyRequest.get<DataType>({
//     url: '/home/multidata',
//     showLoading: true,
//     interceptors: {
//         requestInterceptors: config => {
//             console.log('单独的拦截成功')
//             return config
//         },
//         responseInterceptors: res => {
//             console.log('单独的响应成功')
//             return res
//         }
//     }
// }).then(res => {
//     console.log(res.data)
//     console.log(res.data.returnCode)
//     console.log(res.data.success)
// })