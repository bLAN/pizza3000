import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Admin from "./views/Admin";
import Overview from "./views/Overview";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/overview',
      name: 'overview',
      component: Overview,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
  ],
});
