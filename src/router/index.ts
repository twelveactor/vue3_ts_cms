import {createRouter, createWebHashHistory} from "vue-router";
import {RouteRecordRaw} from 'vue-router'

// vue-router中有ts定义的类型RouteRecordRaw[]
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/main',
        component: () => import('@/views/main/Main.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router