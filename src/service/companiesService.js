const accessService = require('../axios');
import Vue from 'vue'
const vue = new Vue();

const getAllCompanies = async () => {
  return await accessService.default.get("/companies")
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("All Companies", response.data.message, "success")
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

const updateCompany = async (payload) => {
  return await accessService.default.put("/companies/" + payload._id, { ...payload })
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Update Company", response.data.message, "success")
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

const addCompany = async (payload) => {
  return await accessService.default.post("/companies", payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Add Company", response.data.message, "success")
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

const deleteCompany = async (payload) => {
  return await accessService.default.delete("/companies/" + payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Delete Company", response.data.message, "success")
        return response.data
      } else {
        vue.$notifyService.notify("Error", error, "danger")
      }
    })
    .catch((error) => {
      vue.$notifyService.notify("Error", error, "danger")
    })
}

const getCompany = async (payload) => {
  return await accessService.default.get("/companies/" + payload)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Get Company", response.data.message, "success")
        return response.data
      } else {
        vue.$notifyService.notify("Error", error, "danger")
      }
    })
    .catch((error) => {
      vue.$notifyService.notify("Error", error, "danger")
    })
}

const uploadCompanyImage = async (payload) => {
  return await accessService.default.put("/companies/" + payload._id + "/logo", payload.data)
    .then((response) => {
      if (response.data.success) {
        vue.$notifyService.notify("Upload Company Image", response.data.message, "success")
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
  getAllCompanies,
  updateCompany,
  uploadCompanyImage,
  addCompany,
  deleteCompany,
  getCompany
}