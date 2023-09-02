import axios from "axios";

const authURL = "https://twitter-api-on-cloud-run-txr4klwjbq-uc.a.run.app/api";

//瀏覽使用者清單
export const adminGetUserList = async (adminToken) => {
  try {
    const response = await axios.get(`${authURL}/admin/users`, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
    const userList = response.data;
    return { userList: userList };
  } catch (error) {
    console.error("[Get User List Failed]: ", error);
  }
};

//瀏覽全站的Tweet
export const adminGetTweet = async (adminToken) => {
  try {
    const response = await axios.get(`${authURL}/admin/tweets`, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
    const tweetList = response.data;
    return { tweetList };
  } catch (error) {
    console.error("[Get tweet List Failed]: ", error);
  }
};

//刪除使用者貼文
export const adminDeleteTweet = async (adminToken, id) => {
  try {
    const response = await axios.delete(`${authURL}/admin/tweets/${id}`, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
    if (response) {
      console.log(response);
      return { success: "success" };
    }
  } catch (error) {
    console.error("[Get tweet List Failed]: ", error);
  }
};

//檢查管理者是否登入
export const checkAdminPermission = async (adminToken) => {
  try {
    const response = await axios.get(`${authURL}/auth/admin`, {
      headers: {
        Authorization: "Bearer " + adminToken,
      },
    });
    return response;
  } catch (error) {
    console.error("[Check Permission Failed]:", error);
  }
};

//管理者登入
export const adminLogin = async ({ account, password }) => {
  try {
    const { data: responseData } = await axios.post(`${authURL}/admin/signin`, {
      account,
      password,
    });
    const { token } = responseData.data;
    const currentAdminUser = responseData.data.user.account;

    if (token) {
      return {
        success: true,
        adminToken: token,
        currentAdminUser: currentAdminUser,
      };
    }
  } catch (error) {
    console.error("[Admin Login Failed]:", error);
    const { message } = error.response.data;
    return { success: false, message };
  }
};
