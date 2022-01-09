<template>
  <div class="bg-img">
    <img src="../assets/login-bg.png" />
  </div>
  <div class="box">
    <n-card style="width: 440px;border-radius: 10px;" content-style="padding:22px 28px 11px;">
      <template #default>
        <n-tabs size="large" v-model:value="userInfo.type">
          <n-tab-pane name="student" tab="员工登录">
            <n-form>
              <n-form-item-row label="用户名">
                <n-input v-model:value="userInfo.account" placeholder="请输入用户名" clearable />
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
          <n-tab-pane name="teacher" tab="部门财务登录">
            <n-form>
              <n-form-item-row label="用户名">
                <n-input v-model:value="userInfo.account" placeholder="请输入用户名" clearable />
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
          <n-tab-pane name="admin" tab="管理员登录">
            <n-form>
              <n-form-item-row label="用户名">
                <n-input v-model:value="userInfo.account" placeholder="请输入用户名" clearable />
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
store.userToken && router.push("/space");
ref: isMobile = false;

const ua = navigator.userAgent;
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const isIphone =!ipad && !!ua.match(/(iPhone\sOS)\s([\d_]+)/);
const isAndroid = !!ua.match(/(Android)\s+([\d.]+)/);
isMobile = (isIphone || isAndroid) as boolean;

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
  axiosApi.post("/" + userInfo.type + "/login", userInfo).then(res => {
    if (res.code == 200) {
      store.userType = userInfo.type as any;
      store.userToken = res.data.token;
      router.push("/space");
    } else {
      showMessage(res.msg || "error");
    }
  })
}
</script>
<script lang="ts" >
import { reactive } from "vue";
</script>
<style scoped>
.bg-img {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
.bg-img img {
  width: 1200px;
  height: 593px;
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
.box > .n-card {
  animation: box-a 2s;
}
@keyframes box-a {
  0% {
    transform: scale(0);
    filter: blur(8px);
  }
  40% {
    filter: blur(2px);
  }
  46% {
    filter: blur(0);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    
  }
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