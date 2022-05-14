import { coordinateData } from './CoordinateData';
export const convertData = function (data) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
        const geoCoord = coordinateData[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
//# sourceMappingURL=convert-data.js.map