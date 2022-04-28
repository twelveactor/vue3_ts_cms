// 根据 process.env.NODE_ENV
// 开发环境：development
// 生产环境：production
// 测试环境：test

let BASE_URL = 'http://152.136.185.210:7878/api/hy66'
let TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://152.136.185.210:7878/api/hy66'
} else if (process.env.NODE_ENV === 'production') {
    BASE_URL = 'http://152.136.185.210:7878/api/hy66'
} else {
    BASE_URL = 'http://152.136.185.210:7878/api/hy66'
}

// 向外暴露
export {BASE_URL, TIME_OUT}