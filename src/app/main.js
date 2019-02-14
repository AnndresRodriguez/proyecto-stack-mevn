import Vue from 'vue'
import App from "./App.vue";
import VueRouter from 'vue-router'
import { store } from "./store";
import { routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
