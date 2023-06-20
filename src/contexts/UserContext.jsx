import { createContext } from "react";
import { followUser, unfollowUser } from "api/followship";
import { likeTweet, unlikeTweet } from "api/PostTweet";
export const UserContext = createContext(null);

export function UserProvider({ children }) {
  // 追蹤用戶
  const follow = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { success } = await followUser(token, id);
      if (success) {
        return;
      }
    } catch (error) {
      console.log("追蹤使用者時發生錯誤:", error);
      return { error };
    }
  };

  // 退追蹤
  const unfollow = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const { success } = await unfollowUser(token, id);
      if (success) {
        return;
      }
    } catch (error) {
      console.log("退追蹤使用者時發生錯誤:", error);
      return { error };
    }
  };

  // 喜歡貼文
  const likeATweet = async (tweetId) => {
    try {
      const token = localStorage.getItem("token");
      const { success } = await likeTweet(token, tweetId);
      if (success) {
        console.log("喜歡貼文");
      }
    } catch (error) {
      console.log("喜歡貼文時發生錯誤:", error);
      return { error };
    }
  };

  // 收回喜歡
  const unlikeATweet = async (tweetId) => {
    try {
      const token = localStorage.getItem("token");
      const { success } = await unlikeTweet(token, tweetId);
      if (success) {
        console.log("收回喜歡貼文");
      }
    } catch (error) {
      console.log("收回喜歡貼文時發生錯誤:", error);
      return { error };
    }
  };

  const contextValue = {
    follow,
    unfollow,
    likeATweet,
    unlikeATweet,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
