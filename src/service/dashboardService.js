const accessService = require('../axios');
import Vue from 'vue'
const vue = new Vue();

const getTotalDCC = async () => {
  return await accessService.default.get("/dashboard/getTotalDCC")
    .then((response) => {
      if (response.data.success) {
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

const getUsageDeals = async () => {
  return await accessService.default.get("/dashboard/getUsageDeals")
    .then((response) => {
      if (response.data.success) {
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
  getTotalDCC,
  getUsageDeals
}