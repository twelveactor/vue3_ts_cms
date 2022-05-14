// dialog配置文件
export const roleDialogModalConfig = {
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '角色名',
            rules: [],
            placeholder: '请输入角色名'
        },
        {
            field: 'intro',
            type: 'input',
            label: '权限介绍',
            rules: [],
            placeholder: '请输入权限介绍'
        }
        // {
        //     field: 'departmentId',
        //     type: 'select',
        //     label: '选择部门',
        //     rules: [],
        //     placeholder: '请选择部门',
        //     options: []
        // },
        // {
        //     field: 'roleId',
        //     type: 'select',
        //     label: '选择角色',
        //     rules: [],
        //     placeholder: '请选择角色',
        //     options: []
        // }
    ],
    colLayout: { span: 24 },
    itemStyle: {}
};
//# sourceMappingURL=dialogModal.config.js.map