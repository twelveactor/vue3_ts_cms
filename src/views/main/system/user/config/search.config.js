export const searchFormConfig = {
    labelWidth: '120px',
    itemStyle: {
        padding: '0 40px'
    },
    formItems: [
        {
            field: 'id',
            type: 'input',
            label: 'ID',
            placeholder: '请输入ID'
        },
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
            field: 'cellphone',
            type: 'input',
            label: '电话号码',
            rules: [],
            placeholder: '请输入电话号码'
        },
        {
            field: 'enable',
            type: 'select',
            label: '用户状态',
            rules: [],
            placeholder: '请输入用户状态',
            options: [
                { title: '启用', value: 1 },
                { title: '禁用', value: 0 },
            ]
        },
        {
            field: 'createAt',
            type: 'datepicker',
            label: '创建时间',
            otherOptions: {
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
                type: 'daterange'
            }
        }
    ]
};
//# sourceMappingURL=search.config.js.map