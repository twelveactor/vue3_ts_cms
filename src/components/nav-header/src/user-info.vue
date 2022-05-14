<template>
  <div class="user-info">
    <el-dropdown>
    <span class="el-dropdown-link">
     <span>{{ name }}</span>
     <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                class="avatar-img"/>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import {useStore} from "vuex";
import LocalCache from '@/utils/Cache'
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => {
      return store.state.login.userInfo.name
    })

    // 退出按钮
    const router = useRouter()
    const handleExitClick = () => {
      LocalCache.deleteCache('token')
      router.push('/main')
    }
    return {
      name,
      handleExitClick
    }
  }
})
</script>

<style scoped lang="less">


.el-dropdown-link {
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .avatar-img {
    height: 30px;
    width: 30px;
    margin-left: 10px;
  }
}
</style>