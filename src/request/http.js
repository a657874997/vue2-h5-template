/*
 * @Author: helei
 * @Date: 2021-09-29 14:08:59
 * @LastEditors: helei
 * @LastEditTime: 2021-09-29 16:06:16
 * @msg: 对于ajax的封装
 */
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_H5_URL,
  timeout: 30 * 1000, // 请求超过30s。自动中断
});

instance.defaults.headers.post["Content-Type"] = "application/json";

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    //  =========判断是否有token。若有，则添加到请求头中=========
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "bearer " + token;
    }
    //======================================================
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      instance({
        method: "get",
        url,
        params,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      instance({
        method: "post",
        url,
        data: JSON.stringify(data),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default http;
