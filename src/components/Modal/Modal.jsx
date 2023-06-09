import React, { useState } from "react";
import styles from "../../styles/UserModal.module.scss";
import buttonstyles from "../../styles/Button.module.scss";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";

const Modal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };
  // 測試中
  // const handleIntroductionChange = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   if (!introduction.trim().length) {
  //     setErrorMessage('內容不可空白');
  //     setIsSubmitting(false);
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 1000);
  //     return;
  //   }
  //   if (introduction.length > 160) {
  //     setErrorMessage('字數不可超過 160 字');
  //     setIsSubmitting(false);
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 1000);
  //     return;
  //   }
  // const handleNameChange = async (e) => {
  //   if (e.key === 'Enter') {
  //     setIsSubmitting(true);
  //     if (!name.trim().length) {
  //       setErrorMessage('內容不可空白');
  //       setIsSubmitting(false);
  //       setTimeout(() => {
  //         setErrorMessage(null);
  //       }, 1000);
  //       return;
  //     }
  //     if (tweetInput.length > 50) {
  //       setErrorMessage('字數不可超過 50 字');
  //       setIsSubmitting(false);
  //       setTimeout(() => {
  //         setErrorMessage(null);
  //       }, 1000);
  //       return;
  //     }

  return (
    <>
      <div className={styles.modalOverlay} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <NotiFailIcon onClick={onClose} />
            <p>編輯個人資料</p>
            <button className={buttonstyles.secondaryButton}>儲存</button>
          </div>
          <div className={styles.userinput}>
            <div>
              <label>名稱：{name}</label>
            </div>
            <div>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="請輸入名稱"
              />
            </div>
          </div>
          <div>
            <div className={styles.userinput}>
              <label>自我介紹：{introduction}</label>
            </div>
            <textarea
              value={introduction}
              onChange={handleIntroductionChange}
              placeholder="請輸入自我介紹"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
