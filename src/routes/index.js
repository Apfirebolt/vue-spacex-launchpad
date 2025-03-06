import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
      path: '/capsules',
      name: 'Capsules',
      component: () => import('../views/Capsules.vue')
    },
    {
      path: '/dragons',
      name: 'Dragons',
      component: () => import('../views/Dragons.vue')
    },
    {
      path: '/missions',
      name: 'Missions',
      component: () => import('../views/Missions.vue')
    },
    {
      path: '/launches',
      name: 'Launches',
      component: () => import('../views/Launches.vue')
    },
    {
      path: '/payloads',
      name: 'Payloads',
      component: () => import('../views/Payloads.vue')
    },
    {
      path: '/ships',
      name: 'Ships',
      component: () => import('../views/Ships.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
