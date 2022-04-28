<template>
  <div class="login">
    <Login_panel/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Login_panel from "@/views/login/cpns/Login_panel.vue";

export default defineComponent({
  components: {
    Login_panel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  background-color: #D9AFD9;
  background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%), url('../../assets/img/login-bg.svg');

}
</style>