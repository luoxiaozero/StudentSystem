<template>
    <n-card title="新建课堂" class="n-card-user">
        <n-grid x-gap="12" y-gap="16" cols="1 600:3 900:4 1100:5">
            <m-new-card
                title="新建必修"
                model-width="460px"
                @open-model="openCourse"
                @confirm="newCourse"
            >
                <template #icon>
                    <book-icon />
                </template>
                <template #model>
                    <n-input
                        placeholder="请输入课程名"
                        v-model:value="courseName"
                        clearable
                        style="margin-bottom: 16px;"
                    />
                    <n-date-picker
                        v-model:value="selectDateRange"
                        type="daterange"
                        clearable
                        style="margin-bottom: 16px;"
                    />
                    <n-select
                        filterable
                        v-model:value="selectTeacher"
                        :options="teacherInfo"
                        placeholder="请选择教工"
                        style="margin-bottom: 16px;"
                    />
                    <n-select
                        multiple
                        v-model:value="selectAllTeam"
                        :options="teamAllInfo"
                        placeholder="请选择班级"
                    />
                </template>
            </m-new-card>
        </n-grid>
    </n-card>
    <n-card title="新建组织" class="n-card-user">
        <n-grid x-gap="12" y-gap="16" cols="1 600:3 900:4 1100:5">
            <m-new-card title="新建系部" @open-model="openSdept" @confirm="newSdept">
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
        <n-grid x-gap="12" y-gap="16" cols="1 600:3 900:4 1100:5">
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
ref: selectDateRange = [Date.now(), Date.now() + 15768000] as [number, number];
ref: selectTeacher = undefined as any;
ref: courseName = "";
ref: sdeptName = "";
const openSdept = () => {
    sdeptName = "";
}
const newSdept = (closeModel: Function) => {
    if (!sdeptName || sdeptName == "") {
        message.error("系部名不能为空");
        return;
    }
    axiosApi.post("/sdept/create", {
        name: sdeptName,
    }).then(res => {
        if (res.code == 200) {
            message.success(res.msg || "成功");
            closeModel();
        } else {
            message.error(res.msg || "error");
        }
    })
}
const sdeptInfo = reactive<{ "value": number, label: string }[]>([]);
const majorInfo = reactive<{ "value": number, label: string }[]>([]);
const teamInfo = reactive<{ "value": number, label: string }[]>([]);
const teacherInfo = reactive<{
    type: 'group',
    label: string,
    key: string,
    children: Array<{
        label: string,
        value: string
    }>
}[]>([]);
ref: selectAllTeam = undefined as any;
const teamAllInfo = reactive<{
    type: 'group',
    label: string,
    key: string,
    children: Array<any>
}[]>([]);
const openCourse = () => {
    courseName = "";
    selectDateRange = [Date.now(), Date.now() + 15768000];
    selectTeacher = null;
    selectAllTeam = null;
    axiosApi.get("/sdept").then(res => {
        if (res.code == 200) {
            teamAllInfo.length = 0;
            res.data.forEach((element: { id: number, name: string }) => {
                let _sdept = element;
                axiosApi.get("/major", { sdeptId: element.id }).then(res => {
                    if (res.code == 200) {
                        res.data.forEach((element: { id: number, name: string }) => {
                            let _major: {
                                type: 'group',
                                label: string,
                                key: string,
                                children: Array<any>
                            } = { type: 'group', label: _sdept.name + " " + element.name, key: "major-" + _sdept.id.toString() + element.id.toString(), children: [] };
                            axiosApi.get("/class", { majorId: element.id }).then(res => {
                                if (res.code == 200) {
                                    res.data.forEach((element: { id: number, name: string, graduationYear: string }) => {
                                        let team = {
                                            value: _major.key + "-" + element.id.toString(),
                                            label: element.name,
                                        }
                                        _major.children.push(team)
                                    });
                                }
                            });
                            teamAllInfo.push(_major);
                        });
                    }
                });

            });
        }
    });

    axiosApi.get("/teacher").then(res => {
        if (res.code == 200) {
            const sdepts = new Map<string, any>();
            res.data.forEach((element: {
                id: number,
                name: string,
                sdeptName: string
            }) => {
                if (sdepts.has(element.sdeptName)) {
                    sdepts.get(element.sdeptName).children.push({
                        label: element.name,
                        value: element.id
                    })
                } else {
                    sdepts.set(element.sdeptName, {
                        type: 'group',
                        label: element.sdeptName,
                        key: element.sdeptName,
                        children: [{
                            label: element.name,
                            value: element.id
                        }]
                    });
                }
                teacherInfo.length = 0;
                sdepts.forEach(el => {
                    teacherInfo.push(el);
                })
                console.log(teacherInfo)
            });
        }
    })
}

const newCourse = (closeModel: Function) => {
    if (!courseName) {
        message.error("课程名不能为空");
        return;
    }
    if (!selectDateRange) {
        message.error("日期范围不能为空");
        return;
    }
    if (!selectTeacher) {
        message.error("教工不能为空");
        return;
    }
    if (!selectAllTeam) {
        message.error("班级不能为空");
        return;
    }

    let classIds: number[] = [];
    (selectAllTeam as unknown as string[]).forEach(element => {
        classIds.push(parseInt(element.split("-")[2]));
    });
    axiosApi.post("/course/create", {
        name: courseName,
        teacherId: selectTeacher,
        beginDate: selectDateRange[0],
        endDate: selectDateRange[1],
        classIds
    }).then(res => {
        if (res.code == 200) {
            closeModel();
            message.success(res.msg || "成功");
        } else {
            message.error(res.msg || "error");
        }
    })
}

/**新建专业初始化 */
const openMajor = () => {
    selectSdept = undefined;
    majorName = "";
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
ref: selectSdept = undefined as any;
ref: selectMajor = undefined as any;
ref: selectTeam = undefined as any;
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
            closeModel();
            message.success(res.msg || "成功");
        } else {
            message.error(res.msg || "error");
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
            closeModel();
            message.success(res.msg || "成功");
        } else {
            message.error(res.msg || "error");
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
            closeModel();
            message.success(res.msg || "成功");
        } else {
            message.error(res.msg || "error");
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
            closeModel();
            message.success(res.msg || "成功");
        } else {
            message.error(res.msg || "error");
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