export const contentTableConfig = {
    title: '用户列表',
    propsList: [
        { prop: 'name', label: '用户名', minWidth: '100', slotName: 'name' },
        { prop: 'realname', label: '真实姓名', minWidth: '100', slotName: 'realname' },
        { prop: 'cellphone', label: '手机号码', minWidth: '100', slotName: 'cellphone' },
        { prop: 'enable', label: '状态', minWidth: '100', slotName: 'enable' },
        { prop: 'createAt', label: '创建时间', minWidth: '100', slotName: 'createAt' },
        { prop: 'updateAt', label: '更新时间', minWidth: '100', slotName: 'updateAt' },
        { label: '操作', minWidth: '120', slotName: 'handler' },
    ],
    // 控制表单数据是否显示序列号
    showIndexColumn: true,
    // 是否显示全选列
    showSelectColumn: true
};
//# sourceMappingURL=pageContent.config.js.map