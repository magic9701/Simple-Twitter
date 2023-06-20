import axios from 'axios';

const authURL = "https://pure-falls-11392.herokuapp.com/api";

const axiosInstance = axios.create({
  authURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// * 修改個人資料 profile

export const changeUserProfile = async (token, id, formData) => {
  try {
    const { data } = await axios.put(`${authURL}/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + token
      }
    })
    if (data) {
           return { success: true };
          }
  } catch (error) {
    console.error('[putPersonalInfo failed]', error)
  }
}