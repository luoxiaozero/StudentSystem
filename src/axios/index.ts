import axios from "axios";
import router from "../router";
import { useRoute } from "vue-router";
import store from "../store";
interface ResponseType {
  code: number;
  msg?: string;
  data?: any;
}
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASEURL;

/**post请求头 */
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8;";

/**设置超时 */
axios.defaults.timeout = 10000;

/**请求守卫 */
axios.interceptors.request.use(
  (config) => {
    if (store.userToken) {
      config.headers["AccessToken"] = store.userToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**响应守卫 */
axios.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          const route = useRoute();

          store.userToken = "";
          router.push({
            path: "/login",
            query: { redirect: route.fullPath },
          });
        default:
          console.error("提示:" + "网络请求失败，请刷新重试", error);
      }
    }
    return Promise.reject(error);
  }
);
const axiosApi = {
  post(url: string, data?: object | FormData) {
    return new Promise<ResponseType>((resolve, reject) => {
      axios({
        method: "post",
        url,
        data,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.error(err);
        });
    });
  },
  get(url: string, params?: object) {
    return new Promise<ResponseType>((resolve, reject) => {
      axios({
        method: "get",
        url,
        params,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          console.error(err);
        });
    });
  },
};
export default axiosApi;
