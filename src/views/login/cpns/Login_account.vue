<template>
  <div>
    <el-form
        ref="formRef"
        class="loginAccountForm"
        :model="account"
        :rules="account_rules">
      <el-form-item label="账 号" prop="name" label-width="70px">
        <el-input type="text" v-model="account.name"/>
      </el-form-item>
      <el-form-item label="密 码" prop="password" label-width="70px">
        <el-input show-password v-model="account.password"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
// 封装的rules校验规则，直接return返回即可
import {account_rules} from "@/views/login/config/rules_config";
import {ElForm} from "element-plus";
import LocalCache from '@/utils/Cache'
import {useStore} from "vuex";

export default defineComponent({
  setup() {
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? '',
    })

    // 拿到表单的ref，因为表单是第三方库，类型对象就使用插件的ElForm
    const formRef = ref<InstanceType<typeof ElForm>>()

    const store = useStore()

    // 验证登录
    const loginAction = (isKeepPassword: boolean) => {
      // formRef.value 就是表单组件对象，有一个方法validate对整个表单的内容进行验证，接收一个回调函数，或返回 Promise。
      formRef.value?.validate((val) => {
        // 判断是否有数据，如果没有数据就为false取反执行ss
        if (!val) {
          return '验证失败'
        }
        // 判断是否记住密码
        if (isKeepPassword) {
          // 本地缓存
          LocalCache.setCache('name', account.name)
          LocalCache.setCache('password', account.password)
        }

        // 登陆验证
        store.dispatch('login/accountLoginAction', {...account})
      })
    }


    return {
      account,
      account_rules,
      loginAction,
      formRef
    }
  }
})

</script>

<style scoped lang="less">
.loginAccountForm {
  //为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制
  box-sizing: border-box;
  padding: 40px 20px 0 20px;
}

</style>