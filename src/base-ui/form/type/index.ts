type IFormType = 'input' | 'password' | 'select' | 'datepicker' | 'show-password'

export interface IFormItemPropsType {
    field?: string
    type?: IFormType,
    label?: string,
    rules?: any[],
    placeholder?: any,
    // 针对select
    options?: any[],
    // 针对特殊属性
    otherOptions?: any
    // 是否显示隐藏dialog中的回显数据
    isHidden?: Boolean
}

export interface IForm {
    formItems: IFormItemPropsType[],
    labelWidth?: string,
    colLayout?: any,
    itemStyle?: any
}