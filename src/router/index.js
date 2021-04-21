import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/product/:productId',
    name: 'product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/cat/:catId',
    name: 'cat',
    component: () => import('../views/Cat.vue')
  },
  {
    path: '/backend',
    name: 'Backend',
    component: () => import('../views/Backend.vue')
  },
  {
    path: '/mcat',
    name: 'ManageCategory',
    component: () => import('../views/ManageCategory.vue')
  },
  {
    path: '/mproduct',
    name: 'ManageProduct',
    component: () => import('../views/ManageProduct.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
