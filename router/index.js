import { createRouter, createWebHistory } from 'vue-router';
import EscolasPage from '../components/EscolasPage.vue';
import AlunosPage from '../components/AlunosPage.vue';
import OrganizacaoPage from '../components/OrganizacaoPage.vue';
import AulasPage from '../components/AulasPage.vue';
import BemVindoPage from '../components/BemVindoPage.vue'; 

const routes = [
  {
    path: '/',
    name: 'bemVindo', 
    component: BemVindoPage 
  },
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
    path: '/aulas',
    name: 'aulas',
    component: AulasPage
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
