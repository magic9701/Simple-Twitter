import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../../styles/UserTable.module.scss";

const UserTable = () => {
  const [currentUser, setCurrentUser] = useState(""); // 當前使用者帳號
  const location = useLocation();

  useEffect(() => {
    // 在元件 mount 時從 localStorage 中獲取當前使用者帳號
    const currentUserAccount = localStorage.getItem("currentUserAccount");
    setCurrentUser(currentUserAccount);
  }, []);

  return (
    <div className={styles.userTable}>
      <div>
        <NavLink
          className={`${styles.tweet} ${
            location.pathname === `/user/${currentUser}`
              ? styles.activeIcon
              : ""
          }`}
          to={`/user/${currentUser}`}
        >
          <p>推文</p>
        </NavLink>
      </div>
      <div>
        <NavLink
          className={`${styles.replies} ${
            location.pathname === `/user/${currentUser}/userReply`
              ? styles.activeIcon
              : ""
          }`}
          to={`/user/${currentUser}/userReply`}
        >
          <p>回覆</p>
        </NavLink>
      </div>
      <div>
        <NavLink
          className={`${styles.likes} ${
            location.pathname === `/user/${currentUser}/userLike`
              ? styles.activeIcon
              : ""
          }`}
          to={`/user/${currentUser}/userLike`}
        >
          <p>喜歡的內容</p>
        </NavLink>
      </div>
    </div>
  );
};

export default UserTable;
