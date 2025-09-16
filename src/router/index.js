import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }, // 404
]

const router = createRouter({
  history: createWebHistory('/product-list-with-cart/'), // 👈 أضف الباث الأساسي
  routes,
})

export default router
