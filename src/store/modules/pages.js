import pageService from '../../service/pageService'

const state = {
    allPages: []
}

const mutations = {

    GET_ALL_PAGES(state, value) {
        state.allPages = value
    }
}

const actions = {
    async getAllPages({ commit }) {
        return pageService.getAllPages().then((res) => {
            commit('GET_ALL_PAGES', res);
            return true;
        })
    },

    async updatePage({ commit }, payload) {
        pageService.updatePage(payload).then((res) => {
            commit('UPDATE_DEAL', res);
            this.dispatch('getAllPages')
        })
    },

    async addPage({ commit }, payload) {
        pageService.addPage(payload).then((res) => {
            this.dispatch('getAllPages')
        })
    },

    async deletePage({ commit }, payload) {
        pageService.deletePage(payload).then((res) => {
            this.dispatch('getAllPages');
        })
    }
}

export default {
    state,
    mutations,
    actions
}