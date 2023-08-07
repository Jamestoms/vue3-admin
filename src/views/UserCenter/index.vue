<template>
  <div class="user-center">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </div>
          <ul class="base-info">
            <li>用户名: {{ userInfo.username }}</li>
            <li>昵称: {{ userInfo.showName }}</li>
            <li>手机号码: {{ userInfo.phoneNumber }}</li>
            <li>用户邮箱: {{ userInfo.email }}</li>
            <li>所属部门: {{ userInfo.depart }}</li>
            <li>系统角色: {{ userInfo.role === 1 ? "管理员" : "普通用户" }}</li>
            <li>创建日期: {{ userInfo.createTime }}</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>基本资料</span>
            </div>
          </template>
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="基本资料" name="first">
              <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                label-position="top"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="ruleForm.username" placeholder="用户名" />
                </el-form-item>
                <el-form-item label="昵称" prop="showName">
                  <el-input v-model="ruleForm.showName" placeholder="昵称" />
                </el-form-item>
                <el-form-item label="所属部门" prop="depart">
                  <el-input v-model="ruleForm.depart" placeholder="所属部门" />
                </el-form-item>
                <el-form-item label="手机号码" prop="phoneNumber">
                  <el-input
                    v-model="ruleForm.phoneNumber"
                    oninput="if(value.length>11)value=value.slice(0,11)"
                    maxlength="11"
                    show-word-limit
                    placeholder="手机号码"
                  />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="ruleForm.email" placeholder="邮箱" />
                </el-form-item>
                <el-form-item label="系统角色" prop="role">
                  <el-select v-model="ruleForm.role" placeholder="系统角色">
                    <el-option label="管理员" :value="1" />
                    <el-option label="普通用户" :value="2" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm(ruleFormRef)"
                    >保存</el-button
                  >
                  <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="second">修改密码</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";

import * as Validation from "@/utils/validation";
const user = useUserStore();
const { userInfo } = storeToRefs(user);

const activeName = ref("first");
const handleClick = (tab, event) => {
  console.log(tab, event);
};

const ruleFormRef = ref();
const ruleForm = reactive({
  username: "Hello",
  showName: "",
  depart: "",
  phoneNumber: "",
  email: "",
  role: 1,
});
const rules = reactive({
  username: [Validation.requiredInputItem("用户名")],
  showName: [Validation.requiredInputItem("昵称")],
  depart: [Validation.requiredInputItem("所属部门")],
  phoneNumber: [Validation.validTelephone(true)],
  email: [Validation.requiredInputItem("邮箱")],
  role: [Validation.requiredSelectItem("系统角色")],
});
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.user-center {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  .base-info {
    list-style: none;
    text-align: left;
    li {
      min-height: 32px;
    }
  }
}
</style>
