import { createRouter, createWebHashHistory } from "vue-router";
import LocalCache from '@/utils/Cache';
import mainContent from "@/views/main/main-content.vue";
import { firstMenu } from "@/utils/map-menus";
const user = () => import('@/views/main/system/user/user.vue');
const role = () => import('@/views/main/system/role/role.vue');
const menu = () => import('@/views/main/system/menu/menu.vue');
const department = () => import('@/views/main/system/department/department.vue');
const category = () => import('@/views/main/system/category/category.vue');
const dashboard = () => import('@/views/main/analysis/dashboard/dashboard.vue');
const overview = () => import('@/views/main/analysis/overview/overview.vue');
const goods = () => import('@/views/main/product/goods/goods.vue');
// vue-router中有ts定义的类型RouteRecordRaw[]
const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/login',
        component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/main',
        component: () => import('@/views/main/Main.vue'),
        children: [
            { path: '/mainContent', component: mainContent },
            { path: '/main/system/user', component: user, children: [] },
            { path: '/main/system/role', component: role, children: [] },
            { path: '/main/system/menu', component: menu, children: [] },
            { path: '/main/system/department', component: department, children: [] },
            { path: '/main/system/category', component: category, children: [] },
            { path: '/main/analysis/dashboard', component: dashboard, children: [] },
            { path: '/main/analysis/overview', component: overview, children: [] },
            { path: '/main/product/goods', component: goods, children: [] }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/not-found/not-found.vue')
    }
];
const router = createRouter({
    routes,
    history: createWebHashHistory()
});
router.beforeEach((to) => {
    if (to.path !== '/login') {
        if (!LocalCache.getCache('token')) {
            return '/login';
        }
    }
    // 自定义重定向
    if (to.path === '/main') {
        return firstMenu.url;
    }
});
export default router;
//# sourceMappingURL=index.js.map