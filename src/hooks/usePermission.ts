// 菜单用户权限
import {useStore} from "@/store";

export function usePermission(pageName: string, handleName: string) {
    // 从vuex中拿到菜单权限数据
    const store = useStore()
    const permissions = store.getters[`login/getPermissionData`]
    const verifyPermission = `system:${pageName}:${handleName}`

    return !!permissions.find((item: any) => item === verifyPermission)
}