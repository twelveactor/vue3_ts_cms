export const contentGoodsConfig = {
    title: '商品列表',
    propsList: [
        { prop: 'name', label: '商品名称', minWidth: '120', slotName: 'name' },
        { prop: 'oldPrice', label: '原价格', minWidth: '60', slotName: 'oldPrice' },
        { prop: 'newPrice', label: '折扣格', minWidth: '60', slotName: 'newPrice' },
        { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'imgUrl' },
        { prop: 'status', label: '状态', minWidth: '60', slotName: 'status' },
        { prop: 'createAt', label: '创建时间', minWidth: '100', slotName: 'createAt' },
        { prop: 'updateAt', label: '更新时间', minWidth: '100', slotName: 'updateAt' },
        { label: '操作', minWidth: '100', slotName: 'handler' }
    ],
    // 控制表单数据是否显示序列号
    showIndexColumn: true,
    // 是否显示全选列
    showSelectColumn: false
};
//# sourceMappingURL=content.config.js.map