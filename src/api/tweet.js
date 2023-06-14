import axios from 'axios';
const authURL ="https://pure-falls-11392.herokuapp.com/api"

const axiosTwitter = axios.create({
    authURL,
  });

  axiosTwitter.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
    }
  );
