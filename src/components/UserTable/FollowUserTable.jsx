import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/UserTable.module.scss";

const FollowUserTable = () => {
  return (
    <div className={styles.userTable}>
      <NavLink className={styles.category} to={`/follower`}>
        <p>追隨者</p>
      </NavLink>
      <NavLink className={styles.category} to={`/following`}>
        <p>正在追蹤</p>
      </NavLink>
    </div>
  );
};

export default FollowUserTable;
