<template>
    <n-gi class="card" @click="openModel">
        <div>
            <div class="card__icon">
                <slot name="icon"></slot>
            </div>
            <div class="card__title">{{ props.title }}</div>
        </div>
    </n-gi>

    <n-modal
        v-model:show="isShowModel"
        preset="card"
        :style="{ width: props.modelWidth, borderRadius: '10px' }"
        :title="props.title"
        size="huge"
        :bordered="false"
    >
        <slot name="model"></slot>
        <template #footer>
            <n-button text style="float: right;" @click="confirm">确认</n-button>
        </template>
    </n-modal>
</template>

<script lang="ts" setup>
import { NGi, NModal, NButton } from "naive-ui";
const emits = defineEmit(["confirm", "openModel"]);
const props = defineProps({
    title: {
        type: String,
    },
    modelWidth: {
        type: String,
        default: "400px"
    }
});
ref: isShowModel = false;
const openModel = () => {
    isShowModel = true;
    emits("openModel");
}
const confirm = () => {
    emits("confirm", () => isShowModel = false);
}
</script>

<script lang="ts">
import { defineProps, defineEmit } from 'vue';
</script>

<style scoped>
.card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    background-color: #55bb8a;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.card:hover {
    background-color: #55c68a;
}
.card__icon {
    width: 60px;
    height: 60px;
}
@media screen and (max-width: 800px) {
    .card {
        width: 200px;
        height: 100px;
    }
    .card__icon {
        width: 40px;
        height: 40px;
    }
}
@media screen and (max-width: 700px) {
    .card {
        width: 100%;
        height: 120px;
    }
}
</style>