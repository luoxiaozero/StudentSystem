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
import TCourse from "./TCourse.vue";
import MTeam from "./MTeam.vue";
import SGrade from "./SGrade.vue";
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    GolfOutline as GolfOutlineIcon,
    Add as AddIcon,
    BusinessOutline as BusinessOutlineIcon,
    TennisballOutline as TennisballOutlineIcon,
    WalletOutline as WalletOutlineIcon
} from '@vicons/ionicons5';

axiosApi.get("/sdept").then(res => {
    if (res.code == 200) {
        classification.children = [];
        res.data.forEach((element: { id: number, name: string }) => {
            let majorChildren: any[] = reactive([]);
            (classification.children as any[]).push({
                key: "hear-sdept-" + element.id.toString(),
                label: element.name,
                icon: renderIcon(PersonIcon),
                children: majorChildren
            });
            axiosApi.get("/major", { sdeptId: element.id }).then(res => {
                if (res.code == 200) {
                    res.data.forEach((element: { id: number, name: string }) => {
                        let teamChildren: any[] = reactive([]);
                        majorChildren.push({
                            key: "hear-major-" + element.id.toString(),
                            label: element.name,
                            icon: renderIcon(TennisballOutlineIcon),
                            children: teamChildren
                        })
                        axiosApi.get("/class", { majorId: element.id }).then(res => {
                            if (res.code == 200) {
                                res.data.forEach((element: { id: number, name: string, graduationYear: string }) => {
                                    teamChildren.push({
                                        key: "hear-class-" + element.id.toString(),
                                        label: element.name,
                                        icon: renderIcon(WalletOutlineIcon),
                                    })
                                });
                            }
                        });

                    });
                }
            });

        });
    }
});
function renderIcon(icon: any) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

ref: classification = {
    label: '系部',
    key: 'hear-classification',
    icon: renderIcon(BusinessOutlineIcon),
    children: [

    ]
};
ref: activeKey = "";
const menuOptions = reactive<any[]>([
])
if (store.userType == "admin") {
    menuOptions.push({
        label: '新建',
        key: 'hear-new',
        icon: renderIcon(AddIcon),
    },
        classification,
        {
            label: '课堂',
            key: 'hear-course-m',
            icon: renderIcon(BookIcon),
        });
        activeKey = "hear-new";
}
if (store.userType == "teacher") {
    menuOptions.push({
        label: '课堂',
        key: 'hear-course-t',
        icon: renderIcon(BookIcon),
    })
    activeKey = "hear-course-t";
}
if (store.userType == "student") {
    menuOptions.push({
        label: '查成绩',
        key: 'hear-grade',
        icon: renderIcon(GolfOutlineIcon),
    });
    activeKey = "hear-grade";
}

ref: collapsed = false;
</script>
<script lang="ts">
// import { MenuOption } from "naive-ui";
import axiosApi from "../../axios";
import store from "../../store";
import { h, reactive } from 'vue'
</script>