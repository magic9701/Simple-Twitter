import axiosInstance from "api/AxiosInstance.js";

//取得追蹤人數前10名的使用者
export const getTopTenUser = async () => {
  try {
    const response = await axiosInstance.get(`/followships?top=10`);
    const { users } = response.data;
    if (users) {
      return { users };
    }
  } catch (error) {
    console.error("[Get Top Ten User Data Failed]: ", error);
  }
};

//追蹤用戶
export const followUser = async (id) => {
  try {
    const bodyData = {
      id,
    };
    const response = await axiosInstance.post(`/followships`, bodyData);
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Follow User Failed]: ", error);
  }
};

//取消追蹤
export const unfollowUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/followships/${id}`);
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Follow User Failed]: ", error);
  }
};

//取得追隨者的清單
export const userFollower = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/followers`);
    const followerList = response.data;
    if (followerList) {
      return { followerList };
    }
  } catch (error) {
    console.error("[Get User Follower Failed]: ", error);
  }
};

//取得追隨中的清單
export const userFollowing = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/followings`);
    const followingList = response.data;
    if (followingList) {
      return { followingList };
    }
  } catch (error) {
    console.error("[Get User Following List Failed]: ", error);
  }
};
