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
    console.error("[Get User Data Failed]: ", error);
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
    console.error("[Get User Data Failed]: ", error);
  }
};
