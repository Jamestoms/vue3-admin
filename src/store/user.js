// import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";
// 选项式写法
// export const useUserStore = defineStore("user", {
//   state: () => ({
//     userInfo: null,
//     token: "",
//   }),
//   actions: {
//     setToken() {
//       this.token = "123456";
//     },
//     resetToken() {
//       this.token = "";
//       this.userInfo = null;
//     },
//     setUserInfo() {
//       this.userInfo = {
//         name: "admin",
//         role: 1,
//         showName: "管理员",
//       };
//     },
//   },
//   // 数据持久化存储
//   persist: true,
//   // persist: {
//   //   enabled: true,
//   //   strategies: [
//   //     {
//   //       key: '',
//   //       storage: sessionStorage
//   //     }
//   //   ]
//   // },
// });

// 组合式写法更灵活，建议使用这种写法
export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("");
    const userInfo = reactive({
      username: "",
      role: "",
      showName: "",
    });
    function setToken(t) {
      token.value = t;
    }
    function resetToken() {
      token.value = "";
    }
    function setUserInfo({
      username,
      role,
      showName,
      phoneNumber,
      email,
      depart,
      createTime,
    }) {
      userInfo.username = username;
      userInfo.role = role;
      userInfo.showName = showName;
      userInfo.phoneNumber = phoneNumber;
      userInfo.email = email;
      userInfo.depart = depart;
      userInfo.createTime = createTime;
    }
    return {
      token,
      userInfo,
      setToken,
      resetToken,
      setUserInfo,
    };
  },
  {
    // 数据持久化存储
    persist: true,
  }
);
