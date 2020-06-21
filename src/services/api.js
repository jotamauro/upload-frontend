import axios from "axios";
const api = axios.create({
  baseURL: "https://box-jotamauro.herokuapp.com",
});

export default api;
