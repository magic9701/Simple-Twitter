import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/UserTable.module.scss";

const UserTable = ({ id }) => {
  return (
    <div className={styles.userTable}>
      <NavLink className={styles.category} to={`/users/${id}/tweets`}>
        <p>推文</p>
      </NavLink>
      <NavLink className={styles.category} to={`/users/${id}/replies`}>
        <p>回覆</p>
      </NavLink>
      <NavLink className={styles.category} to={`/users/${id}/likes`}>
        <p>喜歡的內容</p>
      </NavLink>
    </div>
  );
};

export default UserTable;
