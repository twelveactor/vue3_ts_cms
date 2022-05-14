<template>
  <div class="pie-echarts">
    <base-echarts :options="option"></base-echarts>

  </div>
</template>

<script setup lang="ts">
import baseEcharts from '@/base-ui/echart/src/baseEchart.vue';
import {EChartsOption} from "echarts";
import {ISeriesDataType} from "@/components/page-echarts/type";
import {computed} from "vue";

const props = defineProps<{
  pieData: ISeriesDataType[]
}>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        saveAsImage: {show: true}
      }
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})

</script>


<style scoped lang="less">

</style>