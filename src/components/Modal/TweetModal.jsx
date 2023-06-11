import React, { useState } from "react";
import buttonstyles from "../../styles/Button.module.scss";
import styles from "../../styles/TweetModal.module.scss";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";
import UserInput from "../InputBlock/tweetInput";
const Modal = ({ isOpen, onClose }) => {
  const [tweetInput, setTweetInput] = useState("");
  const [isError, setIsError] = useState(false);

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
        </div>
      </div>
    </>
  );
};

export default Modal;
