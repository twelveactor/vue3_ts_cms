import hyRequest from "@/service";
import {IDateType} from "@/service/types";

export function getPageListData(url: string, queryInfo: any) {
    return hyRequest.post<IDateType>({
        url: url,
        data: queryInfo
    })
}

// 删除数据：url: /users/id
export function deletePageData(url: string) {
    return hyRequest.delete<IDateType>({
        url: url
    })
}

// 新建用户
export function createPageData(url: string, newData: any) {
    return hyRequest.post<IDateType>({
        url: url,
        data: newData
    })
}

// 编辑用户
export function editPageData(url: string, editData: any) {
    return hyRequest.patch<IDateType>({
        url: url,
        data: editData
    })

}