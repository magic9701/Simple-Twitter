import React, { useState } from "react";

// import Header from "components/Header/Header";
import { MainNav } from "components/Nav/Nav";
import styles from "../styles/MainPage.module.scss";
import Popular from "components/Popular/Popular";
import MainTweet from "../components/InputBlock/MainTweet";
import {
  TweetInfoCard,
  ReplyInfoCard,
} from "components/TweetInfoCard/TweetInfoCard";
const MainPage = () => {
  const [tweetInput, setTweetInput] = useState("");
  const [isError, setIsError] = useState(false); // 新增 isError 狀態

  const handleTweet = () => {
    // 在此處理推文的邏輯
    console.log("推文:", tweetInput);
    setTweetInput("");
  };
  return (
    <div className="container mx-auto">
      <div className={styles.mainContainer}>
        <div className={styles.Nav}>
          <MainNav />
        </div>
        <div className={styles.mainMiddle}>
          <div className={styles.Header}>
            <p>首頁</p>
          </div>
          <div className={styles.Tweetinput}>
            <div className={styles.tweetInput}>
              <MainTweet />
            </div>
            <div className={styles.TweetLine}></div>
            <div className={styles.tweetInfoCard}>
              <TweetInfoCard />
              <ReplyInfoCard />
              <TweetInfoCard />
              <TweetInfoCard />
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
