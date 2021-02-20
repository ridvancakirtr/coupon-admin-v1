import userService from '../../service/userService'

const state = {
    allUsers: {}
}

const mutations = {

    GET_ALL_USER(state, value) {
        state.allUsers = value
    }
}

const actions = {
    async getAllUsers({ commit }) {
        return userService.getAllUsers().then((res) => {
            commit('GET_ALL_USER', res);
            return true
        })
    },
    async updateUser({ commit },payload) {
        userService.updateUser(payload).then((res) => {
            return true
        })
    },

    async createUser({ commit },payload) {
        userService.createUser(payload).then((res) => {
            this.dispatch('getAllUsers')
            return true
        })
    },
    
    async passwordUpdate ({ commit },payload) {
        userService.passwordUpdate(payload).then((res) => {
            return true
        })
    }
}

export default {
    state,
    mutations,
    actions
}