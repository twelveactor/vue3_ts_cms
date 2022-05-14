import {ILoginState} from "@/store/login/types";
import {ISystemState} from "@/store/main/system/types";
import {IDashBoard} from "@/store/analysis/type";

// 属于根 state 的类型
export interface IRootState {
    name: string,
    password: string,
    // 部门数据
    entireDepartment: any[],
    // 角色数据
    entireRole: any[],
    // 菜单数据
    entireMenu: any[]
}

// 属于划分的子模块的类型
export interface IRootWithModule {
    login: ILoginState
    system: ISystemState
    dashboardModel: IDashBoard
}

// 联合类型，表示主模块和子模块的类型结合在一起
export type IStoreType = IRootWithModule & IRootState