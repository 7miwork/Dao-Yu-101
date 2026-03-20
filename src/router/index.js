import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/home/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/about/About.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../pages/shop/Shop.vue')
  },
  {
    path: '/archipelago/:id',
    name: 'Archipelago',
    component: () => import('../pages/archipelago/Archipelago.vue')
  },
  {
    path: '/island/:id',
    name: 'Island',
    component: () => import('../pages/island/Island.vue')
  },
  {
    path: '/lesson/:id',
    name: 'Lesson',
    component: () => import('../pages/lesson/Lesson.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router