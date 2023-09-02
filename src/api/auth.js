import axiosInstance from "./AxiosInstance";

//使用者登入
export const login = async ({ account, password }) => {
  try {
    const { data } = await axiosInstance.post(`/users/signin`, {
      account,
      password,
    });
    const token = data.data.token;
    const currentUserId = data.data.user.id;
    const currentUserAccount = data.data.user.account;

    if (data) {
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
    const { data } = await axiosInstance.post(`/users`, {
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
export const checkUserPermission = async () => {
  try {
    const response = await axiosInstance.get(`/auth/user`);
    return response;
  } catch (error) {
    console.error("[Check Permission Failed]:", error);
  }
};
