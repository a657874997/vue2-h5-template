/*
 * @Author: helei
 * @Date: 2021-09-29 15:09:05
 * @LastEditors: helei
 * @LastEditTime: 2021-09-29 15:10:26
 * @msg: 请求接口的封装
 */

import http from "./http";

export default {
    // 接口 登录
    postLogin: data => http.post("https://baidu.com/User/Login", data),
    // 其他接口
}