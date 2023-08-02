<template>
  <div class="layout">
    <el-container class="common-layout">
      <el-header>
        <Header />
      </el-header>
      <el-container class="main-container">
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main class="main">
          <div class="view-main">
            <router-view></router-view>
          </div>
          <!-- <el-footer>
            <Footer />
          </el-footer> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "../components/Aside";
import Header from "../components/Header";
// import Footer from "../components/Footer";
</script>

<style lang="scss" scoped>
.layout,
.common-layout {
  width: 100%;
  height: 100%;
  .main-container {
    height: calc(100% - 60px);
    .view-main {
      height: 100%;
      // height: calc(100% - 60px);
    }
  }
  .el-header,
  .el-footer {
    padding: 0;
  }
}
</style>
