import categoryService from '../../service/categoryService'

const state = {
    allCategories: [],
    updateCategory: {}
}

const mutations = {

    GET_ALL_CATEGORIES(state, value) {
        state.allCategories = value
    },

    UPDATE_CATEGORY(state, value) {
        state.updateCategory = value
    }
}

const actions = {
    async getAllCategories({ commit }) {
        categoryService.getAllCategories().then((res) => {
            commit('GET_ALL_CATEGORIES', res);
        })
    },

    async updateCategory({ commit }, payload) {
        categoryService.updateCategory(payload).then((res) => {
            commit('UPDATE_CATEGORY', res);
            this.dispatch('getAllCategories')
        })
    },

    async addCategory({ commit }, payload) {
        categoryService.addCategory(payload).then((res) => {
            this.dispatch('getAllCategories')
        })
    },

    async deleteCategory({ commit }, payload) {
        categoryService.deleteCategory(payload).then((res) => {
            this.dispatch('getAllCategories');
        })
    }
}

export default {
    state,
    mutations,
    actions
}