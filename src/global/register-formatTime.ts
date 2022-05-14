// 格式化时间
import {App} from "vue";
import {formatUtcString} from "@/utils/date-format";

export default function registerFormatTime(app: App) {
    app.config.globalProperties.$filters = {
        formatTime(value: string) {
            return formatUtcString(value)
        }
    }
}