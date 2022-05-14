export const contentRoleConfig = {
    title: '角色列表',
    propsList: [
        { prop: 'name', label: '用户名', minWidth: '100', slotName: 'name' },
        { prop: 'intro', label: '权限介绍', minWidth: '100', slotName: 'intro' },
        { prop: 'createAt', label: '创建时间', minWidth: '100', slotName: 'createAt' },
        { prop: 'updateAt', label: '更新时间', minWidth: '100', slotName: 'updateAt' },
        { label: '操作', minWidth: '120', slotName: 'handler' },
    ],
    // 控制表单数据是否显示序列号
    showIndexColumn: true,
    // 是否显示全选列
    showSelectColumn: true
};
//# sourceMappingURL=content.config.js.map