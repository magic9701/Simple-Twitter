import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import UserInfoModal from "../components/Modal/UserInfoModal";
import styles from "../styles/UserPage.module.scss";
import { NotActiveButton } from "../components/Button/Button";
import { MainNav } from "../components/Nav/Nav";
import UserTable from "../components/UserTable/UserTable";
import Popular from "../components/Popular/Popular";
import { ReplyInfoCard } from "../components/TweetInfoCard/TweetInfoCard";

const authURL = "https://pure-falls-11392.herokuapp.com/api";

const axiosTwitter = axios.create({
  baseURL: authURL,
});

axiosTwitter.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default function UserPage() {
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tweetsList, setTweetsList] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserData();
        setUserData(user);
      } catch (error) {
        console.error("[Get User Data failed]: ", error);
      }
    };

    if (userData === null) {
      fetchUserData();
    }
  }, [userData]);

  const getUserData = async () => {
    try {
      const userId = localStorage.getItem("currentUserId");
      const response = await axiosTwitter.get(`/users/${userId}`);
      const {
        avatar,
        banner,
        introduction,
        FollowersCount,
        FollowingsCount,
        name,
        account,
      } = response.data;
      return {
        avatar,
        banner,
        introduction,
        userFollower: FollowersCount,
        userFollowing: FollowingsCount,
        name,
        account,
      };
    } catch (error) {
      console.error("[Get User Data failed]: ", error);
    }
  };

  const getTweets = async () => {
    // 在此函式中執行取得推文的邏輯
    try {
      // 執行 API 請求或其他操作以獲取推文
      const response = await axiosTwitter.get("/tweets");
      const tweets = response.data;
      setTweetsList(tweets);
    } catch (error) {
      console.error("[Get Tweets failed]: ", error);
    }
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClick = () => {
    openModal();
  };

  if (!userData) {
    return null;
  }

  const {
    name,
    avatar,
    banner,
    account,
    introduction,
    userFollowing,
    userFollower,
  } = userData;

  return (
    <div className="container mx-auto">
      <div className={styles.mainContainer}>
        <div className={styles.Nav}>
          <MainNav />
        </div>
        <div className={styles.mainMiddle}>
          <div className={styles.Header}>
            <Header name={name} />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.img}>
              <div className={styles.backGroundPhoto}>
                {banner ? (
                  <img
                    src="https://picsum.photos/300/300?text=1"
                    alt="backGroundPhoto"
                  />
                ) : (
                  <img
                    src="https://picsum.photos/300/300?text=1"
                    alt="沒有東西阿阿阿阿阿阿阿阿阿阿阿阿阿阿"
                  />
                )}
              </div>
              <div className={styles.userPhoto}>
                {avatar ? (
                  <img
                    src="https://picsum.photos/300/300?text=2"
                    alt="userPhoto"
                  />
                ) : (
                  <img
                    src="https://picsum.photos/300/300?text=2"
                    alt="Default Avatar"
                  />
                )}
              </div>

              <div className={styles.button}>
                <NotActiveButton onClick={handleClick}>
                  編輯個人資料
                </NotActiveButton>
                <UserInfoModal
                  isOpen={modalOpen}
                  onClose={closeModal}
                  userData={{
                    name,
                    avatar,
                    banner,
                    introduction,
                  }}
                />
              </div>
            </div>
            <div className={styles.userName}>{name}</div>
            <div className={styles.userAccount}>@{account}</div>
            <div className={styles.userIntroduction}>{introduction}</div>
            <div className={styles.follow}>
              <div className={styles.userFollowing}>
                {`${userFollowing ? userFollowing.toString() : "0"}個跟隨中`}
              </div>
              <div className={styles.userFollower}>
                {`${userFollower ? userFollower.toString() : "0"}位跟隨者`}
              </div>
            </div>
          </div>
          <UserTable />
          <div className={styles.tweetInfoCard}>
            <ReplyInfoCard getTweets={getTweets} currentUser={userData} />
          </div>
        </div>
        <div className="Popular">
          <Popular />
        </div>
      </div>
    </div>
  );
}
