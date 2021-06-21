<template>
    <n-layout-header class="nav" bordered>
        <n-popover
            placement="bottom-end"
            trigger="click"
            style="padding: 5px 0; width: 260px;border-radius: 10px;"
            
        >
            <template #trigger>
                <n-button text style="height: 54px;" class="nav__menu">
                    <n-icon style="width: 40px;height: 20px;">
                        <menu-icon style="width: 20px;height: 20px;" />
                    </n-icon>
                </n-button>
            </template>

            <div @click="jumpSpace" class="menu-mobile-item">
                <n-icon class="menu-mobile-item__icon">
                    <cloud-outline-icon />
                </n-icon>
                <span>空间</span>
            </div>
            <div @click="login" class="menu-mobile-item">
                <n-icon class="menu-mobile-item__icon">
                    <log-in-outline-icon />
                </n-icon>
                <span>退出</span>
            </div>
            <div @click="changeTheme" class="menu-mobile-item">
                <n-icon class="menu-mobile-item__icon">
                    <pricetag-sharp-icon v-if="theme == null" />
                    <pricetag-outline-icon v-else />
                </n-icon>
                <span title="主题" v-if="theme == null">深色</span>
                <span title="主题" v-else>浅色</span>
            </div>
            <n-divider style="margin: 3px 0;" />
            <the-menu />
        </n-popover>

        <n-button text @click="jumpSpace" class="screen500">
            <template #icon>
                <n-icon>
                    <cloud-outline-icon />
                </n-icon>
            </template>
            空间
        </n-button>

        <div style="float: right;" class="screen500">
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
                        <pricetag-sharp-icon v-if="theme == null" />
                        <pricetag-outline-icon v-else />
                    </n-icon>
                </template>
                <span title="主题" v-if="theme == null">深色</span>
                <span title="主题" v-else>浅色</span>
            </n-button>
        </div>
    </n-layout-header>
</template>

<script lang="ts" setup>
import { NLayoutHeader, NButton, NIcon, darkTheme, NPopover, NDivider } from "naive-ui";
import TheMenu from "./TheMenu.vue";
import {
    LogInOutline as LogInOutlineIcon,
    CloudOutline as CloudOutlineIcon,
    PricetagOutline as PricetagOutlineIcon,
    PricetagSharp as PricetagSharpIcon,
    Menu as MenuIcon
} from '@vicons/ionicons5'
import router from "../router";
import store from "../store";
import { theme } from '../store';
const jumpSpace = () => {
    router.push("/space");
}
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
.nav__menu {
    display: none;
}
@media screen and (max-width: 600px) {
    .nav {
        padding: 0 20px;
    }
    .nav__menu {
        display: block;
    }
    .screen500 {
        display: none;
    }
    .menu-mobile-item {
        transition: background-color 0.3s var(--bezier);
        height: 42px;
        line-height: 42px;
        margin-top: 2px;
        padding: 0 26px;
        cursor: pointer;
    }
    .menu-mobile-item:hover {
        color: #18a058;
    }
    .menu-mobile-item__icon {
        width: 22px;
        height: 22px;
        font-size: 20px;
        margin-right: 8px;
        position: relative;
        top: 4px;
    }
}
</style>