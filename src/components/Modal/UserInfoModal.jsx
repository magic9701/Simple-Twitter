import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "../../styles/UserModal.module.scss";
import buttonstyles from "../../styles/Button.module.scss";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";
import UserInput from "../InputBlock/userInput";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera-icon.svg";

const Modal = ({ isOpen, onClose, userData }) => {
  const [isError, setIsError] = useState(false);
  const [introduction, setIntroduction] = useState("");
  const [avatar, setAvatar] = useState(userData.avatar);
  const [banner, setBanner] = useState(userData.banner);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    // 在元件 mount 時從 localStorage 中獲取當前使用者帳號
    const currentUserAccount = localStorage.getItem("currentUserAccount");

    setCurrentUser(currentUserAccount);
  }, []);
  const [userProfile, setUserProfile] = useState(userData);

  if (!isOpen) {
    return null;
  }

  const handleIntroductionChange = (value) => {
    setIntroduction(value);
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    setBanner(file);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleSave = async () => {
    if (!userData || !userData.id) {
      console.error("無效的資料");
      return;
    }

    const payload = {
      id: userData.id,
      name: userData.name,
      introduction: introduction,
      avatar: avatar,
    };

    // 使用 FormData 來傳送圖片
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("banner", banner);

    try {
      const response = await axios.put(
        `https://pure-falls-11392.herokuapp.com/api/users/${userData.id}`,
        formData, // 將 formData 傳遞給 axios 的 data 參數
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const updatedUserData = {
          ...userData,
          introduction: introduction,
          avatar: response.data.avatar,
          banner: response.data.banner,
        };
        setUserProfile(updatedUserData);
        onClose();
      } else {
        // 處理儲存失敗的情況
      }
    } catch (error) {
      console.error("儲存失敗: ", error);
    }
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
              <button
                className={buttonstyles.secondaryButton}
                onClick={handleSave}
              >
                儲存
              </button>
            </div>
          </div>
          <div className={styles.backGroundImg}>
            <label htmlFor="bannerUpload" className={styles.fileInputLabel}>
              <CameraIcon className={styles.icon} />
              <input
                id="bannerUpload"
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
              />
            </label>
            <img src="https://i.imgur.com/W5M72pN.jpeg" alt="" />
          </div>
          <div className={styles.userImg}>
            <label htmlFor="avatarUpload" className={styles.fileInputLabel}>
              <CameraIcon className={styles.icon} />
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
            <img src="https://i.imgur.com/W5M72pN.jpeg" alt="沒有東西" />
          </div>
          <div className={styles.UserInputLabel}>
            <div className={styles.userName}>
              <UserInput
                label="名稱"
                placeholder={userData.name}
                value={userData.name}
                maxLength={50}
                setIsError={setIsError}
                textareaHeight={50}
              />
            </div>
            <div className={styles.userIntroduction}>
              <UserInput
                label="自我介紹"
                placeholder={userData.introduction}
                value={userData.introduction}
                onChange={handleIntroductionChange}
                maxLength={160}
                setIsError={setIsError}
                textareaHeight={115}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
