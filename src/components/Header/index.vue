<template>
  <div class="top-header">
    <Clock />
    <div class="avatar">
      <el-dropdown @command="handleCommand">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              style="pointer-events: none"
              v-if="userInfo.showName"
              >你好，{{ userInfo.showName }}</el-dropdown-item
            >
            <el-dropdown-item command="user-center">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import Clock from "../Clock";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

import { useRouter } from "vue-router";
const router = useRouter();

const user = useUserStore();
const { userInfo } = storeToRefs(user);
const handleCommand = (val) => {
  if (val === "logout") {
    user.resetToken();
    router.push("/");
  } else if (val === "user-center") {
    router.push("/user-center/index");
  }
};
</script>

<style lang="scss" scoped>
.top-header {
  height: 100%;
  background-color: #253659;
  color: #fff;
  position: relative;
  padding: 0 20px;
  .avatar {
    position: absolute;
    right: 20px;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
