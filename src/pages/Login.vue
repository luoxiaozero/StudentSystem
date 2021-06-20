<template>
  <div class="bg-img"></div>
  <div class="box">
    <n-card style="width: 440px;border-radius: 10px;" content-style="padding:22px 28px 11px;">
      <template #default>
        <n-tabs size="large" v-model:value="userInfo.type">
          <n-tab-pane name="student" tab="学生登录">
            <n-form>
              <n-form-item-row label="用户名">
                <n-input v-model:value="userInfo.account" placeholder="请输入学号" clearable />
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input
                  v-model:value="userInfo.password"
                  type="password"
                  placeholder="请输入密码"
                  clearable
                />
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block @click="login">登录</n-button>
          </n-tab-pane>
          <n-tab-pane name="teacher" tab="教工登录">
            <n-form>
              <n-form-item-row label="用户名">
                <n-input v-model:value="userInfo.account" placeholder="请输入教工号" clearable />
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input v-model:value="userInfo.password" type="password" placeholder="请输入密码" />
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block @click="login">登录</n-button>
          </n-tab-pane>
          <n-tab-pane name="admin" tab="管理员登录">
            <n-form>
              <n-form-item-row label="用户名">
                <n-input v-model:value="userInfo.account" placeholder="请输入账号" clearable />
              </n-form-item-row>
              <n-form-item-row label="密码">
                <n-input v-model:value="userInfo.password" type="password" placeholder="请输入密码" />
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block @click="login">登录</n-button>
          </n-tab-pane>
        </n-tabs>
      </template>

      <template #footer>
        <div class="box__message" v-if="isShowMessage">{{ message }}</div>
      </template>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
import { NCard, NTabs, NTabPane, NButton, NFormItemRow, NInput, NForm } from "naive-ui";
import router from "../router";
import axiosApi from "../axios";
import store from "../store";

const userInfo = reactive({
  type: "student",
  account: "",
  password: "",
});

ref: isShowMessage = false;
ref: message = "";
const showMessage = (msg: string) => {
  message = msg;
  isShowMessage = true;
  setTimeout(() => isShowMessage = false, 3000);
}

const login = () => {
  if (!(userInfo.account && userInfo.password)) {
    showMessage("账号密码不能为空");
    return;
  }
  axiosApi.post("/login", userInfo).then(res => {
    if (res.code == 200) {
      store.userType = userInfo.type as any;
      store.userToken = res.data.token;
      router.push("/space");
    }
  })
}
</script>
<script lang="ts" >
import { reactive } from "vue";
</script>
<style scoped>
.bg-img {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(8px);
  background: #fff0;
  background-image: url("/src/assets/20200610113912817.jpg");
  background-repeat: round;
}
.title {
  font-size: 2.8em;
  color: white;
}
.box {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box__message {
  height: 26px;
  line-height: 26px;
  position: absolute;
  text-align: center;
  bottom: -1px;
  left: -1px;
  right: -1px;
  background-color: #f32;
  color: white;
  border-radius: 0 0 10px 10px;
}
</style>