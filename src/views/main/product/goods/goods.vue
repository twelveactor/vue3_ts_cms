<template>
  <div class="goods">
    <page-content :content-table-config="contentGoodsConfig" page-name="goods">
      <template #imgUrl="scope">
        <el-image
            style="width: 100px; height: 100px;"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import pageContent from "@/components/page-content";
import {contentGoodsConfig} from "@/views/main/product/goods/config/content.config";


export default defineComponent({
  name: 'goods',
  components: {
    pageContent
  },
  setup() {
    return {
      contentGoodsConfig
    }
  }
})
</script>

<style scoped></style>
