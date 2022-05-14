<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="footer">
          <el-button @click="handleReSetClick">重置</el-button>
          <el-button @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HyForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, {emit}) {
    // 双向绑定的数据应该是由配置文件的field来决定的
    // 优化一：动态定义formData的数据
    // 获取配置文件的formItems项数据
    const formItem = props.searchFormConfig?.formItems ?? []
    // 遍历每一个对象，获取到field值
    const formOriginData: any = {}
    for (const item of formItem) {
      // console.log(item.field) // id name password sport
      // 给对象获取配置文件field值并给他进行初始化
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    // 优化二：当用户点击重置按钮
    const handleReSetClick = () => {
      // 重置输入框中的数据
      // formData.value = formOriginData
      // for (const key in formOriginData) {
      // console.log(formOriginData[key]) // 空
      // console.log(formData.value[`${key}`]) // 输入框中有数据时就是填写的数据
      // formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 优化三：当用户点击查询按钮的时候
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleReSetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.footer {
  text-align: right;
  margin: 0 40px 0 0;
  padding: 10px;
}
</style>