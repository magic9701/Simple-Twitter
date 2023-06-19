
import styles from "../../styles/UserModal.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as NotiFailIcon } from "../../assets/icons/noti-fail.svg";
import { SecondaryButton } from "../Button/Button";
import UserInput from "components/InputBlock/userInput";
import 
import { changeUserProfile } from "api/user";
const UserInfoModal = ({
  userData,
  setName,
  setIntroduction,
  setBanner,
  setAvatar,
  token,
  id,
}) => {
  const {
    name: initialName,
    introduction: initialIntroduction,
    banner: initialBanner,
    avatar: initialAvatar,
  } = userData;

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isError, setIsError] = useState(false);
  const [name, setNewName] = useState(initialName);
  const [introduction, setNewIntroduction] = useState(initialIntroduction);
  const [banner, setNewBanner] = useState(initialBanner);
  const [avatar, setNewAvatar] = useState(initialAvatar);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleBannerChange = (event) => {
    const newBanner = event.target.value;
    setNewBanner(newBanner);
  };

  const handleAvatarChange = (event) => {
    const newAvatar = event.target.value;
    setNewAvatar(newAvatar);
  };
  const handleNotiFailClick = () => {
    setIsModalOpen(false);
  };
  const handleSave = async () => {
    try {
      const result = await changeUserProfile(token, id, {
        name: name,
        introduction: introduction,
        banner: banner,
        avatar: avatar,
      });
      if (result.success) {
        // 更新資料成功，你可以在這裡進行相應的處理
        console.log("個人資料更新成功");
        handleNotiFailClick();
        window.location.reload();
      } else {
        // 更新資料失敗，你可以在這裡進行相應的處理
        console.log("個人資料更新失敗:", result.message);
      }
    } catch (error) {
      console.error("個人資料更新失敗:", error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <>
          <div className={styles.modalOverlay} />
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div className={styles.notiFailIcon}>
                  <NotiFailIcon onClick={handleNotiFailClick} />
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
                  <img src={banner} alt="" />
                </div>
                <div className={styles.avatar}>
                  <img src={avatar} alt="" />
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
      )}
    </>
  );
};

export default UserInfoModal;
