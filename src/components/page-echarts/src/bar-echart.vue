<template>
  <div class="bar-echarts">
    <base-echarts :options="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import baseEcharts from "@/base-ui/echart/src/baseEchart.vue";
import {computed, defineComponent} from "vue";
import * as echarts from 'echarts'

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

    const option = computed(() => {
      return {
        title: {
          text: '渐变 点击缩放'
        },
        xAxis: {
          data: props.xLabels,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        toolbox: {
          feature: {
            dataView: {show: true, readOnly: false},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0, color: '#83bff6'},
                {offset: 0.5, color: '#188df0'},
                {offset: 1, color: '#188df0'}
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: '#2378f7'},
                  {offset: 0.7, color: '#2378f7'},
                  {offset: 1, color: '#83bff6'}
                ])
              }
            },
            data: props.value
          }
        ]
      }
    })

    return {
      option
    }
  }
})

</script>

<style scoped lang="less">

</style>