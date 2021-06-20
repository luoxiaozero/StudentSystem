<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts" setup>
import { NMessageProvider, NConfigProvider } from 'naive-ui';
import { theme } from './store';
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
