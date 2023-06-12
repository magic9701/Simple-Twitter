import React, { useState } from "react";

// import Header from "components/Header/Header";
import { MainNav } from "components/Nav/Nav";
import styles from "../styles/MainPage.module.scss";
import Popular from "components/Popular/Popular";
import TweetInput from "components/InputBlock/TweetInput";
import { SecondaryButton } from "../components/Button/Button";
const MainPage = () => {
  const [tweetInput, setTweetInput] = useState("");
  const [isError, setIsError] = useState(false); // 新增 isError 狀態

  const handleTweet = () => {
    // 在此處理推文的邏輯
    console.log("推文:", tweetInput);
    setTweetInput("");
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.Nav}>
        <MainNav />
      </div>
      <div className={styles.Header}>
        <p>首頁</p>
      </div>
      <div className={styles.Tweetinput}>
        <div className={styles.avatarContainer}>
          <img src={"https://picsum.photos/300/300?text=1"} alt="avatar" />
        </div>
        <TweetInput
          name="tweet"
          id="tweet-input"
          type="text"
          placeholder="有什麼新鮮事？"
          value={tweetInput}
          setIsError={setIsError} // 傳遞 setIsError 屬性
        />
        <SecondaryButton onClick={handleTweet}>推文</SecondaryButton>
      </div>
      <div className={styles.Popular}>
        <Popular />
      </div>
    </div>
  );
};
export default MainPage;
