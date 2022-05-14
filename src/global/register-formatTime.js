import { formatUtcString } from "@/utils/date-format";
export default function registerFormatTime(app) {
    app.config.globalProperties.$filters = {
        formatTime(value) {
            return formatUtcString(value);
        }
    };
}
//# sourceMappingURL=register-formatTime.js.map