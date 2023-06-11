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

// * 追蹤
export async function followUser(id) {
  try {
    const res = await axiosInstance.post(`${baseURL}/following`, { id });
    return res.data;
  } catch (error) {
    console.error('[Follow User failed]: ', error);
  }
}

// * 取消追蹤
export async function unfollowUser(id) {
  try {
    const res = await axiosInstance.delete(`${baseURL}/following/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Unfollow User failed]: ', error);
  }
}