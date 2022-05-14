<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig"
                 @resetBtnClick="handleResetBtnClick"
                 @queryBtnClick="handleQueryBtnClick"></page-search>
    <page-content :content-table-config="contentTableConfig"
                  page-name="users"
                  ref="pageContentRef"
                  @addClick="handleAddClick"
                  @editClick="handleEditClick"></page-content>
  </div>
  <page-model ref="dialogRef" :model-config="modalConfigRef" :default-info="defaultInfo" pageName="users"></page-model>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import pageSearch from "@/components/page-search";
import {searchFormConfig} from "@/views/main/system/user/config/search.config";
import {contentTableConfig} from "@/views/main/system/user/config/pageContent.config";
import pageContent from "@/components/page-content";
import {usePageSearch} from "@/hooks/usePageSearch";
import pageModel from "@/components/page-model/src/pageModel.vue";

import {dialogModalConfig} from "@/views/main/system/user/config/dialogModal.config";
import {usePageModel} from "@/hooks/usePageModel";
import {useStore} from "@/store";

export default defineComponent({
  name: 'users',
  components: {
    pageSearch,
    pageContent,
    pageModel
  },
  setup() {
    const [pageContentRef, handleResetBtnClick, handleQueryBtnClick] = usePageSearch()

    // 1、dialogModel 相关的hooks逻辑
    // 为了区别分开新建和编辑按钮是否回显其中的某些数据进行配置控制对应的按钮所做出的反应
    const addCallback = () => {
      // 在添加按钮点击的时候不隐藏密码input输入
      const passwordItem = dialogModalConfig.formItems.find(item => item.field === 'password')

      // !. 意思是断言一定有isHidden这个数据 ?. 意思是如果前面这个值没有为空后面的就不执行
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      // 在编辑按钮点击的时候隐藏密码input输入
      const passwordItem = dialogModalConfig.formItems.find(item => item.field === 'password')

      // !. 意思是断言一定有isHidden这个数据 ?. 意思是如果前面这个值没有为空后面的就不执行
      passwordItem!.isHidden = true
    }

    // 2、动态添加部门和角色了列表
    const store = useStore()

    // 解决获取的组件数据重新刷新显示问题
    const modalConfigRef = computed(() => {


      // 找到字段为field === departmentId 和 role的对象
      const departmentItem = dialogModalConfig.formItems.find(item => item.field === 'departmentId')
      const RoleItem = dialogModalConfig.formItems.find(item => item.field === 'roleId')


      // 找到了就为 字段为field === departmentId 和 role的空数组对象赋值vuex中保存的初始数据
      departmentItem!.options = store.state.entireDepartment.map(item => {
        return {
          title: item.name,
          value: item.id
        }
      })
      RoleItem!.options = store.state.entireRole.map(item => {
        return {
          title: item.name,
          value: item.id
        }
      })

      return dialogModalConfig
    })


    const [dialogRef, defaultInfo, handleEditClick, handleAddClick] = usePageModel(addCallback, editCallback)


    return {
      searchFormConfig,
      contentTableConfig,
      handleResetBtnClick,
      handleQueryBtnClick,
      pageContentRef,
      modalConfigRef,
      handleAddClick,
      handleEditClick,
      dialogRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less">
.userContent {
  padding: 10px;
  border-top: 10px solid #f0f2f5;

}
</style>
