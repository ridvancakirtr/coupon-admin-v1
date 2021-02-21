import axios from 'axios'
//const baseURL = 'http://localhost:1010/api/v1/'
const baseURL = 'https://coupon-server-v1.herokuapp.com/api/v1/'
export default axios.create({
  baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials:true
})
