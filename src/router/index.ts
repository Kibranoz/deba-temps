import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import ('../views/Welcome.vue')
  },
  {
    path: '/debatePlay/:id',
    component: () => import ('../views/DebatePlay.vue')
  },
  {
    path: '/configMaker',
    component: () => import("../views/DebateConfigurationMaker.vue")
  },
  {
  path: "/settings",
  component: ()=> import("../views/Settings.vue")
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
