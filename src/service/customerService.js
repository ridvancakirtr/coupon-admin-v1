const accessService = require('../axios');
import Vue from 'vue'
const vue = new Vue();

const getAllDealsbyCustomers = async (payload) => {
    return await accessService.default.get("/customers/"+payload)
        .then((response) => {
            if (response.data.success) {
                return response.data.data
            } else {
                vue.$notifyService.notify("Error", error, "danger")
            }
        })
        .catch((error) => {
            vue.$notifyService.notify("Error", element, "danger")
        })
}

const updateCustomerNotification = async (payload) => {
    return await accessService.default.patch("/customers/"+payload._id,{isNotification:payload.isNotification})
        .then((response) => {
            if (response.data.success) {
                vue.$notifyService.notify("Notification Updated", response.data.message, "success")
                return response.data.data
            } else {
                vue.$notifyService.notify("Error", error, "danger")
            }
        })
        .catch((error) => {
            vue.$notifyService.notify("Error", element, "danger")
        })
}

export default {
    getAllDealsbyCustomers,
    updateCustomerNotification
}