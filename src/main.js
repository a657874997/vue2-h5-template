import Vue from "vue";
import App from "./App.vue";
import router from "./router";


import less from "less";
Vue.use(less);

// 按需引入所需的vant插件
import { Button } from "vant";
import "vant/lib/button/style";
Vue.use(Button);

// 引入封装的请求插件
import api from "./request/api";
Vue.prototype.$api = api;

// 自动换算rem
import "amfe-flexible"

// 引入自己的utils 通过this.$utils就可以调用对应的方法
import utils from "./utils"
Vue.use(utils)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
