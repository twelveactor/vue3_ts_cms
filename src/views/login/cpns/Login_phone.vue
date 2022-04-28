<template>
  <div>
    <el-form
        ref="formRef"
        class="loginAccountForm"
        :model="phone"
        :rules="phone_rules">
      <el-form-item label="手机号" prop="number" label-width="70px">
        <el-input type="text" v-model="phone.number"/>
      </el-form-item>
      <el-form-item label="验证码" prop="code" label-width="70px">
        <div class="getCode">
          <el-input type="password" v-model="phone.code"/>
          <el-button type="primary" class="codeBtn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import {phone_rules} from "@/views/login/config/rules_config";

export default defineComponent({
  setup() {
    const phone = reactive({
      number: '',
      code: ''

    })

    return {
      phone,
      phone_rules
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

.getCode {
  width: 100%;
  display: flex;

  .codeBtn {
    margin-left: 5px;
  }
}
</style>