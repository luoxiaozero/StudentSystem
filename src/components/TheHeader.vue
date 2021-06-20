<template>
    <n-layout-header
        style="height: 54px; display: flex;align-items: center; padding: 0 30px ;"
        bordered
    >
        <n-button text @click="login">
            <template #icon>
                <n-icon>
                    <train-icon />
                </n-icon>
            </template>
            退出
        </n-button>
        <n-button text tag="a" href="/space">
            <template #icon>
                <n-icon>
                    <train-icon />
                </n-icon>
            </template>
            空间
        </n-button>
    </n-layout-header>
</template>

<script lang="ts" setup>
import { NLayoutHeader, NButton, NIcon } from "naive-ui";
import { TrainOutline as TrainIcon } from '@vicons/ionicons5'
import router from "../router";
import store from "../store";
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