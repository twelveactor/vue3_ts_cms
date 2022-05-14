import {App} from 'vue'
import registerElement from './register-element'
import registerFormatTime from './register-formatTime'

// 配置element plus
export function globalRegister(app: App): void {
    // app.use(registerElement)
    app.use(registerFormatTime)
}