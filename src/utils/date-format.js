import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export function formatUtcString(utcString, format = DATE_TIME_FORMAT) {
    return dayjs.utc(utcString).utcOffset(8).format(format);
}
//# sourceMappingURL=date-format.js.map