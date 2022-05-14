import {ref} from "vue";
import pageContent from "@/components/page-content";

export function usePageSearch() {
    // 拿到组件实例，就可以调用组件内部的方法
    const pageContentRef = ref<InstanceType<typeof pageContent>>()

    const handleResetBtnClick = () => {
        pageContentRef.value?.getPageData()
    }

    const handleQueryBtnClick = (queryInfo: any) => {
        pageContentRef.value?.getPageData(queryInfo)
    }

    return [pageContentRef, handleResetBtnClick, handleQueryBtnClick]
}