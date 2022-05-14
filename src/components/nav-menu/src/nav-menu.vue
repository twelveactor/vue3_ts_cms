<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.svg" alt="vue3+ts">
      <span v-if="collapse===false">Vue3+TS</span>
    </div>

    <el-menu
        class="el-menu-vertical"
        background-color="#0c2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
        :collapse="collapse"
        :default-active="defaultValue"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单的可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!--              <i v-if="item.icon" :class="item.icon"></i>-->
              <el-icon>
                <component :is="icons(item.icon)"/>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
                <!--                <i v-if="subitem.icon" :class="subitem.icon"></i>-->
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>

  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import {useStore} from 'vuex'
import {Check} from '@element-plus/icons-vue'
import {useRoute, useRouter} from "vue-router";
import ElIcon from 'element-plus/es/components/icon';
import {pathMaoToMenu} from "@/utils/map-menus";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // 使用 store ,需要使用解构vuex的一个方法
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenu)

    const router = useRouter()
    // 监听菜单栏的点击
    const handleItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }

    // element 图标
    const icons = (icon: string) => {
      return icon.split('el-icon-')[1]
    }

    // 菜单当前活动页
    const route = useRoute()
    // 获取当前点击的页面路径
    const currentPath = route.path
    const menu = pathMaoToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')

    return {
      userMenus,
      Check,
      handleItemClick,
      icons,
      defaultValue
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  //active-text-color: #ffd04b;
  //background-color: #545c64;

  .logo {
    width: 100%;
    height: 28px;
    color: #f6f6f6;
    font-weight: bold;
    padding: 12px 10px 8px 10px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    font-size: 16px;

    img {
      height: 100%;
      margin: 0 10px;
    }

  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }


  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);

  }

}


</style>