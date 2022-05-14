<template>
  <div class="page-content">
    <!--v-model:page="pageInfo" 意思是给双向绑定的数据起个别名，等同于modelValue => update:modelValue => page => update:page-->
    <hy-table v-bind="contentTableConfig" :list-data="dataList" :listCount="dataCount" v-model:page="pageInfo">
      <!--表头插槽-->
      <template #headerHandle>
        <el-button icon="Setting" v-if="isCreate" @click="handleAddClick">添加</el-button>
      </template>


      <!--列表内容数据-->
      <template #enable="scope">
        <el-button size="small" :typ="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启动' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <el-button size="small" type="text" icon="Edit" v-if="isUpdate" @click="handleEditClick(scope.row)">编辑
        </el-button>
        <!--        <el-popconfirm title="你确定要删除这个数据嘛！"-->
        <!--                       @confirm="confirmEvent(scope.row)">-->
        <!--          <template #reference>-->
        <el-button size="small" type="text" icon="Delete" v-if="isDelete" @click="handleDeleteClick(scope.row)">删除
        </el-button>
        <!--          </template>-->
        <!--        </el-popconfirm>-->
      </template>

      <!--遍历获取剩余动态插槽-->
      <template v-for="item in otherPropSlots"
                :key="item.prop"
                #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!--分页表尾-->
    </hy-table>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import {useStore} from "@/store";
import hyTable from '@/base-ui/tabel'
import {usePermission} from "@/hooks/usePermission";


export default defineComponent({
  components: {
    hyTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['addClick', 'editClick'],
  setup(props, {emit}) {
    // vuex状态管理器Actions异步提交dispatch用户信息数据申请
    const store = useStore()

    // 0、获取菜单三级的操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 1、双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1, pageSize: 10
    })
    watch(pageInfo, () => getPageData())

    // 2、发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // 首先先进行判断是否有查询的权限，权限都没有就不往下面查了
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3、从Vuex中获取数据，如果数据发生改变使用计算数据设置为响应式数据
    // const userList = computed(() => store.state.system.userList)
    // 以上直接通过拿取state数据不太好，封装了一个getter方法进行获取数据
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
    const dataCount = computed(() => store.getters[`system/pageCountData`](props.pageName))

    // 4、获取动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propsList.filter((item: any) => {
      // 把固定的插槽过滤掉，剩下的就都是动态的，随着业务的增减来的插槽
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false

      return true
    })

    // 5、删除/编辑/新建操作
    const handleDeleteClick = (row: any) => {
      store.dispatch('system/deletePageDataActions', {
        pageName: props.pageName,
        id: row.id
      })
    }
    const handleAddClick = () => {
      emit('addClick')
    }
    const handleEditClick = (row: any) => {
      emit('editClick', row)
    }

    // 6、删除操作确认
    // const confirmEvent = (row: any) => {
    //   console.log(row.id)
    //   handleDeleteClick(row)
    // }

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleAddClick,
      handleEditClick
      // confirmEvent
    }
  }
})
</script>

<style scoped>

</style>