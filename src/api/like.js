import axios from 'axios';

const authURL = 'https://pure-falls-11392.herokuapp.com/api';

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

export async function likeTweet(tweetId) {
  try {
    const res = await axiosTwitter.post(`${authURL}/tweets/${tweetId}/like`);
    return res.data;
  } catch (error) {
    console.error('[Like Tweet failed]: ', error);
  }
}

export async function unLikeTweet(tweetId) {
  try {
    const res = await axiosTwitter.post(`${authURL}/tweets/${tweetId}/unlike`);
    return res.data;
  } catch (error) {
    console.error('[Unlike Tweet failed]: ', error);
  }
}