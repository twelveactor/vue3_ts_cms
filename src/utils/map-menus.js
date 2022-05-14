// 所有路径的第一个路径名称
let firstMenu = null;
// 映射路由
export function mapMenusToRouter(userMenus) {
    const routes = [];
    // 1、先去加载默认所有的router
    const allRoutes = [];
    // 手动一个一个导入路由文件太麻烦
    // 通过webpack中的方法 require.context()进行添加,true 表示要不要进行递归的查找,匹配以。ts结尾的文件
    const routeFiles = require.context('../router/main', true, /\.ts/);
    // 拿到所有映射路由的路径，也就是@/router/main 下所有ts结尾的路由文件
    routeFiles.keys().forEach((key) => {
        const route = require('../router/main' + key.split('.')[1] + '.ts');
        allRoutes.push(route.default);
        // console.log(key) //./analysis/dashboard/dashboard.ts
        // console.log(route.default) //{path: '/main/analysis/dashboard', name: 'dashboard', children: Array(0), component: ƒ}
    });
    // console.log(allRoutes)
    // 2、根据菜单获取需要添加的routes
    // 递归回去二级菜单type
    const _recurseGetRoute = (menus) => {
        for (const menu of menus) {
            // 已经通过递归进入到了children的2级菜单
            if (menu.type === 2) {
                const route = allRoutes.find((route) => route.path === menu.url);
                if (route)
                    routes.push(route);
                // 保存第一个菜单路径，作为重定向页面
                if (!firstMenu) {
                    firstMenu = menu;
                }
            }
            else {
                // 递归调用
                // 一进来type类型一定是1的，所以递归回去其children,
                _recurseGetRoute(menu.children);
                // arguments.callee 是一个指向正在执行的函数的指针，可以用来代替函数的递归调用
                // 代表的递归写法就是_recurseGetRoute(menu.children)
                // return arguments.callee(menu.children)
            }
        }
    };
    _recurseGetRoute(userMenus);
    return routes;
}
// 当前菜单选中的页面映射路径
export function pathMaoToMenu(userMenus, currentPath, breadcrumbs) {
    for (const menu of userMenus) {
        if (menu.type === 1) {
            const findMenu = pathMaoToMenu(menu.children ?? [], currentPath);
            if (findMenu) {
                breadcrumbs?.push({ name: menu.name });
                breadcrumbs?.push({ name: findMenu.name });
                return findMenu;
            }
        }
        else if (menu.type === 2 && menu.url === currentPath) {
            return menu;
        }
    }
}
// 获取当前选中的栏目在面包屑体现出来,因为跟上面这个pathMaoToMenu方法类型，所以进行合并
export function pathMapBreadcrumb(userMenus, currentPath) {
    const breadcrumbs = [];
    pathMaoToMenu(userMenus, currentPath, breadcrumbs);
    return breadcrumbs;
}
// 获取菜单第三级中的按钮权限名称
export function mapMenusToPermissions(userMenus) {
    // 定义一个变量进行存储第三级权限名称的数组
    const permissions = [];
    // 递归遍历获取三级数据
    const _recurseGetPermission = (menus) => {
        for (const menu of menus) {
            if (menu.type === 1 || menu.type === 2) {
                // 如果是第一级或者是第二季菜单，在进行递归深入,在继续向下遍历的过程中有可能是个空，如果是空就给个空数组
                _recurseGetPermission(menu.children ?? []);
            }
            else if (menu.type === 3) {
                // 如果是第三级就存储该数据
                permissions.push(menu.permission);
            }
        }
    };
    _recurseGetPermission(userMenus);
    return permissions;
}
// 获取菜单树形叶子节点的key,叶子节点选中了他的父级会是半选中，叶子节点全选中父节点就是全选中，类似全选全不选
export function menuMapLeafKeys(menuList) {
    const leafKeys = [];
    // 递归获取叶子节点
    const _recurseGetLeaf = (menuList) => {
        for (const menu of menuList) {
            // 判断如果children有值继续递归调用
            if (menu.children) {
                _recurseGetLeaf(menu.children);
            }
            else {
                leafKeys.push(menu.id);
            }
        }
    };
    _recurseGetLeaf(menuList);
    return leafKeys;
}
export { firstMenu };
//# sourceMappingURL=map-menus.js.map