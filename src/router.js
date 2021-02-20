/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import { cosh } from 'core-js/fn/number'
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import store from '../src/store/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue'),
                meta: { 
                  requiresAuth: true
                },
                beforeEnter: (to, from, next) => {
                  if(store.state.auth.me.role=="admin"){
                    next();
                  }
                }
              },
              {
                path: '/Categories',
                name: 'categories',
                component: () => import('./views/pages/Categories.vue'),
                meta: { 
                  requiresAuth: true
                },
                beforeEnter: (to, from, next) => {
                  if(store.state.auth.me.role=="admin"){
                    next();
                  }
                }
              },
              {
                path: '/Companies',
                name: 'companies',
                component: () => import('./views/pages/Companies.vue'),
                meta: { 
                  requiresAuth: true
                },
                beforeEnter: (to, from, next) => {
                  if(store.state.auth.me.role=="admin"){
                    next();
                  }
                }
              },
              {
                path: '/Deals',
                name: 'deals',
                component: () => import('./views/pages/Deals.vue'),
                meta: { 
                  requiresAuth: true
                },
                beforeEnter: (to, from, next) => {
                  if(store.state.auth.me.role=="admin"){
                    next();
                  }
                }
              },
              {
                path: '/user',
                name: 'user',
                component: () => import('./views/pages/User.vue'),
                meta: { 
                  requiresAuth: true
                },
                beforeEnter: (to, from, next) => {
                  if(store.state.auth.me.role=="admin"){
                    next();
                  }
                }
              },
              {
                path: '/profile',
                name: 'profile',
                component: () => import('./views/pages/Profile.vue'),
                meta: { 
                  requiresAuth: true
                }
              },
              {
                path: '/customerdeal',
                name: 'customerdeal',
                component: () => import('./views/pages/CustomerDeal.vue'),
                meta: { 
                  requiresAuth: true
                },
                beforeEnter: (to, from, next) => {
                  console.log("rotue girdi");
                  if(store.state.auth.me.role=="user"){
                    next();
                  }
                }
              },
              {
                path: '/pages',
                name: 'pages',
                component: () => import('./views/pages/Pages.vue'),
                meta: { 
                  requiresAuth: true
                },
                beforeEnter: (to, from, next) => {
                  console.log("rotue girdi");
                  if(store.state.auth.me.role=="admin"){
                    next();
                  }
                }
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/login',
                name: 'login',
                component: () => import('@/views/pages/Login.vue'),
                meta: { 
                  requiresAuth: false
                }
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue'),
                meta: { 
                  requiresAuth: false
                }
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.auth.isLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
