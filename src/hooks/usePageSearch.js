import { ref } from "vue";
export function usePageSearch() {
    // 拿到组件实例，就可以调用组件内部的方法
    const pageContentRef = ref();
    const handleResetBtnClick = () => {
        pageContentRef.value?.getPageData();
    };
    const handleQueryBtnClick = (queryInfo) => {
        pageContentRef.value?.getPageData(queryInfo);
    };
    return [pageContentRef, handleResetBtnClick, handleQueryBtnClick];
}
//# sourceMappingURL=usePageSearch.js.map