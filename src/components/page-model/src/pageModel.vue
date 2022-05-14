<template>
  <div class="dialog">
    <!--dialog对话框-->
    <el-dialog v-model="dialogVisible" title="添加用户" width="30%" center draggable destroy-on-close>

      <!--dialog内容部分-->
      <hy-form v-model="formData" v-bind="modelConfig"></hy-form>

      <!--默认插槽-->
      <slot></slot>

      <!--对话框页脚提交取消按钮-->
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import HyForm from '@/base-ui/form';
import {useStore} from "@/store";

export default defineComponent({
  components: {
    HyForm
  },
  props: {
    // 要展示的模型
    modelConfig: {
      type: Object,
      required: true
    },
    // 存储表单数据
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      default: ''
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 控制dialog显示隐藏
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    watch(() => props.defaultInfo, (newValue) => {
      // 通过遍历获取modelConfig中的item数据匹配
      for (const item of props.modelConfig.formItems) {
        formData.value[`${item.field}`] = newValue[`${item.field}`]
      }
    })

    // 确认按钮
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 编辑 / 新建 数据请求
      if (Object.keys(props.defaultInfo).length) {
        store.dispatch('system/editPageDataActions', {
          pageName: props.pageName,
          editData: {...formData.value, ...props.otherInfo},
          id: props.defaultInfo.id
        })
      } else {
        store.dispatch('system/createPageDataActions', {
          pageName: props.pageName,
          newData: {...formData.value, ...props.otherInfo}
        })
      }
    }

    return {
      formData,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>

<style scoped>

</style>