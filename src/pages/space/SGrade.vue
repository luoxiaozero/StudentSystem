<template>
    <n-data-table :columns="columns" :data="grades" />
</template>
<script lang="ts" setup>
import { NDataTable } from 'naive-ui';

const columns = [
    {
        title: '学期',
        key: 'semester',

    },
    {
        title: '课程名',
        key: 'courseName',

    },
    {
        title: '成绩',
        key: 'grade'
    },
];

const grades = reactive<{ courseName: string, grade: number, semester: string }[]>([]);

axiosApi.get("/student/grade").then(res => {
    if (res.code == 200) {
        res.data.forEach((element: {
            courseName: string,
            beginYear: number,
            endYear: number,
            grade: number
        }) => {
            let date = new Date(element.beginYear);

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