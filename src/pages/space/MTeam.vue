<template>
    <!-- <n-button>导出成绩</n-button> -->
    <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>
<script lang="ts" setup>
import { defineProps, reactive, watch } from 'vue'
import { NTag, NButton, NDataTable, } from 'naive-ui';
import axiosApi from '../../axios';
const props = defineProps({
    teamId: {
        type: Number
    }
})


const getDate = () => {
    axiosApi.get("/student", { classId: props.teamId }).then(res => {
        if (res.code == 200) {
            data.length = 0;
            res.data.forEach((element: { id: number, name: string }) => {
                data.push({
                    key: element.id,
                    studentId: element.id,
                    name: element.name,
                });
            });
        }
    })
}
watch(() => props.teamId, getDate);
getDate();
const columns = [
    {
        title: '学号',
        key: 'studentId'
    },
    {
        title: '名字',
        key: 'name'
    },
];

const data = reactive<{ key: number, name: string, studentId: number }[]>([]);
</script>