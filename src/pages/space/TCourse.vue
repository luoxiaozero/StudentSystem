
<template>
    <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>
<script lang="ts" setup>
import { h, reactive } from 'vue'
import { NTag, NButton, NDataTable, } from 'naive-ui';
import axiosApi from '../../axios';


const columns
    = [
        {
            title: '月份',
            key: 'semester',

        },
        {
            title: '岗位',
            key: 'courseName',

        },
        {
            title: 'Action',
            key: 'actions',
            render(row: any) {
                return h(
                    NButton,
                    {
                        size: 'small',
                        onClick: () => router.push("/course/" + row.courseId + "/grade/entry"),
                    },
                    { default: () => '录入工资' }
                )
            }
        }
    ]
    ;

const data = reactive<{ courseName: string, semester: string, courseId: number }[]>([]);

axiosApi.get("/teacher/course").then(res => {
    if (res.code == 200) {
        res.data.forEach((element: {
            courseName: string,
            beginDate: number,
            endDate: number,
            courseId: number;
        }) => {
            let date = new Date(element.beginDate);
            data.push({
                courseId: element.courseId,
                courseName: element.courseName,
                semester: date.getFullYear() + " " + (date.getMonth() >= 8 ? "上" : "下")
            })
        });
    }
})


</script>

<script lang="ts">
import router from '../../router';
</script>