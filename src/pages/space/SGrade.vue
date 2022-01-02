<template>
    <n-space style="margin-bottom: 8px;" justify="end" >
        <n-button type="info" strong secondary >工资详情下载</n-button>
    </n-space>
    <n-data-table :columns="columns" :data="grades" />
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
        title: '工资合计',
        key: 'grade'
    },
];

const grades = reactive<{ courseName: string, grade: number, semester: string }[]>([]);

axiosApi.get("/student/grade").then(res => {
    if (res.code == 200) {
        res.data.forEach((element: {
            courseName: string,
            beginDate: number,
            endDate: number,
            grade: number
        }) => {
            let date = new Date(element.beginDate);

            grades.push({
                courseName: element.courseName,
                grade: element.grade,
                semester: date.getFullYear() + " " + (date.getMonth() >= 8 ? "上" : "下")
            })
        });
    }
})
</script>

<script lang="ts">
import { reactive } from "vue";
import axiosApi from '../../axios';
</script>