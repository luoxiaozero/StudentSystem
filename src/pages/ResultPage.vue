<template>
  <div class="result">
    <n-result
      status="404"
      title="404 资源不存在"
      description="生活总归带点荒谬"
      style="transform: translateY(-40%);"
    >
      <template #footer>
        <n-button @click="page">找点乐子吧</n-button>
      </template>
    </n-result>
  </div>
</template>
<script lang="ts" setup>
import { NResult, NButton } from "naive-ui";
import router from "../router";
const page = () => {
  router.go(-1);
};
</script>
<style scoped>
.result {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


