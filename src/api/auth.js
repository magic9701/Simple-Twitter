import axios from "axios";

const authURL = "https://pure-falls-11392.herokuapp.com/api";

//使用者登入
export const login = async ({ account, password }) => {
  try {
    const { data: responseData } = await axios.post(`${authURL}/users/signin`, {
      account,
      password,
    });
    const { token } = responseData.data;
    const currentUserId = responseData.data.user.id;
    const currentUserAccount = responseData.data.user.account;

    if (token) {
      return {
        success: true,
        token: token,
        currentUserId: currentUserId,
        currentUserAccount: currentUserAccount,
      };
    }
  } catch (error) {
    console.error("[Login Failed]:", error);
    const { message } = error.response.data;
    return { success: false, message };
  }
};

//註冊
export const register = async ({
  account,
  name,
  email,
  password,
  checkPassword,
}) => {
  try {
    const { data } = await axios.post(`${authURL}/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });
    const { status, message } = data;

    if (status === "success") {
      return { success: true, message: message };
    }

    return data;
  } catch (error) {
    const { message } = error.response.data;
    console.error("[Register Failed]: ", error);
    return { success: false, message: message };
  }
};

//檢查使用者是否登入
export const checkUserPermission = async (token) => {
  try {
    const response = await axios.get(`${authURL}/auth/user`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response;
  } catch (error) {
    console.error("[Check Permission Failed]:", error);
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
