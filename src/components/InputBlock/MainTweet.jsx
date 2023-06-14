import React, { useState } from "react";
import styles from "../../styles/MainTweet.module.scss";
import { SecondaryButton } from "../Button/Button";
const MainTweet = () => {
  const [tweetContent, setTweetContext] = useState("有什麼新鮮事？");
  const handleTweetContext = (e) => {
    setTweetContext(e.target.value);
  };
  const handleTweetContentClick = () => {
    if (tweetContent === "有什麼新鮮事？") {
      setTweetContext("");
    }
  };
  return (
    <div className={styles.tweetContainer}>
      <div className={styles.tweetContext}>
        <div className={styles.tweetDetail}></div>
        <img src={"https://picsum.photos/300/300?text=1"} alt="avatar" />
        <div className={styles.tweetInput}>
          <textarea
            type="text"
            className={styles.tweetTextarea}
            value={tweetContent}
            placeholder="有什麼新鮮事?"
            onChange={handleTweetContext}
            onClick={handleTweetContentClick}
          />
        </div>
      </div>
      <div className={styles.SecondaryButton}>
        <SecondaryButton>推文</SecondaryButton>
      </div>
    </div>
  );
};

export default MainTweet;
