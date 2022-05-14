<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handle">
          <slot name="headerHandle"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData"
              border
              style="width: 100%;"
              @selection-change="handleSelectionChange"
              v-bind="childrenProps">
      <!--是否全选按钮-->
      <el-table-column v-if="showSelectColumn" type="selection" align="center"></el-table-column>
      <!--可以自定义选择有序列或者没序列-->
      <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80px"></el-table-column>

      <template v-for="propItem in propsList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!--动态作用域插槽，可以在任意列中添加自己想要的东西-->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>

    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
            v-model:currentPage="page.currentPage"
            v-model:pageSize="page.pageSize"
            :page-sizes="[5,10,20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    // 显示数据项
    propsList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'title'
    },
    listCount: {
      type: Number,
      default: 0
    },
    // 分页配置数据
    page: {
      type: Object,
      default: () => ({currentPage: 1, pageSize: 10})
    },
    // 是否显示展开项
    childrenProps: {
      type: Object,
      default: () => {
      }
    },
    // 是否显示分页器
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  // 把发送出去
  // emits: ['selectionChange', 'sizeChange', 'currentChange'],
  emits: ['selectionChange', 'update:page'],
  setup(props, {emit}) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    const handleSizeChange = (size: number) => {
      emit('update:page', {...props.page, size})
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', {...props.page, currentPage})
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-table {
  padding: 10px;
  border-top: 10px solid #f0f2f5;
  z-index: 2;
}

.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>