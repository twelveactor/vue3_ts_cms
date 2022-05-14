import hyRequest from "@/service";
var dashboardAPI;
(function (dashboardAPI) {
    dashboardAPI["categoryGoodsCount"] = "/goods/category/count";
    dashboardAPI["categoryGoodsSale"] = "/goods/category/sale";
    dashboardAPI["categoryGoodsFavor"] = "/goods/category/favor";
    dashboardAPI["addressGoodsSale"] = "/goods/address/sale";
})(dashboardAPI || (dashboardAPI = {}));
export function getCategoryGoodsCount() {
    return hyRequest.get({
        url: dashboardAPI.categoryGoodsCount
    });
}
export function getCategoryGoodsSale() {
    return hyRequest.get({
        url: dashboardAPI.categoryGoodsSale
    });
}
export function getCategoryGoodsFavor() {
    return hyRequest.get({
        url: dashboardAPI.categoryGoodsFavor
    });
}
export function getAddressGoodsSale() {
    return hyRequest.get({
        url: dashboardAPI.addressGoodsSale
    });
}
//# sourceMappingURL=dashboard.js.map