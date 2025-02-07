import axios from "axios";

const api = axios.create({
    baseURL:'http://10.0.0.161:8000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'Application/JSON'
    }
})

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Busca o token salvo
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.log("Token expirado. Faça login novamente.");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
  




export default api