import Layout from "@/Layout";
const user = {
  path: "/user",
  redirect: "/user/user-manage",
  component: Layout,
  name: "UserLayout",
  meta: {
    title: "用户管理",
  },
  children: [
    {
      path: "user-manage",
      name: "UserManage",
      component: () => import("@/views/User/UserManage"),
      meta: {
        title: "用户管理",
        active: "user-manage",
      },
    },
    {
      path: "role-manage",
      name: "RoleManage",
      component: () => import("@/views/User/RoleManage"),
      meta: {
        title: "角色管理",
        active: "user-manage",
      },
    },
  ],
};

export default user;
