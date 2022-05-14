import {Module} from "vuex";
import {IRootState} from "@/store/types";
import {IDashBoard} from "@/store/analysis/type";
import {
    getAddressGoodsSale,
    getCategoryGoodsCount,
    getCategoryGoodsFavor,
    getCategoryGoodsSale
} from "@/service/main/analysis/dashboard";

export const dashboardModel: Module<IDashBoard, IRootState> = {
    namespaced: true,
    state() {
        return {
            categoryGoodsSale: [],
            categoryGoodsCount: [],
            categoryGoodsFavor: [],
            addressGoodsSale: []
        }
    },
    actions: {
        // 获取显示面板数据
        async getDashboardDataAction({commit}) {
            const categoryCountResult = await getCategoryGoodsCount()
            commit('setCategoryGoodsCount', categoryCountResult.data)

            const categorySaleResult = await getCategoryGoodsSale()
            commit('setCategoryGoodsSale', categorySaleResult.data)

            const categoryFavorResult = await getCategoryGoodsFavor()
            commit('setCategoryGoodsFavor', categoryFavorResult.data)

            const categoryAddSaleResult = await getAddressGoodsSale()
            commit('setCategoryAddSale', categoryAddSaleResult.data)
           
        }
    },
    mutations: {
        setCategoryGoodsCount(state, list) {
            state.categoryGoodsCount = list
        },
        setCategoryGoodsSale(state, list) {
            state.categoryGoodsSale = list
        },
        setCategoryGoodsFavor(state, list) {
            state.categoryGoodsFavor = list
        },
        setCategoryAddSale(state, list) {
            state.addressGoodsSale = list
        }
    },
    getters: {}
}