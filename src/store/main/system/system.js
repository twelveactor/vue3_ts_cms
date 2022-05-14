import { createPageData, deletePageData, editPageData, getPageListData } from "@/service/main/system/system";
const systemModule = {
    // 子组件vuex模块必须开启命名空间
    namespaced: true,
    state() {
        return {
            usersList: [],
            usersCount: 0,
            roleList: [],
            roleCount: 0,
            goodsList: [],
            goodsCount: 0,
            menuList: [],
            menuCount: 0
        };
    },
    mutations: {
        changeUsersList(state, userList) {
            state.usersList = userList;
        },
        changeUsersCount(state, userCount) {
            state.usersCount = userCount;
        },
        changeRoleList(state, roleList) {
            state.roleList = roleList;
        },
        changeRoleCount(state, roleCount) {
            state.roleCount = roleCount;
        },
        changeGoodsList(state, goodsList) {
            state.goodsList = goodsList;
        },
        changeGoodsCount(state, goodsCount) {
            state.goodsCount = goodsCount;
        },
        changeMenuList(state, menuList) {
            state.menuList = menuList;
        },
        changeMenuCount(state, menuCount) {
            state.menuCount = menuCount;
        }
    },
    getters: {
        // 改变page-content组件拿vuex中userList和RoleList数据的方法，通过getter方法
        pageListData(state) {
            return (pageName) => {
                // 根据pageName名称返回相应的数据
                return state[`${pageName}List`];
                // switch (pageName) {
                //     case 'users':
                //         return state.usersList
                //     case 'role':
                //         return state.roleList
                // }
            };
        },
        pageCountData(state) {
            return (pageName) => {
                // 根据pageName名称返回相应的数据
                return state[`${pageName}Count`];
            };
        }
    },
    actions: {
        // 获取用户数据
        async getPageListAction({ commit }, payload) {
            // 1、配置pageUrl
            const pageName = payload.pageName;
            let pageUrl = `/${pageName}/list`;
            // switch (pageName) {
            //     case 'users':
            //         pageUrl = '/users/list'
            //         break
            //     case 'role':
            //         pageUrl = '/role/list'
            //         break
            // }
            // 2、对页面发送请求
            const pageResult = await getPageListData(pageUrl, payload.queryInfo);
            // 3、存储数据
            const { list, totalCount } = pageResult.data;
            // 拼接字符串，根据传过来的请求内容申请对应的资源，首先先把首字母大写
            // user => User  role => Role
            const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
            commit(`change${changePageName}List`, list);
            commit(`change${changePageName}Count`, totalCount);
            // switch (pageName) {
            //     case 'users':
            //         commit('changeUserList', list)
            //         commit('changeUserCount', totalCount)
            //         break
            //     case 'role':
            //         commit('changeRoleList', list)
            //         commit('changeRoleCount', totalCount)
            //         break
            // }
        },
        // 删除用户数据
        async deletePageDataActions({ dispatch }, payload) {
            // 1、pageName =>  /pageName/id
            const { pageName, id } = payload;
            const pageUrl = `/${pageName}/${id}`;
            // 2、发送删除网络请求
            await deletePageData(pageUrl);
            // 3、重新拉取数据
            dispatch('getPageListAction', {
                pageName: pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            });
        },
        // 新建用户
        async createPageDataActions({ dispatch }, payload) {
            // 1、创建请求
            const { pageName, newData } = payload;
            const pageUrl = `/${pageName}`;
            await createPageData(pageUrl, newData);
            // 2、重新刷新数据
            dispatch('getPageListAction', {
                pageName: pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            });
        },
        // 编辑用户
        async editPageDataActions({ dispatch }, payload) {
            // 1、创建请求
            const { pageName, editData, id } = payload;
            const pageUrl = `/${pageName}/${id}`;
            await editPageData(pageUrl, editData);
            // 2、重新刷新数据
            dispatch('getPageListAction', {
                pageName: pageName,
                queryInfo: {
                    offset: 0,
                    size: 10
                }
            });
        }
    }
};
export default systemModule;
//# sourceMappingURL=system.js.map