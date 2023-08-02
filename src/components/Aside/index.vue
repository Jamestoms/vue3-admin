<template>
  <div class="aside-menu">
    <el-menu
      active-text-color="#409EFF"
      text-color="#000"
      router
      :default-active="defaultRoute"
    >
      <template v-for="(item, index) in menus" :key="index">
        <el-sub-menu v-if="item.children" :index="item.path">
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="(sub, subIndex) in item.children"
            :key="subIndex"
            :index="item.path + '/' + sub.path"
            >{{ sub.meta.title }}</el-menu-item
          >
        </el-sub-menu>
        <el-menu-item
          v-else
          :index="item.indexPath ? item.indexPath : item.path"
          >{{ item.meta.title }}</el-menu-item
        >
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { routes } from "@router";
import { useRoute } from "vue-router";
const route = useRoute();
import { ref } from "vue";
// import { ref, watch } from "vue";
const defaultRoute = ref(route.path);
// watch(
//   () => route.path,
//   (val) => {
//     defaultRoute.value = val;
//   }
// );
function getAsideMenus(routes) {
  return routes
    .map((el) => {
      if (!el.meta.hide && el.children && el.children.length) {
        el.children = getAsideMenus(el.children);
      }
      return el;
    })
    .filter((el) => {
      return !el.meta.hide;
    });
}
let formatMenus = routes;
formatMenus = getAsideMenus(formatMenus);
const menus = [];
// 二级菜单只有一个的隐藏父级菜单
// 目前只处理到二级菜单，若需要三级或更深需优化
formatMenus.forEach((el) => {
  if (el.children && el.children.length > 1) {
    menus.push(el);
  } else if (el.children && el.children.length === 1) {
    el.children[0].indexPath = el.path + "/" + el.children[0].path;
    menus.push(el.children[0]);
  } else {
    menus.push(el);
  }
});
</script>

<style lang="scss" scoped>
.aside-menu {
  .el-menu {
    border: none;
  }
}
</style>
