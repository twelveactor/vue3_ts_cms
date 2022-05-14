<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hy-card title="分类商品数量（饼图）">
          <pie-echarts :pie-data="categoryGoodsCount"></pie-echarts>
        </hy-card>
      </el-col>
      <el-col :span="10">
        <hy-card title="不同城市商品销量">
          <map-echarts :map-data="addressGoodsSale"></map-echarts>
        </hy-card>
      </el-col>
      <el-col :span="7">
        <hy-card title="分类商品数量（玫瑰图）">
          <rose-echarts :rose-data="categoryGoodsCount"></rose-echarts>
        </hy-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <hy-card title="分类商品销量">
          <line-echarts v-bind="categoryGoodsSale"></line-echarts>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品收藏">
          <bar-echarts v-bind="categoryGoodsFavor"></bar-echarts>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import HyCard from "@/base-ui/card/src/card.vue";
import {pieEcharts, roseEcharts, lineEcharts, barEcharts, mapEcharts} from "@/components/page-echarts";
import {useStore} from "@/store";


export default defineComponent({
  name: 'dashboard',
  components: {
    HyCard,
    pieEcharts,
    roseEcharts,
    lineEcharts,
    barEcharts,
    mapEcharts
  },
  setup() {
    const store = useStore()

    // 获取vuex中的商品数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModel.categoryGoodsCount.map(item => {
        // 因为categoryGoodsCount中的数据是id,name,goodsCount,需要映射为图标所需对应数据
        return {name: item.name, value: item.goodsCount}
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const value: string[] = []

      const categoryGoodsSale = store.state.dashboardModel.categoryGoodsSale

      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        value.push(item.goodsCount)
      }

      return {xLabels, value}
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const value: string[] = []

      const categoryGoodsFavor = store.state.dashboardModel.categoryGoodsFavor

      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        value.push(item.goodsFavor)
      }

      return {xLabels, value}
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboardModel.addressGoodsSale.map(item => {
        return {name: item.address, value: item.count}
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.el-row {
  margin-top: 10px;
}
</style>
