<template>
    <n-card title="新建课堂" class="n-card-user">
        <n-grid x-gap="12" :cols="4">
            <m-new-card title="新建必修">
                <template #icon>
                    <book-icon />
                </template>
                <template #model>
                    <n-input placeholder="请输入课程名" clearable style="margin-bottom: 16px;"/>
                    <n-date-picker v-model:value="range" type="daterange" clearable />
                </template>
            </m-new-card>
        </n-grid>
    </n-card>
    <n-card title="新建组织" class="n-card-user">
        <n-grid x-gap="12" :cols="4">
            <m-new-card title="新建系部" @confirm="newSdept">
                <template #icon>
                    <business-outline />
                </template>
                <template #model>
                    <n-input v-model:value="sdeptName" placeholder="请输入系部名" clearable />
                </template>
            </m-new-card>
            <m-new-card title="新建专业" @open-model="openMajor" @confirm="newMajor">
                <template #icon>
                    <tennisball-outline />
                </template>
                <template #model>
                    <n-select
                        v-model:value="selectSdept"
                        :options="sdeptInfo"
                        style="margin-bottom: 16px;"
                        placeholder="请选择系部"
                    />
                    <n-input v-model:value="majorName" placeholder="请输入专业名" clearable />
                </template>
            </m-new-card>
            <m-new-card title="新建班级" @open-model="openTeam" @confirm="newTeam">
                <template #icon>
                    <wallet-outline />
                </template>
                <template #model>
                    <n-select
                        v-model:value="selectSdept"
                        :options="sdeptInfo"
                        style="margin-bottom: 16px;"
                        @update:value="updateSdept"
                        placeholder="请选择系部"
                    />
                    <n-select
                        v-model:value="selectMajor"
                        :options="majorInfo"
                        style="margin-bottom: 16px;"
                        @focus="getMajor"
                        placeholder="请选择专业"
                    />
                    <n-input
                        v-model:value="graduationYear"
                        placeholder="请输入年级（例: 2021）"
                        clearable
                        style="margin-bottom: 16px;"
                    />
                    <n-input v-model:value="teamName" placeholder="请输入班级名" clearable />
                </template>
            </m-new-card>
        </n-grid>
    </n-card>

    <n-card title="新建人员" class="n-card-user">
        <n-grid x-gap="12" :cols="4">
            <m-new-card title="新建教工" @open-model="openTeacher" @confirm="newTeacher">
                <template #icon>
                    <person-outline />
                </template>
                <template #model>
                    <n-select
                        v-model:value="selectSdept"
                        :options="sdeptInfo"
                        style="margin-bottom: 16px;"
                        placeholder="请选择系部"
                    />
                    <n-input
                        v-model:value="teacherId"
                        placeholder="请输入工号"
                        clearable
                        style="margin-bottom: 16px;"
                    />
                    <n-input v-model:value="teacherName" placeholder="请输入教工名" clearable />
                </template>
            </m-new-card>
            <m-new-card title="新建学生" @open-model="openStudent" @confirm="newStudent">
                <template #icon>
                    <person-outline />
                </template>
                <template #model>
                    <n-select
                        v-model:value="selectSdept"
                        :options="sdeptInfo"
                        style="margin-bottom: 16px;"
                        placeholder="请选择系部"
                        @update:value="updateSdept"
                    />
                    <n-select
                        v-model:value="selectMajor"
                        :options="majorInfo"
                        style="margin-bottom: 16px;"
                        @focus="getMajor"
                        @update:value="updateMajor"
                        placeholder="请选择专业"
                    />
                    <n-select
                        v-model:value="selectTeam"
                        :options="teamInfo"
                        style="margin-bottom: 16px;"
                        @focus="getTeam"
                        placeholder="请选择班级"
                    />
                    <n-input
                        v-model:value="studentId"
                        placeholder="请输入学号"
                        clearable
                        style="margin-bottom: 16px;"
                    />
                    <n-input v-model:value="studentName" placeholder="请输入学生名" clearable />
                </template>
            </m-new-card>
        </n-grid>
    </n-card>
</template>
<script lang="ts" setup>
import { NGrid, NCard, NInput, NSelect, NDatePicker } from "naive-ui";
import { BusinessOutline, BookOutline as BookIcon, PersonOutline, TennisballOutline, WalletOutline } from "@vicons/ionicons5";
import MNewCard from "./MNewCard.vue";
import axiosApi from "../../axios";
const message = useMessage();
ref: range = [Date.now(), Date.now() + 1000] as [number, number];
ref: sdeptName = "";
const newSdept = (closeModel: Function) => {
    if (!sdeptName || sdeptName == "") {
        message.error("系部名不能为空");
        return;
    }
    axiosApi.post("/sdept/create", {
        name: sdeptName,
    }).then(res => {
        if (res.code == 200) {
            message.success("新建系部成功");
            closeModel();
        }
    })
}
const sdeptInfo = reactive<{ "value": number, label: string }[]>([]);
const majorInfo = reactive<{ "value": number, label: string }[]>([]);
const teamInfo = reactive<{ "value": number, label: string }[]>([]);
const openMajor = () => {
    selectSdept = undefined;
    getSdept();
}

const getSdept = () => {
    axiosApi.get("/sdept").then(res => {
        if (res.code == 200) {
            sdeptInfo.length = 0;
            res.data.forEach((element: { id: number, name: string }) => {
                sdeptInfo.push({
                    value: element.id,
                    label: element.name,
                })
            });
        }
    });
}
/**获取班级信息 */
const getTeam = () => {
    if (!selectMajor) {
        message.error("专业不能为空");
        return;
    }
    axiosApi.get("/class", { majorId: selectMajor }).then(res => {
        if (res.code == 200) {
            teamInfo.length = 0;
            res.data.forEach((element: { id: number, name: string, graduationYear: string }) => {
                teamInfo.push({
                    value: element.id,
                    label: element.name + " " + element.graduationYear,
                })
            });
        }
    });
}
ref: majorName = "";
ref: selectSdept = undefined;
ref: selectMajor = undefined;
ref: selectTeam = undefined;
const newMajor = (closeModel: Function) => {
    if (!selectSdept) {
        message.error("系部不能为空");
        return;
    }
    if (!majorName) {
        message.error("专业名不能为空");
        return;
    }

    axiosApi.post("/major/create", {
        name: majorName,
        sdeptId: selectSdept,
    }).then(res => {
        if (res.code == 200) {
            message.success("新建专业成功");
            closeModel();
        }
    })
}
const openTeam = () => {
    openMajor();
}

const updateSdept = () => {
    (selectMajor as any) = null;
}

const updateMajor = () => {
    (selectTeam as any) = null;
}

const getMajor = () => {
    if (!selectSdept) {
        message.error("系部不能为空");
        return;
    }
    selectMajor = undefined;
    axiosApi.get("/major", { sdeptId: selectSdept }).then(res => {
        if (res.code == 200) {
            majorInfo.length = 0;
            res.data.forEach((element: { id: number, name: string }) => {
                majorInfo.push({
                    value: element.id,
                    label: element.name,
                })
            });
        }
    });
}
ref: graduationYear = "";
ref: teamName = "";
const newTeam = (closeModel: Function) => {
    if (!selectMajor) {
        message.error("专业不能为空");
        return;
    }
    if (!graduationYear) {
        message.error("年级不能为空");
        return;
    }
    if (!teamName) {
        message.error("班级不能为空");
        return;
    }
    axiosApi.post("/class/create", { name: teamName, graduationYear, majorId: selectMajor }).then(res => {
        if (res.code == 200) {
            message.success("新建班级成功");
            closeModel();
        }
    });
}

const openTeacher = () => {
    (selectSdept as any) = null;
    teacherId = "";
    teacherName = ""
    getSdept();
}

ref: teacherId = "";
ref: teacherName = "";
const newTeacher = (closeModel: Function) => {
    if (!selectSdept) {
        message.error("系部不能为空");
        return;
    }
    if (!teacherId) {
        message.error("工号不能为空");
        return;
    }
    if (!teacherName) {
        message.error("教工名不能为空");
        return;
    }
    axiosApi.post("/teacher/create", { name: teacherName, id: parseInt(teacherId), sdeptId: selectSdept }).then(res => {
        if (res.code == 200) {
            message.success("新建教工成功");
            closeModel();
        }
    });
}

const openStudent = () => {
    (selectTeam as any) = null;
    (selectMajor as any) = null;
    (selectSdept as any) = null;
    studentId = "";
    studentName = "";
    getSdept();
}

ref: studentId = "";
ref: studentName = "";
const newStudent = (closeModel: Function) => {
    if (!selectTeam) {
        message.error("班级不能为空");
        return;
    }
    if (!studentId) {
        message.error("学号不能为空");
        return;
    }
    if (!studentName) {
        message.error("名字不能为空");
        return;
    }
    axiosApi.post("/student/create", { name: studentName, id: parseInt(studentId), sdeptId: selectSdept, majorId: selectMajor, classId: selectTeam }).then(res => {
        if (res.code == 200) {
            message.success("新建学生成功");
            closeModel();
        }
    });
}
</script>

<script lang="ts">
import { reactive } from "vue";
import { useMessage } from 'naive-ui';

</script>
<style scoped>
.n-card-user {
    margin-bottom: 20px;
}
</style>