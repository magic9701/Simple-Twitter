import axios from "axios";

const authURL = "https://pure-falls-11392.herokuapp.com/api";

//新增推文
export const postTweet = async (token, description) => {
  try {
    const bodyData = {
      description: description,
    };
    const response = await axios.post(`${authURL}/tweets`, bodyData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Post Tweet Failed]: ", error);
  }
};

//新增回覆
export const postReply = async (token, comment, tweetId) => {
  try {
    const bodyData = {
      comment: comment,
    };
    const response = await axios.post(
      `${authURL}/tweets/${tweetId}/replies`,
      bodyData,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Post Reply Failed]: ", error);
  }
};

//取得所有推文
export const getAllTweets = async (token) => {
  try {
    const response = await axios.get(`${authURL}/tweets`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const { data } = response;
    if (data) {
      return { data };
    }
  } catch (error) {
    console.error("[Get All Tweets Failed]: ", error);
  }
};

//取得特定使用者的所有推文
export const getUserTweets = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}/tweets`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Tweets Failed]: ", error);
  }
};

//取得特定使用者的所有回覆
export const getUserReply = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}/replied_tweets`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Replies Failed]: ", error);
  }
};

//取得特定使用者的所有Like的貼文
export const getUserLike = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}/likes`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Likes tweets Failed]: ", error);
  }
};

//取得單一推文的回應
export const getSingleReplyTweet = async (token, postId) => {
  try {
    const response = await axios.get(`${authURL}/tweets/${postId}/replies`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Single Tweet Replies Failed]: ", error);
  }
};

//取得指定推文
export const getSingleTweet = async (token, postId) => {
  try {
    const response = await axios.get(`${authURL}/tweets/${postId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      return response;
    }
  } catch (error) {
    console.error("[Get User Single Tweet Failed]: ", error);
  }
};

//喜歡一則貼文
export const likeTweet = async (token, tweetId) => {
  try {
    const response = await axios.get(`${authURL}/tweets/${tweetId}/like`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Get User Like Tweet Failed]: ", error);
  }
};

//取消喜歡一則貼文
export const unlikeTweet = async (token, tweetId) => {
  try {
    const response = await axios.get(`${authURL}/tweets/${tweetId}/unlike`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      return { success: true };
    }
  } catch (error) {
    console.error("[Get User unLike Tweet Failed]: ", error);
  }
};
