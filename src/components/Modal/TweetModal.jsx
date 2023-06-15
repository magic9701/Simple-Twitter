import { useState, useEffect } from "react";
import { SecondaryButton } from "components/Button/Button.jsx";
import styles from "styles/TweetModal.module.scss";
import notiFailIcon from "assets/icons/noti-fail.svg";
import { postTweet } from "api/PostTweet";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import defaultAvatar from "assets/icons/default-avatar.svg"

//icon引入
import greenIcon from "assets/icons/green-Icon.svg"
import redIcon from "assets/icons/red-icon.svg"


const TweetModal = ({ isOpen, onClose, setModalOpen,userAvatar ,userAccount }) => {
  const [description, setDescription] = useState('');


  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  }

  //處理送出推文內容
  const handleTweet = async () => {
    const token = localStorage.getItem('token');
    //前端檢查輸入內容
    if(description.trim().length === 0) {
      //有異常跳提示框
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">輸入內容不可為空白!</div>
            <div class="${styles["my-custom-title-icon"]}">
              <img src="${redIcon}" alt="fail" class="${styles["my-custom-image"]}" />
            </div>
          </div>
        `,
        timer: 2500,
        showConfirmButton: false,
        customClass: {
          popup: styles['my-custom-popup'],
        }
      })
      return;
    }
    
    const { success } = await postTweet(token, description)
    if (success) {
      //顯示推文成功
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">推文成功!</div>
            <div class="${styles["my-custom-title-icon"]}">
              <img src="${greenIcon}" alt="success" class="${styles["my-custom-image"]}" />
            </div>
          </div>
        `,
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: styles['my-custom-popup'],
        }
      })
      setModalOpen(false)
    }if (!success) {
      //顯示推文失敗
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">推文失敗!</div>
            <div class="${styles["my-custom-title-icon"]}">
              <img src="${redIcon}" alt="fail" class="${styles["my-custom-image"]}" />
            </div>
          </div>
        `,
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: styles['my-custom-popup'],
        }
      })
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
      <div className={styles.modalOverlay} onClick={onClose} >
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <div className={`${styles.IconContainer} cursor-point`} onClick={onClose}>
              <img className={styles.NotiFailIcon} onClick={onClose} src={notiFailIcon} alt="close"/>
            </div>
          </div>
          <div className={styles.tweetContainer}>
            <div className={styles.avatarContainer}>
              <Link to={`/user/${userAccount}`}><img className="cursor-point"
                src={userAvatar ? userAvatar : defaultAvatar}
                alt="avatar"
              /></Link>
            </div>
            <div className={styles.textAreaContainer}>
              <textarea
                className={styles.textArea}
                placeholder="有什麼新鮮事?"
                maxLength="140"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
          </div>
          { description.length === 140 && <div className={styles.alertMessage}>字數不可超過140字!</div>}
          <div className={styles.tweetButton}>
            <SecondaryButton  onClick={handleTweet}>推文</SecondaryButton>
          </div>
        </div>
      </div>
  );
};

export default TweetModal;
