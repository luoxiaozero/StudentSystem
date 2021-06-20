<template>
  <n-message-provider>
    <router-view></router-view>
  </n-message-provider>
</template>
<script lang="ts" setup>
import { NMessageProvider } from 'naive-ui';
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
