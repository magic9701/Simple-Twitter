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
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// * 目前登入的使用者資訊
export async function getCurrentUser(id) {
  try {
    const res = await axiosTwitter.get(`${authURL}/users/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Get CurrentUser failed]: ', error);
    return error.response.data.status;
  }
}

// * 取得使用者資訊
export async function getUserData(id) {
  try {
    const res = await axiosTwitter.get(`${authURL}/users/${id}`);
    return res.data;
  } catch (error) {
    console.error('[Get User Data failed]: ', error);
  }
}

// * 取得使用者發過的推文
export async function getUserTweets(id) {
  try {
    const res = await axiosTwitter.get(`${authURL}/users/${id}/tweets`);
    return res.data;
  } catch (error) {
    console.error('[Get User Tweets failed]: ', error);
  }
}

// * 取得使用者回的推文
export async function getUserReplies(id) {
  try {
    const res = await axiosTwitter.get(
      `${authURL}/users/${id}/ replied_tweets`);
    return res.data;
  } catch (error) {
    console.error('[Get User Replies failed]: ', error);
  }
}

// * 取得使用者喜歡的推文
export async function getUserLikes(id) {
  try {
    const res = await axiosTwitter.get(`${authURL}/users/${id}/likes`);
    return res.data;
  } catch (error) {
    console.error('[Get User Likes failed]: ', error);
  }
}

// * 取得特定使用者的追隨者清單
export async function getUserFollowers(id) {
  try {
    const res = await axiosTwitter.get(`${authURL}/users/${id}/followers`);
    return res.data;
  } catch (error) {
    console.error('[Get User Followers failed]: ', error);
  }
}

// * 取得特定使用者的正在追隨清單
export async function getUserFollowings(id) {
  try {
    const res = await axiosTwitter.get(`${authURL}/users/${id}/followings`);
    return res.data;
  } catch (error) {
    console.error('[Get User Followings failed]: ', error);
  }
}

// * 修改個人資料 profile
export async function changeUserProfile(payload) {
  const { id, name, introduction, avatar, banner } = payload;
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const res = await axiosTwitter.put(
      `${authURL}/users/${id}`,
      {
        name,
        introduction,
        avatar,
        banner,
      },
      config
    );
    const { data, status } = res;
    return { data, status };
  } catch (error) {
    console.error('[Change User Profile failed]: ', error);
  }
}