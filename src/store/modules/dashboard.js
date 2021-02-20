import dashboardService from '../../service/dashboardService'

const state = {
    getAllDCC: {},
    totalDealUsage: 0
}

const mutations = {

    SET_ALL_DCC(state, value) {
        state.getAllDCC = value
    },
    SET_TOTAL_DEAL_USAGE(state, value) {
        state.totalDealUsage = value
    }
}

const actions = {
    async getTotalDCC({ commit }) {
        return dashboardService.getTotalDCC().then((res) => {
            commit('SET_ALL_DCC', res);
            return true
        })
    },
    async getUsageDeals({ commit }) {
        dashboardService.getUsageDeals().then((res) => {
            commit('SET_TOTAL_DEAL_USAGE', res.usage);
        })
    }
}

export default {
    state,
    mutations,
    actions
}