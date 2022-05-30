import axios from "axios";

const api = axios.create({
    baseURL: "https://newapibackendgp2.azurewebsites.net/api",
    // baseURL: "http://localhost:5000/api",
})

export default api;