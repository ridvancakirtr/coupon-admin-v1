const accessService = require('../axios');
import Vue from 'vue'
const vue = new Vue();

const getAllCategories = async () => {
  const res = await accessService.default.get("/categories");
  return await accessService.default.get("/categories")
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Get All Category", response.data.message, "success")
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

const updateCategory = async (payload) => {
  return await accessService.default.put("/categories/" + payload.id, { name: payload.name })
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Update Category", response.data.message, "success")
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

const addCategory = async (payload) => {
  return await accessService.default.post("/categories", payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Add Category", response.data.message, "success")
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

const deleteCategory = async (payload) => {
  return await accessService.default.delete("/categories/" + payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Delete Category", response.data.message, "success")
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
  getAllCategories,
  updateCategory,
  addCategory,
  deleteCategory
}