import { createRouter, createWebHistory } from 'vue-router'
import CheckersGame from '../views/CheckersGame.vue'
import Instructions from '../views/Instructions.vue'

const routes = [
  {
    path: '/',
    name: 'Game',
    component: CheckersGame
  },
  {
    path: '/instructions',
    name: 'Instructions',
    component: Instructions
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router