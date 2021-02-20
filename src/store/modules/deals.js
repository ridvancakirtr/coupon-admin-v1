import dealService from '../../service/dealService'

const state = {
    allDeals: [],
    updateDeal: {}
}

const mutations = {

    GET_ALL_DEALS(state, value) {
        state.allDeals = value
    },

    UPDATE_DEAL(state, value) {
        state.updateDeal = value
    }
}

const actions = {
    async getAllDeals({ commit }) {
        dealService.getAllDeals().then((res) => {
            commit('GET_ALL_DEALS', res);
        })
    },

    async updateDeal({ commit }, payload) {
        dealService.updateDeal(payload).then((res) => {
            commit('UPDATE_DEAL', res);
            this.dispatch('getAllDeals')
        })
    },

    async addDeal({ commit }, payload) {
        dealService.addDeal(payload).then((res) => {
            this.dispatch('getAllDeals')
        })
    },

    async deleteDeal({ commit }, payload) {
        dealService.deleteDeal(payload).then((res) => {
            this.dispatch('getAllDeals');
        })
    },

    async uploadDealImage({ commit }, payload) {
        dealService.uploadDealImage(payload).then((res) => {
            this.dispatch('getAllDeals');
        })
    }
}

export default {
    state,
    mutations,
    actions
}