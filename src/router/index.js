import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/pages/Home'

import Edit from '@/pages/admin/Edit'
import Index from '@/pages/admin/Index'
import New from '@/pages/admin/New'
import Products from '@/pages/admin/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Index,
      //rotas filhas
      children: [{
        path: 'new',
        name: 'New',
        component: New
      }, {
        path: '',
        name: 'Products',
        component: Products
      }, {
        path: 'edit/:id',
        name: 'Edit',
        component: Edit
      }]

    }
  ]
})
