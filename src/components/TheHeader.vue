<template>
    <n-layout-header
        style="height: 54px; display: flex;align-items: center; padding: 0 30px ;"
        bordered
    >
        <n-button text tag="a" href="/space">
            <template #icon>
                <n-icon>
                    <cloud-outline-icon />
                </n-icon>
            </template>
            空间
        </n-button>
        <n-button text @click="login">
            <template #icon>
                <n-icon>
                    <log-in-outline-icon />
                </n-icon>
            </template>
            退出
        </n-button>
        <n-button text @click="changeTheme">
            <span title="主题" v-if="theme == null">深色</span>
            <span title="主题" v-else>浅色</span>
        </n-button>
    </n-layout-header>
</template>

<script lang="ts" setup>
import { NLayoutHeader, NButton, NIcon, darkTheme } from "naive-ui";
import { LogInOutline as LogInOutlineIcon, CloudOutline as CloudOutlineIcon } from '@vicons/ionicons5'
import router from "../router";
import store from "../store";
import { theme } from '../store';
const changeTheme = () => {
    if (theme.value != null) {
        theme.value = null;
    } else {
        theme.value = darkTheme;
    }
}
const login = () => {
    store.userToken = "";
    store.userType = "";
    router.push("/");
}
</script>
<style  scoped>
.n-button {
    margin-right: 20px;
}
</style>