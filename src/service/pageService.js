const accessService = require('../axios');
import Vue from 'vue'
const vue = new Vue();

const getAllPages = async () => {
  return await accessService.default.get("/pages")
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("All Pages", response.data.message, "success")
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

const updatePage = async (payload) => {
  return await accessService.default.put("/pages/" + payload._id, { ...payload })
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Update Page", response.data.message, "success")
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

const addPage = async (payload) => {
  return await accessService.default.post("/pages", payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Add Pages", response.data.message, "success")
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

const deletePage = async (payload) => {
  return await accessService.default.delete("/pages/" + payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Delete Pages", response.data.message, "success")
        return response.data
      } else {
        vue.$notifyService.notify("Error", error, "danger")
      }
    })
    .catch((error) => {
      vue.$notifyService.notify("Error", error, "danger")
    })
}

export default {
  getAllPages,
  updatePage,
  addPage,
  deletePage
}