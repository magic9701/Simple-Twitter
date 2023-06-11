import axios from 'axios';

const baseURL = 'https://pure-falls-11392.herokuapp.com/';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
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

export async function likeTweet(id) {
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets/${id}/like`);
    return res.data;
  } catch (error) {
    console.error('[Like Tweet failed]: ', error);
  }
}

export async function unLikeTweet(id) {
  try {
    const res = await axiosInstance.post(`${baseURL}/tweets/${id}/unlike`);
    return res.data;
  } catch (error) {
    console.error('[Unlike Tweet failed]: ', error);
  }
}