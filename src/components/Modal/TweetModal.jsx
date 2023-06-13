import React, { useState } from "react";
import buttonstyles from "../../styles/Button.module.scss";
import styles from "../../styles/TweetModal.module.scss";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";
<<<<<<< HEAD
import TweetInput from "../InputBlock/TweetInput";

const Modal = ({ isOpen, onClose }) => {
  const [tweetInput, setTweetInput] = useState("");
  const [isError, setIsError] = useState(false); // 新增 isError 狀態
=======
import UserInput from "../InputBlock/tweetInput";
const Modal = ({ isOpen, onClose }) => {
  const [tweetInput, setTweetInput] = useState("");
  const [isError, setIsError] = useState(false);
>>>>>>> main

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
<<<<<<< HEAD
      <div className="container mx-auto">
        <div className={styles.modalOverlay} onClick={onClose} />
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <NotiFailIcon className={styles.NotiFailIcon} onClick={onClose} />
            </div>
            <div className={styles.tweetContainer}>
              <div className={styles.avatarContainer}>
                <img
                  src={"https://picsum.photos/300/300?text=1"}
                  alt="avatar"
                />
              </div>
              <div className={styles.TweetInput}>
                <TweetInput
                  name="tweet"
                  id="tweet-input"
                  type="text"
                  placeholder="有什麼新鮮事？"
                  value={tweetInput}
                  setIsError={setIsError} // 傳遞 setIsError 屬性
                />
              </div>
            </div>
            <div className={styles.tweetButton}>
              <button
                className={buttonstyles.secondaryButton}
                onClick={handleTweet}
              >
                推文
              </button>
            </div>
          </div>
=======
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.notiFailIcon}>
              <NotiFailIcon onClick={onClose} />
            </div>
          </div>
          <div className={styles.imgTweet}>
            <div className={styles.userImg}>
              <img src={"https://picsum.photos/300/300?text=1"} alt="avatar" />
            </div>
            <div className={styles.userTextarea}>
              <UserInput
                placeholder="有什麼新鮮事"
                maxLength={140}
                value={tweetInput}
                setIsError={setIsError} // 確保將 setIsError 函數傳遞給 setIsError 屬性
                inputHeight={26}
              />
            </div>
          </div>
          <div className={styles.buttonContent}>
            <button
              className={buttonstyles.secondaryButton}
              onClick={handleTweet}
            >
              推文
            </button>
          </div>
>>>>>>> main
        </div>
      </div>
    </>
  );
};

export default Modal;
