import Vue from 'vue';
import VueRouter from 'vue-router';
import EscolasPage from '@/components/EscolasPage.vue';


Vue.use(VueRouter);

const routes = [
  { path: '/', component: EscolasPage },
];

const router = new VueRouter({
  routes,
});

export default router;
