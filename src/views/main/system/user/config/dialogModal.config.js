// dialog配置文件
export const dialogModalConfig = {
    formItems: [
        {
            field: 'name',
            type: 'input',
            label: '用户名',
            rules: [],
            placeholder: '请输入用户名'
        },
        {
            field: 'realname',
            type: 'input',
            label: '姓名',
            rules: [],
            placeholder: '请输入姓名'
        },
        {
            field: 'password',
            type: 'password',
            label: '用户密码',
            rules: [],
            placeholder: '请输入用户密码',
            // 控制form表格是否回显当前字段数据
            isHidden: false
        },
        {
            field: 'cellphone',
            type: 'input',
            label: '电话号码',
            rules: [],
            placeholder: '请输入电话号码'
        },
        {
            field: 'departmentId',
            type: 'select',
            label: '选择部门',
            rules: [],
            placeholder: '请选择部门',
            options: []
        },
        {
            field: 'roleId',
            type: 'select',
            label: '选择角色',
            rules: [],
            placeholder: '请选择角色',
            options: []
        }
    ],
    colLayout: { span: 24 },
    itemStyle: {}
};
//# sourceMappingURL=dialogModal.config.js.map