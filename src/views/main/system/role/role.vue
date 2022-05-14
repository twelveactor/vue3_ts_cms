<template>
  <div class="role">
    <page-search :search-form-config="searchFormConfig"></page-search>
    <page-content :content-table-config="contentRoleConfig"
                  page-name="role"
                  @addClick="handleAddClick"
                  @editClick="handleEditClick"></page-content>
    <page-model ref="dialogRef"
                :model-config="roleDialogModalConfig"
                page-name="role"
                :default-info="defaultInfo"
                :other-info="otherInfo">
      <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children',label: 'name',}"
          @check="handleCheckChange"
      />
    </page-model>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, ref} from 'vue'
import pageContent from "@/components/page-content";
import {contentRoleConfig} from "@/views/main/system/role/config/content.config";
import pageSearch from "@/components/page-search";
import {searchFormConfig} from './config/search.config'
import pageModel from "@/components/page-model";
import {roleDialogModalConfig} from "@/views/main/system/role/config/dialogModal.config";
import {usePageModel} from "@/hooks/usePageModel";
import {useStore} from "@/store";
import {menuMapLeafKeys} from "@/utils/map-menus";
import {ElTree} from "element-plus";

export default defineComponent({
  name: 'role',
  components: {
    pageContent,
    pageSearch,
    pageModel
  },

  setup() {

    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const EditCallbackFn = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [dialogRef, defaultInfo, handleEditClick, handleAddClick] = usePageModel(undefined, EditCallbackFn)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    // 用于保存选中的数据
    const otherInfo = ref({})

    // 点击节点复选框之后触发
    // 共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象
    // 包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = {menuList}
    }
    return {
      contentRoleConfig,
      searchFormConfig,
      roleDialogModalConfig,
      dialogRef,
      defaultInfo,
      handleAddClick,
      handleEditClick,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
