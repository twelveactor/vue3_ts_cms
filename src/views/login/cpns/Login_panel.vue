<template>
  <div class="login-panel">
    <h2>后台管理系统</h2>

    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTabs" @click="currentTabsClick">
      <el-tab-pane name="account">
        <template #label>
            <span class="custom-tabs-label">
             <el-icon><user/></el-icon>
              <span>账号登录</span>
            </span>
        </template>
        <!--账号登录表单内容-->
        <login_account ref="accountRef"></login_account>
      </el-tab-pane>
      <el-tab-pane label="Config" name="phone">
        <template #label>
              <span class="custom-tabs-label">
                <el-icon>
                  <cellphone/>
                </el-icon>
                <span>手机登录</span>
              </span>
        </template>
        <!--手机登录表单内容-->
        <login_phone></login_phone>
      </el-tab-pane>
    </el-tabs>

    <!--登录按键和记住密码选项-->
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handelLoginClick" :disabled="disables">登录</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
// icon 图标导入
import {User, Cellphone} from '@element-plus/icons-vue'
// 组件传入
import Login_phone from "@/views/login/cpns/Login_phone.vue";
import Login_account from "@/views/login/cpns/Login_account.vue";
import LocalCache from "@/utils/Cache";

export default defineComponent({
  components: {
    User,
    Cellphone,
    Login_phone,
    Login_account
  },
  setup() {
    // 记住密码复选框
    const isKeepPassword = ref(false)
    // 拿到子组件实例,就可以调用子组件的方法，不过最好需要依靠泛型拿到子组件的的实例对象的类型
    // TS 中的ref是通过泛型拿到一个组件的实例对象，实例对象的数据存放在value中，泛型是对传入的元素进行限制的
    // InstanceType<typeof Login_account> 可以拿到login_account组件导出的实例对象的类型
    const accountRef = ref<InstanceType<typeof Login_account>>()

    // 获取当前选中的tabs是手机登录还是账号登陆
    const currentTabs = ref('account')
    let disables = ref(false)
    const currentTabsClick = () => {
      if (currentTabs.value === 'phone') {
        disables.value = true
      } else {
        disables.value = false
      }
    }

    // 如果本地有保存密码记住密码复选框也要是选中状态
    if (LocalCache.getCache('name') && LocalCache.getCache('password')) {
      isKeepPassword.value = true
    }

    // 登录
    const handelLoginClick = () => {
      // 因为登录有两个选项，所有现在的思想就是不管手机登录还是账号密码登录
      // 我这边点击了登录，就让手机和账号登录的两个模块他们内部进行校验和申请
      // 我这边只负责点击了按钮，通知另外两个子组件我需要进行登录了就行
      accountRef.value?.loginAction(isKeepPassword.value) //account正在登录...
    }


    return {
      isKeepPassword,
      handelLoginClick,
      accountRef,
      currentTabs,
      currentTabsClick,
      disables
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 450px;
  height: 300px;
  //opacity: 0.3; //会改变所有子元素透明度
  /* RGBa, 透明度0.6 */
  //background-color: #80c7fa;
  //background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  background: rgba(131, 174, 197, 0.6);
  border-radius: 10px;
  // 盒子居中，需要偏移才能居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* 阴影向右偏移10px、向下偏移10px、模糊距离为20px*/
  box-shadow: 1px 2px 10px rgba(85, 80, 100, 0.4);
  box-sizing: border-box;


  h2 {
    text-align: center;
    color: #eee8d5;
  }

  .el-icon {
    margin-right: 5px;
    vertical-align: -10%
  }

  .demo-tabs {
    height: 232px;
    width: 100%;
    flex: 1;
    box-sizing: border-box;

    ::v-deep .el-tabs__content {
      padding: 0 10px 0 10px;
    }
  }

  .account-control {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}


</style>