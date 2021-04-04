import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home.vue'
import Product from '@/components/Products/Product.vue'
import NewProduct from '@/components/Products/NewProduct.vue'
import ProductList from '@/components/Products/ProductList.vue'
import Checkout from '@/components/User/Checkout.vue'
import Login from '@/components/Auth/Login.vue'
import Register from '@/components/Auth/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:id',
    props: true,
    name: 'product',
    component: Product
  },
  {
    path: '/new',
    name: 'new',
    component: NewProduct,
    beforeEnter: AuthGuard
  },
  {
    path: '/list',
    name: 'list',
    component: ProductList,
    beforeEnter: AuthGuard
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    beforeEnter: AuthGuard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
