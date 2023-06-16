import React, { useState } from "react";
import buttonstyles from "../../styles/Button.module.scss";
import styles from "../../styles/ReplyModal.module.scss";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";
import TweetInput from "../InputBlock/TweetInput";
import { TweetInfoCard } from "components/TweetInfoCard/TweetInfoCard";
const Modal = ({ isOpen, onClose }) => {
  const [tweetInput, setTweetInput] = useState("");
  const [isError, setIsError] = useState(false); // 新增 isError 狀態

  const handleTweet = () => {
    // 在此處理推文的邏輯
    console.log("推文:", tweetInput);
    setTweetInput("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="container mx-auto">
        <div className={styles.modalOverlay} onClick={onClose} />
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <NotiFailIcon className={styles.NotiFailIcon} onClick={onClose} />
            </div>{" "}
            <div className={styles.tweetContainer}>
              <div className={styles.tweetContent}>
                <TweetInfoCard />
                <div className={styles.inputContainer}>
                  <div className={styles.avatarContainer}>
                    <img
                      src={"https://picsum.photos/300/300?text=2"}
                      alt="avatar"
                    />
                  </div>
                  <div className={styles.textarea}>
                    <TweetInput
                      name="tweet"
                      type="text"
                      placeholder="有什麼新鮮事？"
                      value={tweetInput}
                      setIsError={setIsError} // 傳遞 setIsError 屬性
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.tweetButton}>
              <button
                className={buttonstyles.secondaryButton}
                onClick={handleTweet}
              >
                回覆
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
