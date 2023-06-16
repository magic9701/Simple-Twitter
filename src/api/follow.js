import axios from 'axios';

const authURL = 'https://pure-falls-11392.herokuapp.com/api';

const axiosTwitter = axios.create({
  authURL,
});
//核對TOKEN
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

// * 追蹤
export async function followUser(id) {
  try {
    const res = await axiosTwitter.post(`${authURL}/followships`, { id });
    return res.data;
  } catch (error) {
    console.error('[Follow User failed]: ', error);
  }
}

// * 取消追蹤
export async function unfollowUser(id) {
  try {
    const res = await axiosTwitter.delete(`${authURL}/followships/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Unfollow User failed]: ', error);
  }
}
// * 取得追蹤人數 top N 的使用者名單
export async function getTopUsers() {
  try {
    const res = await axiosTwitter.get(`${authURL}/followships?top=n`);
    return res.data;
  } catch (error) {
    console.error('[Get Top Users failed]: ', error);
  }
}