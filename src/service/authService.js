const accessService = require('../axios');
import Vue from 'vue'
const vue = new Vue();
var cookie = require('cookie');

const login = async (payload) => {
  return await accessService.default.post("/auth/login", payload)
    .then((response) => {
      if (response.data) {
        vue.$notifyService.notify("Login Success", "User successfully logged in", "success")
        return response.data
      } else {
        vue.$notifyService.notify("Error", error, "danger")
      }
    })
    .catch((error) => {
      vue.$notifyService.notify("Error", "Login Failed", "danger")
    })
}


const logout = async () => {
  return await accessService.default.post("/auth/logout")
    .then((response) => {
      console.log("response",response);
      if (response.data) {
        vue.$notifyService.notify("Logout Success", "User successfully logout in", "success")
        return response.data
      } else {
        vue.$notifyService.notify("Error", error, "danger")
      }
    })
    .catch((error) => {
      vue.$notifyService.notify("Error", "Logout Failed", "danger")
    })
}

const me = async () => {
  return await accessService.default.get("/auth/me")
    .then((response) => {
      if (response.data) {
        vue.$notifyService.notify("Profile Success", "Profile successfully", "success")
        return response.data
      } else {
        vue.$notifyService.notify("Error", error, "danger")
      }
    })
    .catch((error) => {
      vue.$notifyService.notify("Error", "Profile Failed", "danger")
    })
}



const updateDetails = async (payload) => {
  return await accessService.default.put("/auth/updatedetails",payload)
    .then((response) => {
      //console.log("response",response);
      if (response.data.success) {
        vue.$notifyService.notify("Update Profile Success", "Profile update successfully", "success")
        return response.data
      } else {
        vue.$notifyService.notify("Error", error, "danger")
      }
    })
    .catch((error) => {
      vue.$notifyService.notify("Error", "Profile Update Failed", "danger")
    })
}

const updatePassword = async (payload) => {
  return await accessService.default.put("/auth/updatepassword",payload)
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

export default {
  login,
  logout,
  me,
  updateDetails,
  updatePassword
}