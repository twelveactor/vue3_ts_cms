// rules 验证规则
export const account_rules = {
    name: [
        { required: true, message: '账号名称不能为空!', trigger: 'blur' },
        { pattern: /^[a-z0-9]{5,10}$/, message: '用户名为必须是5-10个字符或者数字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空!', trigger: 'blur' },
        { pattern: /^[a-z0-9]{6,}$/, message: '密码长度为不少于6位的字符或者数字', trigger: 'blur' },
    ]
};
export const phone_rules = {
    number: [
        { required: true, message: '电话号码不能为空!', trigger: 'blur' },
        { pattern: /^[0-11]{11}$/, message: '电话号码为11位，请检查是否有误', trigger: 'blur' },
    ],
    code: [
        { required: true, message: '验证码不能为空!', trigger: 'blur' },
        { pattern: /^[a-z0-9]{6,}$/, message: '验证码长度为不少于6位的字符或者数字', trigger: 'blur' },
    ]
};
//# sourceMappingURL=rules_config.js.map