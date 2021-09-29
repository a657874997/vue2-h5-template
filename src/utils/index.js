/*
 * @Author: helei
 * @Date: 2021-09-29 16:07:29
 * @LastEditors: helei
 * @LastEditTime: 2021-09-29 16:33:38
 * @msg: 对常用插件封装
 */

const utils = {
  /**
   * @name: helei
   * @msg: 存储数据到本地缓存中
   * @param {*} key
   * @param {*} value
   * @return {*}
   */

  set_data(key, value) {
    window.localStorage &&
      window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  },
  /**
   * @name: helei
   * @msg: 从本地缓存中取出数据
   * @param {*} key
   * @return {*}
   */

  get_data(key) {
    if (!window.localStorage) {
      return "";
    }
    let value = window.localStorage.getItem(key) || "";
    return JSON.parse(value);
  },
  /**
   * @name: helei
   * @msg: 清楚缓存中的数据
   * @param {*} key
   * @return {*}
   */

  clear_data(key) {
    window.localStorage && window.localStorage.removeItem(key);
  },
  /**
   * @name: helei
   * @msg: 清楚数据
   * @param {*}
   * @return {*}
   */
  clear_all() {
    window.localStorage && window.localStorage.clear();
  },
  /**
   * @name: helei
   * @msg: 判断手机号是否合法
   * @param {*} val
   * @return {*}
   */
  isPhone(val) {
    let reg = /^1[0-9]{10}$/;
    return reg.test(val);
  },
  /**
   * @name: helei
   * @msg: 判断金额是否合法
   * @param {*} val
   * @return {*}
   */
  isMoney(val) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    return reg.test(val);
  },
};

export default {
  install: (vue) => {
    vue.prototype.$utils = utils;
  },
};
