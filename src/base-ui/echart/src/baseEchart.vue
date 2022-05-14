<template>
  <div class="base-echarts">
    <div ref="echartsDivRef" :style="{width:width,height:height}"></div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref, watchEffect} from "vue";
import {EChartsOption} from 'echarts'
import useEchart from "@/base-ui/echart/hooks/useEchart";

// 定义props,TS写法
// 要使定义的有默认值，需使用withDefaults
const props = withDefaults(defineProps<{
  // 图标狂宽度和高度是必须有的
  width?: string,
  height?: string,
  // 图表数据
  options: EChartsOption
}>(), {
  width: '100%',
  height: '360px'
})


// 获取dom元素
const echartsDivRef = ref<HTMLHtmlElement>()

// 在onMounted周期函数中使用封装好的echarts
onMounted(() => {
  const {setOptions} = useEchart(echartsDivRef.value!)

  // 监听配置数据，当数据改变重新调用获取新数据
  watchEffect(() => {
    setOptions(props.options)
  })
})

</script>

<style scoped>

</style>