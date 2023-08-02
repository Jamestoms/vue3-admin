<template>
  <div class="container">
    <div>页面未找到，请检查你的url是否正确</div>
    <el-button type="primary" @click="toHome">返回首页</el-button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const toHome = function () {
  router.push("/home/index");
};
</script>
<style lang="scss" scope>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn {
    margin-top: 30px;
  }
}
</style>
