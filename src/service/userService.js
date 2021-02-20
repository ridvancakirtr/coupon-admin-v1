const accessService = require('../axios');
import Vue from 'vue'
const vue = new Vue();

const getAllUsers = async () => {
    return await accessService.default.get("/users")
        .then((response) => {
            if (response.data.success) {
                vue.$notifyService.notify("All Users", response.data.message, "success")
                return response.data.data
            } else {
                vue.$notifyService.notify("Error", error, "danger")
            }
        })
        .catch((error) => {
            error.response.data.error.forEach((element) => {
                vue.$notifyService.notify("Error", element, "danger")
            })
        })
}

const getUser = async (payload) => {
    return await accessService.default.get("/users/" + payload)
        .then((response) => {
            if (response.data.success) {
                vue.$notifyService.notify("User", response.data.message, "success")
                return response.data.data
            } else {
                vue.$notifyService.notify("Error", error, "danger")
            }
        })
        .catch((error) => {
            error.response.data.error.forEach((element) => {
                vue.$notifyService.notify("Error", element, "danger")
            })
        })
}

const updateUser = async (payload) => {
    return await accessService.default.put("/users/" + payload._id, payload.obj)
        .then((response) => {
            if (response.data.success) {
                vue.$notifyService.notify("User", response.data.message, "success")
                return response.data.data
            } else {
                vue.$notifyService.notify("Error", error, "danger")
            }
        })
        .catch((error) => {
            error.response.data.error.forEach((element) => {
                vue.$notifyService.notify("Error", element, "danger")
            })
        })
}

const passwordUpdate = async (payload) => {
    return await accessService.default.post("/users/passwordupdate", payload)
        .then((response) => {
            //console.log("response",response);
            if (response.data.success) {
                vue.$notifyService.notify("Update Password Success", "Password update successfully", "success")
                return response.data
            } else {
                vue.$notifyService.notify("Error", error, "danger")
            }
        })
        .catch((error) => {
            vue.$notifyService.notify("Error", "Password Update Failed", "danger")
        })
}

const deleteUser = async (payload) => {
    return await accessService.default.delete("/users/" + payload)
        .then((response) => {
            if (response.data.success) {
                vue.$notifyService.notify("User", response.data.message, "success")
                return response.data.data
            } else {
                vue.$notifyService.notify("Error", error, "danger")
            }
        })
        .catch((error) => {
            error.response.data.error.forEach((element) => {
                vue.$notifyService.notify("Error", element, "danger")
            })
        })
}

const createUser = async (payload) => {
    return await accessService.default.post("/users/", payload)
        .then((response) => {
            if (response.data.success) {
                vue.$notifyService.notify("User", response.data.message, "success")
                return response.data.data
            } else {
                vue.$notifyService.notify("Error", error, "danger")
            }
        })
        .catch((error) => {
            error.response.data.error.forEach((element) => {
                vue.$notifyService.notify("Error", element, "danger")
            })
        })
}

export default {
    getAllUsers,
    getUser,
    updateUser,
    passwordUpdate,
    deleteUser,
    createUser
}
