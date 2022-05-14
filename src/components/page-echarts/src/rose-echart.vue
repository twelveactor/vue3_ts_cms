<template>
  <div class="rose-echarts">
    <base-echarts :options="option"></base-echarts>
  </div>
</template>

<script lang="ts">

import {computed, defineComponent} from "vue";
import baseEcharts from '@/base-ui/echart';

export default defineComponent({
      components: {
        baseEcharts
      },
      props: {
        roseData: {
          type: Array,
          default: []
        }
      },
      setup(props) {
        const option = computed(() => {
          return {
            legend: {
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
                name: 'Nightingale Chart',
                type: 'pie',
                radius: [10, 100],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                  borderRadius: 8
                },
                data: props.roseData
              }
            ]
          }
        })

        return {
          option
        }
      }
    }
)

</script>


<style scoped lang="less">

</style>