<template>
    <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>
<script lang="ts" setup>
import { NDataTable, } from 'naive-ui';

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
        title: '教工',
        key: 'teacherName'
    },
];

const data = reactive<{teacherName: string, courseName: string, semester: string }[]>([]);

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