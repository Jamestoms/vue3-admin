<template>
  <div class="header-clock">
    <span>{{ currentDatetime }}</span>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { getNowDateTime } from "@/utils/date";
const timer = ref(null);
const currentDatetime = ref("");
timer.value = setInterval(() => {
  currentDatetime.value = getNowDateTime();
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<style lang="scss" scoped>
.header-clock {
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
