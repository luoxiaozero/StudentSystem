<template>
    <n-layout >
        <the-header />
    </n-layout>
    <n-layout :native-scrollbar="false" style="min-height: 100vh;">
        <n-card :title="courseName">
            <n-data-table :columns="columns" :data="grades" />
        </n-card>
    </n-layout>
    <n-modal
        v-model:show="isShowModel"
        preset="card"
        :style="{ width: '400px', borderRadius: '10px' }"
        :title="selectStudentInfo.name + ' : ' + selectStudentInfo.id"
        size="huge"
        :bordered="false"
    >
        <n-input-number v-model:value="selectStudentInfo.grade" placeholder="成绩" />
        <template #footer>
            <n-button text style="float: right;" @click="confirm">确认</n-button>
        </template>
    </n-modal>
</template>

<script lang="ts" setup>
import TheHeader from "../components/TheHeader.vue"
import { NLayout, NCard, NButton, NModal, NInputNumber } from "naive-ui";
import { NDataTable } from 'naive-ui';
import axiosApi from '../axios';
import { useRoute } from 'vue-router';
ref: isShowModel = false;
ref: selectStudentInfo = {
    id: 0,
    name: "",
    grade: 2,
    self: {
        grade: 0
    }
};
const confirm = () => {
    axiosApi.post("/course/grade/update", {
        studentId: selectStudentInfo.id,
        courseId: courseId,
        grade: selectStudentInfo.grade
    }).then(res => {
        if (res.code == 200) {
            selectStudentInfo.self.grade = selectStudentInfo.grade;
            isShowModel = false;
        }
    })
}
const columns = [
    {
        title: '学号',
        key: 'id',

    },
    {
        title: '名字',
        key: 'name',

    },
    {
        title: '成绩',
        key: 'grade',
    },
    {
        title: '录入',
        key: 'actions',
        render(row: any) {
            return h(
                NButton,
                {
                    size: 'small',
                    onClick: () => {
                        selectStudentInfo.id = row.id;
                        selectStudentInfo.name = row.name;
                        selectStudentInfo.grade = row.grade;
                        selectStudentInfo.self = row;
                        isShowModel = true;
                    },
                },
                { default: () => '录入成绩' }
            )
        }
    },
];
const route = useRoute();
ref: courseName = "";
ref: courseId = route.params.cid as unknown as number;
const grades = reactive<{
    id: number,
    name: string,
    grade: number
}[]>([]);
axiosApi.get(`/course/${route.params.cid}/grade`).then(res => {
    if (res.code == 200) {
        const data = res.data as {
            "courseId": number,
            "courseName": string,
            students: [
                {
                    id: number,
                    name: string,
                    grade: number
                }]
        };
        courseId = data.courseId;
        courseName = data.courseName;
        grades.push(...data.students)

    }
})
</script>

<script lang="ts">
import { h, reactive } from 'vue';
</script>