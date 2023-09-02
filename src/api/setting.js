import axiosInstance from "./AxiosInstance";

//取得使用者資料by id
export const getUserData = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("[Get User Data Failed]: ", error);
  }
};

//取得使用者資料by account
export const getUserDataByAccount = async (userAccount) => {
  try {
    const response = await axiosInstance.get(`/users/${userAccount}/users`);
    return response.data;
  } catch (error) {
    console.error("[Get User Data by Account Failed]: ", error);
  }
};

//使用者修改帳戶資料
export const resetUserAccount = async (
  id,
  { account, name, email, password, checkPassword }
) => {
  try {
    const { data } = await axiosInstance.put(`/users/${id}`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });
    const { status } = data;

    if (status === "success") {
      return { success: true };
    }

    return data;
  } catch (error) {
    const { message } = error.response.data;
    console.error("[Register Failed]: ", error);
    return { success: false, message: message };
  }
};
