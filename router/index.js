import { createRouter, createWebHistory } from 'vue-router';
import EscolasPage from '../components/EscolasPage.vue';
import AlunosPage from '../components/AlunosPage.vue';
import OrganizacaoPage from '../components/OrganizacaoPage.vue';

const routes = [
  {
    path: '/escolas',
    name: 'escolas',
    component: EscolasPage
  },
  {
    path: '/alunos',
    name: 'alunos',
    component: AlunosPage
  },
  {
    path: '/organizacao',
    name: 'organizacao',
    component: OrganizacaoPage
  },
  {
    path: '/',
    redirect: '/escolas'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
