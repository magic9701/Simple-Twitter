import styles from "../../styles/UserModal.module.scss";
import React, { useRef, useState } from "react";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";
import { SecondaryButton } from "../Button/Button";
import UserInput from "components/InputBlock/userInput";
import { changeUserProfile } from "api/user";
import { ReactComponent as CameraIcon } from "assets/icons/camera-icon.svg";
import { ReactComponent as CrossWhiteIcon } from "assets/icons/cross-white.svg";
import Swal from "sweetalert2";
import greenIcon from "assets/icons/green-Icon.svg";
import redIcon from "assets/icons/red-icon.svg";
import defaultAvatar from "assets/icons/default-avatar.svg";
import defaultBanner from "assets/icons/default-banner.svg";
const UserInfoModal = ({
  userData,
  closeModal,
  setNeedRerender,
}) => {
  const initialName = userData.name
  const initialBanner = userData.banner
  const initialAvatar = userData.avatar
  const initialIntroduction = userData.introduction === null ? "" : userData.introduction

  const [isError, setIsError] = useState(false);
  const [name, setNewName] = useState(initialName);
  const [introduction, setNewIntroduction] = useState(initialIntroduction);
  const [banner, setBanner] = useState(initialBanner);
  const [newBanner, setNewBanner] = useState("");
  const [avatar, setAvatar] = useState(initialAvatar);
  const [newAvatar, setNewAvatar] = useState("");
  const avatarFileInputRef = useRef(null);
  const bannerFileInputRef = useRef(null);

  const handleBannerChange = () => {
    console.log("Banner file input clicked");
    try {
      bannerFileInputRef.current?.click();
    } catch (error) {
      console.error("Error opening banner file input:", error);
    }
  };
  const handleBannerUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        console.log("Invalid file type. Please select an image.");
        return;
      }
      console.log("Selected file:", file);
      setNewBanner(file);
      const bannerURL = URL.createObjectURL(file);
      setBanner(bannerURL);
    }
  };

  const handleAvatarChange = () => {
    avatarFileInputRef.current?.click();
  };
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        console.log("Invalid file type. Please select an image.");
        return;
      }
      console.log("Selected file:", file);
      setNewAvatar(file);
      const avatarURL = URL.createObjectURL(file);
      setAvatar(avatarURL);
    }
  };
  const handleNotiFailClick = () => {
    console.log("點擊");
    closeModal();
  };
  const handleSave = async () => {
    //前端檢查輸入內容，確定沒有指輸入空格或未輸入內容，isError代表輸入框內容有異常
    if (name.trim().length === 0) {
      //有異常跳提示框
      Swal.fire({
        position: "top",
        title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">名稱不可為空白</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="fail" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
        timer: 3000,
        showConfirmButton: false,
        customClass: {
          popup: styles["my-custom-popup"],
        },
      });
      return;
    } else if (isError === true) {
      Swal.fire({
        position: "top",
        title: `
            <div class="${styles["my-custom-title"]}">
              <div class="${styles["my-custom-title-text"]}">字數超過上限</div>
              <div class="${styles["my-custom-title-icon"]}">
                <img src="${redIcon}" alt="fail" class="${styles["my-custom-image"]}" />
              </div>
            </div>
          `,
        timer: 3000,
        showConfirmButton: false,
        customClass: {
          popup: styles["my-custom-popup"],
        },
      });
      return;
    }
    try {
      const updatedProfile = {
        name: name,
        introduction: introduction,
        banner: newBanner || banner,
        avatar: newAvatar || avatar,
      };
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("currentUserId");
      const result = await changeUserProfile(token, id, updatedProfile);
      if (result.success) {
        closeModal();
        //跳修改成功提示框

        Swal.fire({
          position: "top",
          title: `
              <div class="${styles["my-custom-title"]}">
                <div class="${styles["my-custom-title-text"]}">修改成功！</div>
                <div class="${styles["my-custom-title-icon"]}">
                  <img src="${greenIcon}" alt="success" class="${styles["my-custom-image"]}" />
                </div>
              </div>
            `,
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: styles["my-custom-popup"],
          },
        });
        setNeedRerender(true);
      }
    } catch (error) {
      console.error("個人資料更新失敗:", error);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.notiFailIcon}>
              <NotiFailIcon
                className="cursor-point"
                onClick={handleNotiFailClick}
              />
            </div>
            <div className={styles.userChangeTitle}>
              <p>編輯個人資料</p>
            </div>
            <div className={styles.saveButton}>
              <SecondaryButton onClick={handleSave}>儲存</SecondaryButton>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <div className={styles.banner}>
              <input
                ref={bannerFileInputRef}
                type="file"
                id="bannerImg"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleBannerUpload}
              />
              {userData.banner !== "0" ? (
                <img
                  src={newBanner ? URL.createObjectURL(newBanner) : banner}
                  alt="Banner"
                  key={newBanner ? "newBanner" : "banner"}
                />
              ) : (
                <img
                  src={
                    newBanner ? URL.createObjectURL(newBanner) : defaultBanner
                  }
                  alt="Banner"
                  key={newBanner ? "newBanner" : "defaultBanner"}
                />
              )}

              <div className={styles.changeBanner}>
                <CameraIcon
                  as="label"
                  htmlFor="bannerImg"
                  className={styles.bannerIcon}
                  onClick={handleBannerChange}
                />
              </div>
              <div className={styles.noBanner}>
                <CrossWhiteIcon className={styles.bannerNotiFailIcon} />
              </div>
            </div>
            <div className={styles.avatar}>
              <input
                ref={avatarFileInputRef}
                type="file"
                id="userImg"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarUpload}
              />
              {userData.avatar !== null ? (
                <img
                  src={newAvatar ? URL.createObjectURL(newAvatar) : avatar}
                  alt="Avatar"
                  key={newAvatar ? "newAvatar" : "avatar"} // 添加 key 属性
                />
              ) : (
                <img
                  src={
                    newAvatar ? URL.createObjectURL(newAvatar) : defaultAvatar
                  }
                  alt="defultAvatar"
                  key={newAvatar ? "newAvatar" : "defaultAvatar"}
                />
              )}
              <div className={styles.changeAvatar}>
                <CameraIcon
                  as="label"
                  htmlFor="userImg"
                  className={styles.avatarIcon}
                  onClick={handleAvatarChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.userContainer}>
            <div className={styles.userName}>
              <UserInput
                label="名稱"
                placeholder="請輸入名稱"
                value={name}
                maxLength={50}
                setIsError={setIsError}
                needErrorMessage={true}
                textareaHeight={29}
                onChange={(nameInputValue) => setNewName(nameInputValue)}
              />
            </div>

            <div className={styles.userIntroduction}>
              <UserInput
                label="自我介紹"
                placeholder="請輸入自我介紹"
                value={introduction}
                onChange={(introductionInputValue) =>
                  setNewIntroduction(introductionInputValue)
                }
                maxLength={160}
                setIsError={setIsError}
                needErrorMessage={true}
                textareaHeight={115}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoModal;
