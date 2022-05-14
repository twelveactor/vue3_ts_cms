export const contentMenuConfig = {
    title: '菜单列表',
    propsList: [
        {prop: 'name', label: '菜单名称', minWidth: '100', slotName: 'name'},
        {prop: 'type', label: '类型', minWidth: '100', slotName: 'type'},
        {prop: 'url', label: '菜单url', minWidth: '100', slotName: 'url'},
        {prop: 'icon', label: '菜单icon', minWidth: '100', slotName: 'icon'},
        {prop: 'createAt', label: '创建时间', minWidth: '100', slotName: 'createAt'},
        {prop: 'updateAt', label: '更新时间', minWidth: '100', slotName: 'updateAt'},
        {label: '操作', minWidth: '120', slotName: 'handler'},
    ],
    // 控制表单数据是否显示序列号
    showIndexColumn: false,
    // 是否显示全选列
    showSelectColumn: false,
    // 是否显示展开项
    childrenProps: {
        rowKey: 'id',
        treeProp: {
            children: 'children'
        }
    },
    showFooter: false
}



