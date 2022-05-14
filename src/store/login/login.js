import { accountLoginRequest, requestUserInfoById, requestUserMenuByRoleId } from "@/service/login/LoginRequest";
import LocalCache from '@/utils/Cache';
import router from "@/router";
import { mapMenusToPermissions, mapMenusToRouter } from '@/utils/map-menus';
// 官方：export interface Module<S, R> module需要两个泛型，一个是此模块内的类型，一个是跟模块的类型
const loginModule = {
    namespaced: true,
    state() {
        return {
            token: '',
            userInfo: {},
            userMenu: [],
            permissions: []
        };
    },
    getters: {
        getPermissionData(state) {
            return state.permissions;
        }
    },
    actions: {
        async accountLoginAction({ commit }, payload) {
            // 实现登录
            const loginResult = await accountLoginRequest(payload);
            // commit 给state token
            const { id, token } = loginResult.data;
            commit('changeToken', token);
            LocalCache.setCache('token', token);
            // 获取用户信息
            const userInfoResult = await requestUserInfoById(id);
            const userInfo = userInfoResult.data;
            commit('changUserInfo', userInfo);
            LocalCache.setCache('userInfo', userInfo);
            // 请求用户菜单
            const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id);
            const userMenu = userMenuResult.data;
            commit("changUserMenus", userMenu);
            LocalCache.setCache('userMenu', userMenu);
            // 跳转主页面
            await router.push('/main');
        },
        loadLocalLogin({ commit }) {
            const token = LocalCache.getCache('token');
            if (token) {
                commit('changeToken', token);
            }
            const userInfo = LocalCache.getCache('userInfo');
            if (userInfo) {
                commit('changUserInfo', userInfo);
            }
            const userMenu = LocalCache.getCache('userMenu');
            if (userMenu) {
                commit("changUserMenus", userMenu);
            }
        }
    },
    mutations: {
        // 实现state token数据修改
        changeToken(state, token) {
            state.token = token;
        },
        // 实现 state userinfo 用户数据添加
        changUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        // 修改数组数据，存储主页权限信息
        changUserMenus(state, userMenu) {
            state.userMenu = userMenu;
            // userMenus => router
            const routes = mapMenusToRouter(userMenu);
            // // 将routes => router.main.children
            // // console.log(routes)
            // // 映射所有的路由
            routes.forEach(route => {
                router.addRoute('main', route);
            });
            // 获取菜单用户按钮的权限
            state.permissions = mapMenusToPermissions(userMenu);
        }
    }
};
export default loginModule;
//# sourceMappingURL=login.js.map