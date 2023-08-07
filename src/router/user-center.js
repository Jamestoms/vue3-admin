import Layout from "@/Layout";
const userCenter = {
  path: "/user-center",
  redirect: "/user-center/index",
  component: Layout,
  name: "UserCenterLayout",
  meta: {
    title: "个人中心",
    hide: true,
  },
  children: [
    {
      path: "index",
      name: "UserCenter",
      component: () => import("@/views/UserCenter/index"),
      meta: {
        title: "个人中心",
        hide: true,
      },
    },
  ],
};

export default userCenter;
