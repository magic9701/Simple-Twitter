import { createContext, useState } from 'react';
import { followUser, unfollowUser } from 'api/followship';

export const UserContext = createContext(null);

export function UserProvider({ children }) {

  // 追蹤用戶
  const follow = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const { success } = await followUser(token,id)
      console.log(success)
      if (success) {
        console.log("追蹤成功")
      } 
    } catch (error) {
      console.log("追蹤使用者時發生錯誤:", error)
      return {error}
    }
  };

  // 退追蹤
  const unfollow = async (id) => {
    try {
      const token = localStorage.getItem("token")
      const { success } =  await unfollowUser(token,id)
      if (success) {
        console.log("退追蹤成功")
      } 
    } catch (error) {
      console.log("退追蹤使用者時發生錯誤:", error)
      return {error}
    }
  }

  const contextValue = {
    follow,
    unfollow
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}