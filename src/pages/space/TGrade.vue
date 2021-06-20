<template>
    <n-data-table :columns="columns" :data="data" :bordered="false" />
</template>
<script lang="ts" setup>
import { h } from 'vue'
import { NTag, NButton, NDataTable, } from 'naive-ui';

const createColumns = (sendMail: any) => {
    return [
        {
            title: '学期',
            key: 'semester',

        },
        {
            title: '课程名',
            key: 'name',

        },
        {
            title: '教工',
            key: 'name'
        },
        {
            title: 'Action',
            key: 'actions',
            render(row: any) {
                return h(
                    NButton,
                    {
                        size: 'small',
                        onClick: () => sendMail(row)
                    },
                    { default: () => '录入成绩' }
                )
            }
        }
    ]
}

const createData = () => {
    return [
        {
            key: 0,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer']
        },
        {
            key: 1,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['wow']
        },
        {
            key: 2,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher']
        }
    ]
};


const data = createData();
const columns = createColumns(
    function sendMail(rowData: { name: string }) {
        console.info('send mail to ' + rowData.name)
    }
);


</script>