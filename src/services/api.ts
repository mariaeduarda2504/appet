import axios from "axios";

export const api = axios.create({
    baseURL: "https://adonis-xop0.onrender.com",
    headers: {
        Accept: 'application/json'
    }
})