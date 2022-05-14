import { ref } from "vue";
// 接受两个函数参数
export function usePageModel(addCb, editCb) {
    // 拿到dialog的组件实例
    const dialogRef = ref();
    // 编辑按钮内容数据默认初始化值为空，用于如果当前行有数据暂存进行回显的
    const defaultInfo = ref({});
    // 监听发送过来的编辑按钮发送过来的数据
    const handleEditClick = (row) => {
        // 编辑情况下回显本行数据
        defaultInfo.value = { ...row };
        if (dialogRef.value) {
            dialogRef.value.dialogVisible = true;
        }
        // 当editCb 有值的时候就对其进行调用
        editCb && editCb(row);
    };
    // 监听发送过来的添加按钮发送过来的数据
    const handleAddClick = () => {
        // 添加情况给空对象
        defaultInfo.value = {};
        if (dialogRef.value) {
            dialogRef.value.dialogVisible = true;
        }
        addCb && addCb();
    };
    return [dialogRef, defaultInfo, handleEditClick, handleAddClick];
}
//# sourceMappingURL=usePageModel.js.map