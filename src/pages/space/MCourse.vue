<template>
    <n-space style="margin-bottom: 8px;" justify="end">
        <n-button type="info" strong secondary>工资详情下载</n-button>
    </n-space>
    <n-data-table :columns="columns" :data="data" />
</template>
<script lang="ts" setup>
import { NDataTable, NSpace, NButton } from 'naive-ui';

const columns = [
    {
        title: '月份',
        key: 'semester',

    },
    {
        title: '岗位',
        key: 'courseName',

    },
    {
        title: '姓名',
        key: 'teacherName'
    },
];

const data = reactive<{ teacherName: string, courseName: string, semester: string }[]>([]);

axiosApi.get("/admin/course").then(res => {
    if (res.code == 200) {
        res.data.forEach((element: {
            courseName: string,
            beginYear: number,
            endYear: number,
            teacherName: string
        }) => {
            let date = new Date(element.beginYear);

            data.push({
                courseName: element.courseName,
                teacherName: element.teacherName,
                semester: date.getFullYear() + " " + (date.getMonth() >= 8 ? "上" : "下")
            })
        });
    }
})

</script>
<script lang="ts">
import { reactive } from 'vue';
import axiosApi from '../../axios';
</script>