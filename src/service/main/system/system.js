import hyRequest from "@/service";
export function getPageListData(url, queryInfo) {
    return hyRequest.post({
        url: url,
        data: queryInfo
    });
}
// 删除数据：url: /users/id
export function deletePageData(url) {
    return hyRequest.delete({
        url: url
    });
}
// 新建用户
export function createPageData(url, newData) {
    return hyRequest.post({
        url: url,
        data: newData
    });
}
// 编辑用户
export function editPageData(url, editData) {
    return hyRequest.patch({
        url: url,
        data: editData
    });
}
//# sourceMappingURL=system.js.map