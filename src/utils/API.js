import axios from "axios";
const burl = "http://localhost:7000";

export default {
  getUsers: () => {
    return axios.get(`${burl}/users/`);
  },

  getUser: (id) => {
    return axios.get(`${burl}/users/${id}`);
  },

  addUser: (user) => {
    return axios.post(`${burl}/users/add`, user);
  },

  editUser: (id, user) => {
    return axios.put(`${burl}/users/${id}`, user);
  },

  getPictureURL: (filename) => {
    return burl + '/public/' + filename;
  }
};