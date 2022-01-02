<template>
    <n-layout style="height: 100vh;">
        <the-header />
        <n-layout position="absolute" style="top: 54px; " has-sider>
            <n-layout-sider
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="260"
                :collapsed="collapsed"
                show-trigger
                @collapse="() => collapsed = true"
                @expand="() => collapsed = false"
                class="space-sider"
            >
                <n-menu
                    :root-indent="26"
                    :indent="12"
                    :collapsed="collapsed"
                    :collapsed-width="64"
                    :collapsed-icon-size="22"
                    :options="menuOptions"
                    v-model:value="activeKey"
                />
            </n-layout-sider>
            <n-layout content-style="padding: 24px;" :native-scrollbar="false">
                <m-new v-if="activeKey == 'hear-new'" />
                <m-team
                    v-else-if="/^hear-class-/.test(activeKey)"
                    :team-id="parseInt(activeKey.slice(11))"
                />
                <m-course v-else-if="activeKey == 'hear-course-m'" />
                <m-group v-else-if="activeKey == 'hear-department'" />
                <t-course v-else-if="activeKey == 'hear-course-t'" />
                <s-grade v-else-if="activeKey == 'hear-grade'" />
            </n-layout>
        </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import { NLayout, NMenu, NLayoutSider, NIcon } from "naive-ui";
import TheHeader from "../../components/TheHeader.vue"
import MNew from "./MNew.vue";
import MCourse from "./MCourse.vue";
import MGroup from "./MGroup.vue";
import TCourse from "./TCourse.vue";
import MTeam from "./MTeam.vue";
import SGrade from "./SGrade.vue";
import { } from "../../store";
import {
    BookOutline as BookIcon,
    GolfOutline as GolfOutlineIcon,
    Add as AddIcon,
    BusinessOutline as BusinessOutlineIcon,
} from '@vicons/ionicons5';

function renderIcon(icon: any) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

ref: activeKey = "";
watch(() => spaceViewKey.value, (value) => {
    activeKey = value;
})
const menuOptions = reactive<any[]>([
])
if (store.userType == "admin") {
    menuOptions.push(
        {
            label: '新建',
            key: 'hear-new',
            icon: renderIcon(AddIcon),
        },
        {
            label: "部门",
            key: "hear-department",
            icon: renderIcon(BusinessOutlineIcon),
        },
        {
            label: '财务分工',
            key: 'hear-course-m',
            icon: renderIcon(BookIcon),
        });
    activeKey = "hear-new";
    document.title = document.title + " | 管理员";
}
if (store.userType == "teacher") {
    menuOptions.push({
        label: '部门',
        key: 'hear-course-t',
        icon: renderIcon(BookIcon),
    })
    activeKey = "hear-course-t";
    document.title = document.title + " | 财务";
}
if (store.userType == "student") {
    menuOptions.push({
        label: '查工资',
        key: 'hear-grade',
        icon: renderIcon(GolfOutlineIcon),
    });
    activeKey = "hear-grade";
    document.title = document.title + " | 员工";
}

ref: collapsed = false;
</script>
<script lang="ts">
// import { MenuOption } from "naive-ui";
import axiosApi from "../../axios";
import store, { spaceViewKey } from "../../store";
import { h, reactive, watch } from 'vue'
</script>

<style scoped>
@media screen and (max-width: 1000px) {
    .space-sider {
        display: none;
    }
}
</style>