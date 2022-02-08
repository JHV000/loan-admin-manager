<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in"
        ><router-view></router-view
      ></transition>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import * as service from "../../../config/service";
export default {
  components: {
    vHead,
    vSidebar,
  },
  created() {
    var loginInfoStorage = localStorage.getItem("login_info");
    var loginInfo = loginInfoStorage ? JSON.parse(loginInfoStorage) : {};
    var access_token = loginInfo.access_token || "";
    service.createService(access_token);
    // console.log(typeof(service.Service));
  },
};
</script>
<style scoped>
</style>