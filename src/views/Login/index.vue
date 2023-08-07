<template>
  <div class="login">
    <h1 class="system-title">XXXX系统</h1>
    <el-form
      ref="loginForm"
      :model="loginData"
      :rules="rules"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="Username" prop="username">
        <el-input
          v-model="loginData.username"
          clearable
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          show-password
          clearable
          v-model="loginData.password"
          placeholder="请输入密码"
          @keyup.enter="handleLogin"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="action">
          <el-button type="primary" :loading="loading" @click="handleLogin"
            >登录</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { useUserStore } from "@/store/user";
const user = useUserStore();

import { ElMessage } from "element-plus";

import * as Validation from "@/utils/validation";

// import { UserApi } from "@/api";
// const userApi = new UserApi();

const loginData = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [
    Validation.requiredInputItem("用户名"),
    Validation.validLength("用户名", 3, 12),
  ],
  password: [
    Validation.requiredInputItem("密码"),
    Validation.validLength("密码", 6, 18),
  ],
});
const loading = ref(null);

const loginForm = ref(null);

const handleLogin = () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      if (loginData.username === "admin" && loginData.password === "password") {
        setTimeout(() => {
          loading.value = false;
          user.setToken("123456");
          user.setUserInfo({
            username: "admin",
            role: 1,
            showName: "管理员",
            phoneNumber: "13888888888",
            email: "admin@163.com",
            depart: "产研中心/技术部",
            createTime: "202301-01 10:00:00",
          });
          router.push("/home/index");
        }, 1000);
        // userApi.login({ ...loginData }).then(
        //   (res) => {
        //     loading.value = false;
        //     console.log(res);
        //     user.setToken("123456");
        //     user.setUserInfo({
        //       name: "admin",
        //       role: 1,
        //       showName: "管理员",
        //     });
        //     router.push("/home/index");
        //   },
        //   (err) => {
        //     console.log(err);
        //     loading.value = false;
        //   }
        // );
      } else if (loginData.username && loginData.password) {
        ElMessage({
          message: "账户名或密码错误",
          type: "error",
        });
        loading.value = false;
      } else {
        loading.value = false;
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.login {
  width: 600px;
  height: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .system-title,
  .el-form {
    width: 100%;
  }
  .el-form {
    padding: 20px;
    box-sizing: border-box;
  }
  .action {
    width: 100%;
    text-align: center;
    .el-button {
      width: 100%;
    }
  }
}
</style>
