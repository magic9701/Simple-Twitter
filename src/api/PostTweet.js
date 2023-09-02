import axiosInstance from "./AxiosInstance";

//新增推文
export const postTweet = async (description) => {
  try {
    const bodyData = {
      description: description,
    };
    const response = await axiosInstance.post(`/tweets`, bodyData);
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Post Tweet Failed]: ", error);
  }
};

//新增回覆
export const postReply = async (comment, tweetId) => {
  try {
    const bodyData = {
      comment: comment,
    };
    const response = await axiosInstance.post(
      `/tweets/${tweetId}/replies`,
      bodyData
    );
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Post Reply Failed]: ", error);
  }
};

//取得所有推文
export const getAllTweets = async () => {
  try {
    const response = await axiosInstance.get(`/tweets`);

    const { data } = response;
    if (data) {
      return { data };
    }
  } catch (error) {
    console.error("[Get All Tweets Failed]: ", error);
  }
};

//取得特定使用者的所有推文
export const getUserTweets = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/tweets`);

    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Tweets Failed]: ", error);
  }
};

//取得特定使用者的所有回覆
export const getUserReply = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/replied_tweets`);

    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Replies Failed]: ", error);
  }
};

//取得特定使用者的所有Like的貼文
export const getUserLike = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/likes`);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Likes tweets Failed]: ", error);
  }
};

//取得單一推文的回應
export const getSingleReplyTweet = async (postId) => {
  try {
    const response = await axiosInstance.get(`/tweets/${postId}/replies`);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Single Tweet Replies Failed]: ", error);
  }
};

//取得指定推文
export const getSingleTweet = async (postId) => {
  try {
    const response = await axiosInstance.get(`/tweets/${postId}`);
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Single Tweet Failed]: ", error);
  }
};

//喜歡一則貼文
export const likeTweet = async (tweetId) => {
  try {
    const response = await axiosInstance.post(`/tweets/${tweetId}/like`);
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[User Like Tweet Failed]: ", error);
  }
};

//取消喜歡一則貼文
export const unlikeTweet = async (tweetId) => {
  try {
    const response = await axiosInstance.post(`/tweets/${tweetId}/unlike`);
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[User unLike Tweet Failed]: ", error);
  }
};
