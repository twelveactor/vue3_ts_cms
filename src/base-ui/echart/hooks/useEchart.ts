// 封装echarts
import * as echarts from 'echarts'
import ChinaMapData from '../data/china.json'

echarts.registerMap('china', ChinaMapData)

// 参数传递dom节点
export default function (el: HTMLHtmlElement) {

    const echartsInstance = echarts.init(el)

    // 主动调整图标大小
    const upResize = () => {
        echartsInstance.resize()
    }

    const setOptions = (options: echarts.EChartsOption) => {

        // 当浏览器大小变化时，让图表图形变成响应式
        window.addEventListener('resize', () => {
            // echarts实例中有个调整大小的方法
            echartsInstance.resize()
        })

        echartsInstance.setOption(options)
    }

    return {echartsInstance, setOptions, upResize}
}