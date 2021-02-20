const accessService = require('../axios');
import Vue from 'vue'
const vue = new Vue();

const getAllDeals = async () => {
  return await accessService.default.get("/deals")
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("All Deals", response.data.message, "success")
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

const updateDeal = async (payload) => {
  return await accessService.default.put("/deals/" + payload._id, { ...payload })
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Update Deal", response.data.message, "success")
        return response.data
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

const addDeal = async (payload) => {
  return await accessService.default.post("/deals", payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Add Deal", response.data.message, "success")
        return response.data
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

const deleteDeal = async (payload) => {
  return await accessService.default.delete("/deals/" + payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Delete Deal", response.data.message, "success")
        return response.data
      } else {
        vue.$notifyService.notify("Error", error, "danger")
      }
    })
    .catch((error) => {
      vue.$notifyService.notify("Error", error, "danger")
    })
}

const uploadDealImage = async (payload) => {
  return await accessService.default.put("/deals/" + payload._id + "/image", payload.data)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Upload Deal Image", response.data.message, "success")
        return response.data
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
  getAllDeals,
  updateDeal,
  addDeal,
  uploadDealImage,
  deleteDeal
}