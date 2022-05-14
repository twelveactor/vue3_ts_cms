import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import store, {setupStore} from "@/store";
import {globalRegister} from "@/global";
// 导入初始化样式
import 'normalize.css/normalize.css'
import '@/assets/css/index.less'
import * as ElIcons from '@element-plus/icons-vue'
import ElementPlus from "element-plus";
// 创建app
const app = createApp(App)

app.use(store)
setupStore()
app.use(router)
// 第一种方式：配置element plus,第二种是直接根据官网的方式进行，为了练习，目前先按照老师的来
globalRegister(app)
// app.use(globalRegister)
for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
}
app.use(ElementPlus)

// 挂载
app.mount('#app')

// 通过service统一的出口进行调用封装的实例对象方法，可以请求到数据