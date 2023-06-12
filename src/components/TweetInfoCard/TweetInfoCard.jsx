import { useState } from "react";
import styles from "../../styles/TweetInfoCard.module.scss";
import { ReactComponent as ReplyIcon } from "../../assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like-icon.svg";

export function TweetInfoCard() {
  return (
    <div className={styles.tweetCardContainer}>
      {/* 頭像 */}
      <div className={styles.avatarContainer}>avatar</div>
      <div className={styles.information}>
        {/* 使用者名字、帳號、時間 */}
        <div className={styles.topInfo}>
          <h6 className={styles.name}>Apple</h6>
          <h6 className={styles.userId}>@apple・3 小時</h6>
        </div>
        {/* 回覆 */}
        <div className={styles.replyBy}>
          <h6 className={styles.reply}>回覆</h6>
          <h6 className={styles.replyUserId}>@apple</h6>
        </div>
        {/* 內容 */}
        <div className={styles.botInfo}>
          AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASSSSSSSSSSS
        </div>
      </div>
    </div>
  );
}

export function ReplyInfoCard() {
  const [likeCount, setLikeCount] = useState(76); // 初始化愛心數量為 76

  const handleLikeIcon = () => {
    setLikeCount((prevCount) => {
      if (prevCount > 0) {
        return prevCount - 1; // 已經按過愛心，減一
      } else {
        return prevCount + 1; // 按一下愛心按鈕愛心數量加一
      }
    });
  };
  return (
    <div className={styles.tweetCardContainer}>
      {/* 頭像 */}
      <div className={styles.avatarContainer}>avatar</div>
      <div className={styles.information}>
        {/* 使用者名字、帳號、時間 */}
        <div className={styles.topInfo}>
          <h6 className={styles.name}>Apple</h6>
          <h6 className={styles.userId}>@apple・3 小時</h6>
        </div>
        {/* 內容 */}
        <div className={styles.tweetContent}>
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
        {/* 回覆及愛心 */}
        <div className={styles.iconContainer}>
          <div className={styles.replyContainer}>
            <ReplyIcon className={styles.replyIcon} />
            <h6 className={styles.replyCount}>1</h6>
          </div>
          <div className={styles.likeContainer}>
            <LikeIcon className={styles.likeIcon} onClick={handleLikeIcon} />
            <h6 className={styles.LikeCount}>{likeCount}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
