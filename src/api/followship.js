import axios from "axios";

const authURL = "https://pure-falls-11392.herokuapp.com/api";

//取得追蹤人數前10名的使用者
export const getTopTenUser = async (token) => {
  try {
    const response = await axios.get(`${authURL}/followships?top=10`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { users } = response.data;
    if (users) {
      return { users };
    }
  } catch (error) {
    console.error("[Get Top Ten User Data Failed]: ", error);
  }
};

//追蹤用戶
export const followUser = async (token, id) => {
  try {
    const bodyData = {
      id,
    };
    const response = await axios.post(`${authURL}/followships`, bodyData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Follow User Failed]: ", error);
  }
};

//取消追蹤
export const unfollowUser = async (token, id) => {
  try {
    const response = await axios.delete(`${authURL}/followships/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Follow User Failed]: ", error);
  }
};

//取得追隨者的清單
export const userFollower = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}/followers`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const followerList = response.data;
    if (followerList) {
      return { followerList };
    }
  } catch (error) {
    console.error("[Get User Follower Failed]: ", error);
  }
};

//取得追隨中的清單
export const userFollowing = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}/followings`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const followingList = response.data;
    if (followingList) {
      return { followingList };
    }
  } catch (error) {
    console.error("[Get User Following List Failed]: ", error);
  }
};
