<template>
    <n-card :title="tipInfo">
        <n-breadcrumb style="margin-bottom: 30px;">
            <n-breadcrumb-item>
                <n-icon>
                    <business-outline-icon />
                </n-icon>
                <n-dropdown trigger="hover" :options="sdeptInfo" @select="selectSdept">系部</n-dropdown>
            </n-breadcrumb-item>
            <n-breadcrumb-item v-show="selectSedptName">
                <n-icon>
                    <person-icon />
                </n-icon>
                <n-dropdown
                    trigger="hover"
                    :options="majorInfo"
                    @select="selectMajor"
                >{{ selectSedptName }}</n-dropdown>
            </n-breadcrumb-item>
            <n-breadcrumb-item v-show="selectMajorName">
                <n-dropdown
                    trigger="hover"
                    :options="teamInfo"
                    @select="selectTeam"
                >{{ selectMajorName }}</n-dropdown>
            </n-breadcrumb-item>
            <n-breadcrumb-item v-show="selectTeamName">{{ selectTeamName }}</n-breadcrumb-item>
        </n-breadcrumb>
        <div v-if="showInfo">
            <n-grid x-gap="12" y-gap="16" cols="1 600:3 900:4 1100:5">
                <n-gi class="card" v-for="info in showInfo" @click="openSelect(info.key)">
                    <div class="card__title">{{ info.label }}</div>
                </n-gi>
            </n-grid>
        </div>
        <m-team v-if="teamId" :team-id="teamId" />
    </n-card>
</template>
<script lang="ts" setup>
import { NBreadcrumb, NBreadcrumbItem, NDropdown, NIcon, NLayout, NCard, NGrid, NGi } from "naive-ui";
import MTeam from "./MTeam.vue"
import {
    BusinessOutline as BusinessOutlineIcon,
    PersonOutline as PersonIcon,
} from '@vicons/ionicons5';
import axiosApi from "../../axios";
import { useMessage } from 'naive-ui';
const message = useMessage();
ref: teamId = 0;
ref: showInfoKey = "";
ref: tipInfo = "";
ref: showInfo = [] as { label: string, key: number }[];
ref: sdeptInfo = [] as { label: string, key: number }[];
ref: majorInfo = [] as { label: string, key: number }[];
ref: teamInfo = [] as { label: string, key: number }[];
ref: selectSedptName = "";
ref: selectMajorName = "";
ref: selectTeamName = "";
const selectSdept = (key: any) => {
    selectMajorName = "";
    selectTeamName = "";
    teamId = 0;
    axiosApi.get("/major", { sdeptId: key }).then(res => {
        if (res.code == 200) {
            majorInfo.length = 0;
            res.data.forEach((element: { id: number, name: string }) => {
                majorInfo.push({
                    label: element.name,
                    key: element.id
                })
            });
            showInfo = majorInfo;
            showInfoKey = "major";
            tipInfo = "选择专业";
        } else {
            message.error(res.msg || "error");
        }
    });

    for (let i = 0; i < sdeptInfo.length; i++) {
        if (sdeptInfo[i].key == key) {
            selectSedptName = sdeptInfo[i].label;
            break;
        }
    }
}

const selectMajor = (key: any) => {
    selectTeamName = "";
    teamId = 0;
    axiosApi.get("/class", { majorId: key }).then(res => {
        if (res.code == 200) {
            teamInfo.length = 0;
            res.data.forEach((element: { id: number, name: string }) => {
                teamInfo.push({
                    label: element.name,
                    key: element.id
                })
            });
            showInfo = teamInfo;
            showInfoKey = "team";
            tipInfo = "选择小组";
        } else {
            message.error(res.msg || "error");
        }
    });

    for (let i = 0; i < majorInfo.length; i++) {
        if (majorInfo[i].key == key) {
            selectMajorName = majorInfo[i].label;
            break;
        }
    }
}

const selectTeam = (key: any) => {
    showInfo = [];
    teamId = key;
    tipInfo = "小组信息";
    for (let i = 0; i < teamInfo.length; i++) {
        if (teamInfo[i].key == key) {
            selectTeamName = teamInfo[i].label;
            break;
        }
    }
}
const openSelect = (key: number) => {
    switch (showInfoKey) {
        case "sdept":
            selectSdept(key);
            break;
        case "major":
            selectMajor(key);
            break;
        case "team":
            selectTeam(key);
            break;
    }

}
axiosApi.get("/sdept").then(res => {
    if (res.code == 200) {
        res.data.forEach((element: { id: number, name: string }) => {
            sdeptInfo.push({
                label: element.name,
                key: element.id
            })
        });
        showInfo = sdeptInfo;
        showInfoKey = "sdept";
        tipInfo = "选择部门";
    } else {
        message.error(res.msg || "error");
    }
});
</script>

<style scoped>
.card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 100px;
    background-color: #55bb8a;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.3em;
}
.card:hover {
    background-color: #55c68a;
}
@media screen and (max-width: 700px) {
    .card {
        width: 100%;
        height: 120px;
    }
}
.card__title {
    font-size: 0.9em;
    transition: all 0.2s;
}
.card:hover .card__title {
    transform: scale(1.1);
}
</style>