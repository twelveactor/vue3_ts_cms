<template>
  <div class="menu">
    <page-content :content-table-config="contentMenuConfig" page-name="menu"></page-content>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import pageContent from "@/components/page-content";
import {contentMenuConfig} from "@/views/main/system/menu/config/content.config";

export default defineComponent({
  name: 'menus',
  components: {
    pageContent
  },
  setup() {
    return {
      contentMenuConfig
    }
  }
})
</script>

<style scoped></style>
