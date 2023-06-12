import React from "react";
// import Header from "components/Header/Header";
import { MainNav } from "components/Nav/Nav";
import styles from "../styles/MainPage.module.scss";
const MainPage = () => {
  return (
    <div className={styles.mainContainer}>
      <MainNav />
      <div className={styles.Header}>
        <p>首頁</p>
      </div>
    </div>
  );
};
export default MainPage;
