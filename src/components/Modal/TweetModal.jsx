import React, { useState } from "react";
import buttonstyles from "../../styles/Button.module.scss";
import styles from "../../styles/TweetModal.module.scss";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";

const Modal = ({ isOpen, onClose }) => {
  const [tweetInput, setTweetInput] = useState("");

  const handleInputChange = (event) => {
    setTweetInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleTweet();
    }
  };

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
      <div className={styles.modalOverlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <NotiFailIcon onClick={onClose} />
          </div>
          <div className={styles.avatarContainer}>
            <img src={"https://picsum.photos/300/300?text=1"} alt="avatar" />
          </div>
          <form>
            <textarea
              name="tweet"
              id="tweet-input"
              type="text"
              placeholder="有什麼新鮮事？"
              value={tweetInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </form>
          <button
            className={buttonstyles.secondaryButton}
            onClick={handleTweet}
          >
            推文
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
