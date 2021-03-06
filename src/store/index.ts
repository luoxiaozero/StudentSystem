import { ref } from "vue";

export interface State {
  userToken: string;
  userType: "teacher" | "student" | "admin" | "";
}

const state: State = {
  userToken: localStorage.getItem("userToken") || "",
  userType: (localStorage.getItem("userType") as any) || "",
};

export const theme = ref<any>(null);
export const spaceViewKey = ref<any>(null);

const store = new Proxy(state, {
  set(target, key: keyof State, value) {
    target[key] = value;
    if (typeof target[key] == "string") localStorage.setItem(key, target[key]);
    return true;
  },
});
export default store;
