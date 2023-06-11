import React, { useState } from "react";
import styles from "../../styles/UserModal.module.scss";
import buttonstyles from "../../styles/Button.module.scss";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";
import UserInput from "../InputBlock/userInput";
const Modal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [isError, setIsError] = useState(false);
  const [introduction, setIntroduction] = useState("");
  if (!isOpen) {
    return null;
  }

  const handleNameChange = (value) => {
    setName(value);
  };
  const handleIntroductionChange = (value) => {
    setIntroduction(value);
  };
  return (
    <>
      <div className={styles.modalOverlay} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.notiFailIcon}>
              <NotiFailIcon onClick={onClose} />
            </div>
            <div className={styles.changeUserInfo}>
              <p>編輯個人資料</p>
            </div>
            <div className={styles.buttonContent}>
              <button className={buttonstyles.secondaryButton}>儲存</button>
            </div>
          </div>
          <div className={styles.backGroundImg}>
            <img src="https://picsum.photos/300/300?text=1" alt="" />
          </div>
          <div className={styles.userImg}>
            <img src="https://picsum.photos/300/300?text=2" alt="" />
          </div>
          <div className={styles.UserInputLabel}>
            <UserInput
              label="名稱"
              placeholder="請輸入名稱"
              value={name}
              onChange={handleNameChange}
              maxLength={50}
              setIsError={setIsError} // 传递 setIsError 函数
              textareaHeight={30}
            />
            <UserInput
              label="自我介紹"
              placeholder="請輸入自我介紹"
              value={introduction}
              onChange={handleIntroductionChange}
              maxLength={160}
              setIsError={setIsError} // 传递 setIsError 函数
              textareaHeight={115}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
