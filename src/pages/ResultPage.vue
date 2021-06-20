<template>
  <div class="result" >
    <n-result status="500" title="500 服务器错误" description="服务器出错可能说明该雇更多程序员了" v-if="code == 500">
      <template #footer>
        <n-button @click="page">散财消灾</n-button>
      </template>
    </n-result>
    <n-result
      status="404"
      title="404 资源不存在"
      description="生活总归带点荒谬"
      style="transform: translateY(-30%);"
      v-else
    >
      <template #footer>
        <n-button @click="page">找点乐子吧</n-button>
      </template>
    </n-result>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "@vue/runtime-core";
import { NResult, NButton } from "naive-ui";
import { useRoute } from "vue-router";
import router from "../router";
const props = defineProps({
  code: {
    type: Number,
    default: 404
  }
})
ref: code = props.code; 
const route = useRoute();
if (route.name == "500") {
  code = 500;
}
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


