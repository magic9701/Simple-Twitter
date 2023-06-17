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
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState("");
  const [userProfile, setUserProfile] = useState(userData);
  const [bannerURL, setBannerURL] = useState(null);
  const [avatarURL, setAvatarURL] = useState(null);

  useEffect(() => {
    const currentUserAccount = localStorage.getItem("currentUserAccount");
    setCurrentUser(currentUserAccount);
  }, []);

  useEffect(() => {
    if (banner) {
      const reader = new FileReader();
      reader.onload = () => {
        setBannerURL(reader.result);
      };
      reader.readAsDataURL(banner);
    }
  }, [banner]);

  useEffect(() => {
    if (avatar) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarURL(reader.result);
      };
      reader.readAsDataURL(avatar);
    }
  }, [avatar]);

  const handleIntroductionChange = (value) => {
    setIntroduction(value);
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBanner(file);
    } else {
      console.error("未選擇有效的文件");
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
    } else {
      console.error("未選擇有效的文件");
    }
  };

  const handleSave = async () => {
    if (!userData || !userData.id) {
      console.error("無效的資料");
      return;
    }

    const formData = new FormData();
    formData.append("id", userData.id);
    formData.append("name", userData.name);
    formData.append("introduction", introduction);
    if (avatar) {
      formData.append("avatar", avatar);
    }
    if (banner) {
      formData.append("banner", banner);
    }

    try {
      const response = await axios.put(
        `https://pure-falls-11392.herokuapp.com/api/users/${userData.id}`,
        formData,
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

  if (!isOpen) {
    return null;
  }

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
              {bannerURL || userProfile.banner ? (
                <img
                  className={styles.backGroundImg}
                  src={bannerURL || userProfile.banner}
                  alt="背景圖片"
                />
              ) : (
                <div className={styles.defaultBanner}>
                  <img src="https://i.imgur.com/W5M72pN.jpeg" alt="預設圖片" />
                </div>
              )}
            </label>
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
              <img
                className={styles.userImg}
                src={
                  avatarURL ||
                  userProfile.avatar ||
                  "https://i.imgur.com/W5M72pN.jpeg"
                }
                alt="頭像"
              />
            </label>
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
