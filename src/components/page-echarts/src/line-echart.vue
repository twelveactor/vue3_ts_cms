<template>
  <div class="lane-echarts">
    <base-echarts :options="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import baseEcharts from '@/base-ui/echart/src/baseEchart.vue';

export default defineComponent({
  components: {
    baseEcharts
  },
  props: {
    xLabels: {
      type: Array,
      default: []
    },
    value: {
      type: Array,
      default: []
    }
  },
  setup(props) {

    const option = {
      color: ['#FFBF00', '#80FFA5', '#00DDFF', '#37A2FF', '#FF0087'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: props.xLabels
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '销量',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series'
          },
          data: props.value
        }
      ]
    }

    return {
      option
    }
  }
})
</script>

<style scoped lang="less">

</style>