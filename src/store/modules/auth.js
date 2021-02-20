import authService from '../../service/authService'

const state = {
    isLoggedIn: false,
    me:{}
}

const mutations = {

    IS_LOGGED(state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn
    },
    SET_ME(state, me) {
        state.me = me
    }
}

const actions = {
    async login({ commit }, payload) {
        return authService.login(payload).then(async (res) => {
            if (res.success) {
                commit('IS_LOGGED', res.success)
                await this.dispatch('me')
                return true
            } else {
                console.log("Hata Login")
                return false
            }

        })
    },
    async logout() {
        return authService.logout().then((res) => {
            if (res.success) {
                return true
            } else {
                console.log("Hata logout")
                return false
            }
        })
    },
    async me({ commit }) {
        return authService.me().then((res) => {
            if (res.success) {
                commit('SET_ME', res.data)
                return true
            }
        })
    },
    async updateDetails(_,payload) {
        return authService.updateDetails(payload).then((res) => {
            //console.log(res)
        })
    },
    async updatePassword(_,payload) {
        return authService.updatePassword(payload).then((res) => {
            //console.log(res)
        })
    },
}

export default {
    state,
    mutations,
    actions
}