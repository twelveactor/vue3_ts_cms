<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <!-- <slot name="right"></slot> -->
        </div>
      </template>
      <div class="item">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.box-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.item {
  margin-bottom: 20px;
}
</style>