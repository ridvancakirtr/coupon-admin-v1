/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

import companies from './modules/companies'
import categories from './modules/categories'
import deals from './modules/deals'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import customer from './modules/customer'
import users from './modules/users'
import pages from './modules/pages'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
      companies,
      categories,
      deals,
      auth,
      dashboard,
      customer,
      users,
      pages
    },
    getters,
    mutations,
    state,
    actions,
    strict: process.env.NODE_ENV !== 'production'
})
