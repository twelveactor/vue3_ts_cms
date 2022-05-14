import {createStore, Store, useStore as useVuexStore} from "vuex";
import {IRootState, IStoreType} from "@/store/types";
import login from "@/store/login/login";
import system from "@/store/main/system/system";
import {getPageListData} from "@/service/main/system/system";
import {dashboardModel} from "@/store/analysis/dashboard";

const store = createStore<IRootState>({
    state() {
        return {
            name: '',
            password: '',
            entireDepartment: [],
            entireRole: [],
            entireMenu: []
        }
    },
    mutations: {
        changeEntireDepartment(state, list) {
            state.entireDepartment = list
        },
        changeEntireRole(state, list) {
            state.entireRole = list
        },
        changeEntireMenu(state, list) {
            state.entireMenu = list
        }
    },
    getters: {},
    actions: {
        // 获取角色，部门全部 初始(Initial)数据
        async getInitialDataAction({commit}) {
            // 1、请求部门和角色数据
            const departmentResult = await getPageListData('/department/list', {offset: 0, size: 100})
            const roleResult = await getPageListData('/role/list', {offset: 0, size: 100})
            const menuResult = await getPageListData('/menu/list', {offset: 0, size: 100})
            // 拿到data/list数据，并起别名
            const {list: departmentList} = departmentResult.data
            const {list: roleList} = roleResult.data
            const {list: menuList} = menuResult.data

            // 2、保存数据
            commit('changeEntireDepartment', departmentList)
            commit('changeEntireRole', roleList)
            commit('changeEntireMenu', menuList)

        }
    },
    modules: {
        login,
        system,
        dashboardModel
    }

})

export function setupStore() {
    // 调用进行本地存储token，和菜单用户信息
    store.dispatch('login/loadLocalLogin')

    // 调用getInitialDataAction获取角色，部门全部信息
    store.dispatch('getInitialDataAction')

    //
    store.dispatch('dashboardModel/getDashboardDataAction')
}

export function useStore(): Store<IStoreType> {
    return useVuexStore()
}

export default store