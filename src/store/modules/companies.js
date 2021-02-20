import companiesService from '../../service/companiesService'

const state = {
    allCompanies: [],
    updateCompany: {},
    companyInform:{}
}

const mutations = {

    GET_ALL_COMPANIES(state, value) {
        state.allCompanies = value
    },

    UPDATE_COMPANY(state, value) {
        state.updateCompany = value
    },

    SET_COMPANY(state, value) {
        state.companyInform = value
    }
}

const actions = {
    async getAllCompanies({ commit }) {
        companiesService.getAllCompanies().then((res) => {
            commit('GET_ALL_COMPANIES', res);
        })
    },

    async updateCompany({ commit }, payload) {
        companiesService.updateCompany(payload).then((res) => {
            commit('UPDATE_COMPANY', res);
            this.dispatch('getAllCompanies')
        })
    },

    async addCompany({ commit }, payload) {
        companiesService.addCompany(payload).then((res) => {
            this.dispatch('getAllCompanies')
        })
    },

    async deleteCompany({ commit }, payload) {
        companiesService.deleteCompany(payload).then((res) => {
            this.dispatch('getAllCompanies');
        })
    },
    async getCompany({ commit }, payload) {
        return companiesService.getCompany(payload).then((res) => {
            commit('SET_COMPANY', res.data);
            return true
        })
    },

    async uploadCompanyImage({ commit }, payload) {
        companiesService.uploadCompanyImage(payload).then((res) => {
            this.dispatch('getAllCompanies');
        })
    }
}

export default {
    state,
    mutations,
    actions
}