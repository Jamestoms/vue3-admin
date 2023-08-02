import Layout from "@/Layout";
const home = {
  path: "/home",
  redirect: "/home/index",
  component: Layout,
  name: "HomeLayout",
  meta: {
    title: "首页",
  },
  children: [
    {
      path: "index",
      name: "Home",
      component: () => import("@/views/Home/index"),
      meta: {
        title: "主页",
        active: "index",
      },
    },
  ],
};

export default home;
