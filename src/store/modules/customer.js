import customerService from '../../service/customerService'

const state = {
    allDeals: []
}

const mutations = {
    GET_ALL_CUSTOMERS(state, value) {
        state.allDeals = value
    }
}

const actions = {
    async getAllDealsbyCustomers({ commit },payload) {
        return customerService.getAllDealsbyCustomers(payload).then((res) => {
            commit('GET_ALL_CUSTOMERS', res);
            return true
        })
    },
    async updateCustomerNotification({ commit },payload) {
        return customerService.updateCustomerNotification(payload).then((res) => {
            return true
        })
    },
}

export default {
    state,
    mutations,
    actions
}