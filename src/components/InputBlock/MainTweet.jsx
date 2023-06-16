import React, { useEffect, useState } from "react";
import styles from "../../styles/MainTweet.module.scss";
import { SecondaryButton } from "../Button/Button";
import { addTweet, getTweets } from "../../api/tweet";
import { getCurrentUser } from "../../api/user";
import { ReactComponent as DefaultavatarIcon } from "../../assets/icons/default-avatar.svg";
const MainTweet = () => {
  const [tweetContent, setTweetContext] = useState("有什麼新鮮事？");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleTweetContext = (e) => {
    setTweetContext(e.target.value);
  };

  const handleTweetContentClick = async () => {
    if (tweetContent === "有什麼新鮮事？") {
      setTweetContext("");
    }

    setIsLoading(true);
    try {
      // 提交新的推文
      await addTweet({ description: tweetContent });
      // 更新取得所有推文
      await getTweets();
      // 推文提交成功後，重設輸入的資料
      setTweetContext("");
    } catch (error) {
      console.error("推文提交失敗：", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser(userData?.id || "");
        setUserData(user);
      } catch (error) {
        console.error("[Get CurrentUser failed]: ", error);
      }
    };

    fetchUserData();
  }, [userData?.id]);
  if (userData) {
    const {
      name,
      avatar,
      banner,
      account,
      introduction,
      userFollowing,
      userFollower,
    } = userData;
  }

  return (
    <div className={styles.tweetContainer}>
      <div className={styles.tweetContext}>
        <div className={styles.tweetDetail}></div>
        {userData && userData.avatar ? (
          <img src={userData.avatar} alt="avatar" />
        ) : (
          <DefaultavatarIcon />
        )}

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
        <SecondaryButton onClick={handleTweetContentClick} disabled={isLoading}>
          {isLoading ? "提交中..." : "推文"}
        </SecondaryButton>
      </div>
    </div>
  );
};

export default MainTweet;
