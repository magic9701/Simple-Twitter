import axios from "axios";

const authURL = "https://pure-falls-11392.herokuapp.com/api";

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
