<template>
  <div class="nav-header">
    <el-icon :size="30">
      <component
          class="fold-menu"
          :is="iconName"
          @click="handleFoldClick"
      >

      </component>
    </el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumb="breadcrumbs"></hy-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import UserInfo from '@/components/nav-header/src/user-info.vue'
import HyBreadcrumb, {IBreadcrumb} from "@/base-ui/breadcrumb";
import {pathMapBreadcrumb} from "@/utils/map-menus";
import {useStore} from "vuex";
import {useRoute} from "vue-router";

export default defineComponent({
  components: {
    UserInfo,
    HyBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, {emit}) {
    let iconName = ref('Fold')
    const isFold = ref(false)
    // 这里是点击图标可以进行切换，自己想的实现方法，可能不太好，但是功能实现了
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      if (isFold.value == false) {
        iconName.value = 'Expand'
      } else {
        iconName.value = 'Fold'
      }
      emit('foldChange', isFold.value)
    }

    // 面包屑当前点击栏目
    const store = useStore()
    // 获取当前点击的页面路
    // 使用computed使数据变为响应式数据
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenu
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumb(userMenus, currentPath)
    })

    return {
      iconName,
      handleFoldClick,
      isFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  height: 30px;

  .fold-menu {
    cursor: pointer;
    font-size: 20px;
  }

  .content {
    flex: 1;
    padding: 0 10px 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }
}
</style>