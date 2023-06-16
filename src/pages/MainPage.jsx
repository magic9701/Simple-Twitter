import React, { useState } from "react";

// import Header from "components/Header/Header";
import { MainNav } from "components/Nav/Nav";
import styles from "../styles/MainPage.module.scss";
import Popular from "components/Popular/Popular";
import MainTweet from "../components/InputBlock/MainTweet";
import { ReplyInfoCard } from "components/TweetInfoCard/TweetInfoCard";
import Header from "components/Header/Header";

const MainPage = () => {
  return (
    <div className="container mx-auto">
      <div className={styles.mainContainer}>
        <div className={styles.Nav}>
          <MainNav />
        </div>
        <div className={styles.mainMiddle}>
          <div className={styles.Header}>首頁</div>
          <div className={styles.Tweetinput}>
            <div className={styles.tweetInput}>
              <MainTweet />
            </div>
            <div className={styles.TweetLine}></div>
            <div className={styles.tweetInfoCard}>
              <ReplyInfoCard />
              <ReplyInfoCard />
              <ReplyInfoCard />
            </div>
          </div>
        </div>
        <div className={styles.Popular}>
          <Popular />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
