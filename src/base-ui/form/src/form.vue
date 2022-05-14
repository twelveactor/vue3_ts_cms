<template>
  <div class="hy-form">
    <!--具名插槽-->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!--表单-->
    <el-form :label-width="labelWidth" class="searchForm">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle" v-if="!item.isHidden">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :placeholder="item.placeholder" :show-password="item.type === 'password'"
                          v-bind="item.otherOptions"
                          :model-value="modelValue[`${item.field}`]"
                          @update:modelValue="handleValueChange($event,item.field)"></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" v-bind="item.otherOptions" style="width: 100%;"
                           :model-value="modelValue[`${item.field}`]"
                           @update:modelValue="handleValueChange($event,item.field)">
                  <el-option v-for="option in item.options" :value="option.value" :key="option.value">{{
                      option.title
                    }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker v-bind="item.otherOptions" style="width: 100%;"
                                :model-value="modelValue[`${item.field}`]"
                                @update:modelValue="handleValueChange($event,item.field)"></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!--具名插槽-->
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, watch} from 'vue'
import {IFormItemPropsType} from "@/base-ui/form/type";


export default defineComponent({
  // 封装form表单，定义props用于父传子
  props: {
    formItems: {
      // 限制数组中存放的数据类型，ts中有个语法叫PropType
      type: Array as PropType<IFormItemPropsType[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({padding: '10px 40px'})
    },
    colLayout: {
      type: Object,
      default: () => ({
        // xl ≥1920px 时让对象一个占4 ，可以放4个
        xl: 4,
        // lg ≥1200px 时让对象一个占8为，可以放3个
        lg: 8,
        // md ≥992px 时让对象一个占12位，可以放2个
        md: 12,
        // sm ≥768px 时让对象独占一行24
        sm: 24,
        // xs <768px 时让对象独占一行24
        xs: 24
      })
    },
    // 用户子组件与父组件数据的双向绑定
    modelValue: {
      type: Object,
      // required 必需的
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    // 实战第八集1：50详解父子组件双向绑定
    // 实现父子组件的双向绑定,先进行浅拷贝一份数据
    // const formData = ref({...props.modelValue})
    // 监听数据的改变,当数据改变的时候把数据发送给父组件，deep表示进行深入监听
    // watch(formData, (newValue) => emit('update:modelValue', newValue), {deep: true})

    // -------------以上的通过v-model的双向绑定不使用了，改为：model-value + @update:modelValue 其实这样的写法就是v-model语法糖之前的样子

    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', {...props.modelValue, [field]: value})
    }

    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;

}
</style>