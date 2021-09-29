<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
      console.log(process.env.NODE_ENV);
  },
};
</script>

<style lang="less">
// 引入初始化样式
@import "./assets/reset.css";
</style>
