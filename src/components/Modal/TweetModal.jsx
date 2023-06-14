import { useState, useEffect } from "react";
import { SecondaryButton } from "components/Button/Button.jsx";
import styles from "styles/TweetModal.module.scss";
import notiFailIcon from "assets/icons/noti-fail.svg";
import { postTweet } from "api/PostTweet";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { getUserData } from "api/setting.js"
import { checkUserPermission } from "api/auth.js"
import defaultAvatar from "assets/icons/default-avatar.svg"

//icon引入
import greenIcon from "assets/icons/green-Icon.svg"
import redIcon from "assets/icons/red-icon.svg"


const TweetModal = ({ isOpen, onClose, setModalOpen }) => {
  const navigate = useNavigate()
  const [description, setDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('')
  const [userAccount, setUserAccount] = useState('')

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  }

useEffect (() => {
  //取得使用者的頭像
  const getAvatar = async () => {
    const token = await localStorage.getItem('token')
    const id = await localStorage.getItem('currentUserId')
    const Account = await localStorage.getItem('currentUserAccount')
    setUserAccount(Account)
    if (!token) {
      navigate('/login')
    }
    const result = await checkUserPermission(token)
    if (result) {
      const { avatar } = await getUserData(token, id)
      if(avatar) {
        setUserAvatar(avatar)
      }
    }
  }
  getAvatar()
}, [navigate])

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
              {/* 待加入連結個人頁面 */}
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
