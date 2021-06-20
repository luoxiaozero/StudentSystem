<template>
    <n-layout-header class="nav" bordered>
        <n-button text tag="a" href="/space">
            <template #icon>
                <n-icon>
                    <cloud-outline-icon />
                </n-icon>
            </template>
            空间
        </n-button>

        <div style="float: right;">
            <n-button text @click="login">
                <template #icon>
                    <n-icon>
                        <log-in-outline-icon />
                    </n-icon>
                </template>
                退出
            </n-button>
            <n-button text @click="changeTheme">
                <template #icon>
                    <n-icon>
                        <pricetag-sharp-icon v-if="theme == null"/>
                        <pricetag-outline-icon v-else/>
                        
                    </n-icon>
                </template>
                <span title="主题" v-if="theme == null">深色</span>
                <span title="主题" v-else>浅色</span>
            </n-button>
        </div>
    </n-layout-header>
</template>

<script lang="ts" setup>
import { NLayoutHeader, NButton, NIcon, darkTheme } from "naive-ui";
import { LogInOutline as LogInOutlineIcon, CloudOutline as CloudOutlineIcon, PricetagOutline as PricetagOutlineIcon, PricetagSharp as PricetagSharpIcon } from '@vicons/ionicons5'
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
    height: 54px;
}
.nav {
    height: 54px;
    padding: 0 40px;
}
</style>