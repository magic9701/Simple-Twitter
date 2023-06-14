import axios from "axios";

const authURL = "https://pure-falls-11392.herokuapp.com/api";

//取得使用者資料
export const getUserData = async (token, id) => {
  try {
    const response = await axios.get(`${authURL}/users/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("[Get User Data Failed]: ", error);
  }
};

//使用者修改帳戶資料
export const resetUserAccount = async (
  token,
  id,
  { account, name, email, password, checkPassword }
) => {
  try {
    const { data } = await axios.put(
      `${authURL}/users/${id}`,
      {
        account,
        name,
        email,
        password,
        checkPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
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
