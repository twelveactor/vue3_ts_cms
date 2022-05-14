// 根据 process.env.NODE_ENV
// 开发环境：development
// 生产环境：production
// 测试环境：test
let BASE_URL = '';
let TIME_OUT = 10000;
if (process.env.NODE_ENV === 'development') {
    BASE_URL = '/api';
}
else if (process.env.NODE_ENV === 'production') {
    BASE_URL = '/api';
}
else {
    BASE_URL = '/api';
}
// 向外暴露
export { BASE_URL, TIME_OUT };
//# sourceMappingURL=config.js.map