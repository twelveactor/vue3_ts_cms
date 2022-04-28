import {App} from 'vue'
import registerElement from './register-element'

// 配置element plus
export function globalRegister(app: App): void {
    app.use(registerElement)
}