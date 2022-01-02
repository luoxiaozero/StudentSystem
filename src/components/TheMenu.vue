<template>
    <n-menu
        :root-indent="26"
        :indent="12"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        v-model:value="activeKey"
    />
</template>
<script lang="ts" setup>
import { NMenu, NIcon } from "naive-ui";
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    GolfOutline as GolfOutlineIcon,
    Add as AddIcon,
    BusinessOutline as BusinessOutlineIcon,
    TennisballOutline as TennisballOutlineIcon,
    WalletOutline as WalletOutlineIcon
} from '@vicons/ionicons5';
import store, { spaceViewKey } from '../store';
import axiosApi from '../axios';

const emit = defineEmit(["colsePopover"]);
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
ref: activeKey = "";
ref: collapsed = false;
ref: classification = {
    label: '部门',
    key: 'hear-classification',
    icon: renderIcon(BusinessOutlineIcon),
    children: [

    ]
};
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
            label: '财务分工',
            key: 'hear-course-m',
            icon: renderIcon(BookIcon),
        });
    activeKey = "hear-new";
}
if (store.userType == "teacher") {
    menuOptions.push({
        label: '部门',
        key: 'hear-course-t',
        icon: renderIcon(BookIcon),
    })
    activeKey = "hear-course-t";
}
if (store.userType == "student") {
    menuOptions.push({
        label: '查工资',
        key: 'hear-grade',
        icon: renderIcon(GolfOutlineIcon),
    });
    activeKey = "hear-grade";
}
watch(() => activeKey, (value) => {
    emit("colsePopover");

    spaceViewKey.value = value;
})
</script>

<script lang="ts">
import { h, reactive, watch , defineEmit} from 'vue';
</script>