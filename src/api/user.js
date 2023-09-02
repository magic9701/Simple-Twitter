import axios from "axios";

const baseURL = "https://twitter-api-on-cloud-run-txr4klwjbq-uc.a.run.app/api";

// * 修改個人資料 profile

export const changeUserProfile = async (token, id, formData) => {
  try {
    const { data } = await axios.put(`${baseURL}/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });
    if (data) {
      return { success: true };
    }
  } catch (error) {
    console.error("[putPersonalInfo failed]", error);
  }
};
