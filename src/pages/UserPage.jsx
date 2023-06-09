import styles from "styles/MainPage.module.scss";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "contexts/UserContext.jsx";

//svg
import arrow from "assets/icons/back-arrow-icon.svg";
import defaultAvatar from "assets/icons/default-avatar.svg";
import defaultBanner from "assets/icons/default-banner.svg";
import messageIcon from "assets/icons/message-Icon.svg";
import notiIcon from "assets/icons/noti-Icon.svg";

//components
import {
  TweetInfoCard,
  LikeTweetInfoCard,
  ReplyInfoCard,
} from "components/TweetInfoCard/TweetInfoCard";
import { MainNav } from "components/Nav/Nav";
import Popular from "components/Popular/Popular";
import { SecondaryButton, NotActiveButton } from "components/Button/Button";
import UserInfoModal from "../components/Modal/UserInfoModal";
//api
import { getTopTenUser } from "api/followship";
import { getUserDataByAccount, getUserData } from "api/setting.js";
import { checkUserPermission } from "api/auth.js";
import { getUserTweets, getUserReply, getUserLike } from "api/PostTweet";
export default function UserPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userAccount } = useParams();
  //isSelf用來比對輸入的帳號跟目前登入的帳號是否相符
  //按鈕render會不一樣
  const [isSelf, setIsSelf] = useState(null);
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [topTenUsers, setTopTenUsers] = useState(null);
  const [tweetList, setTweetList] = useState(null);
  const [replyList, setReplyList] = useState(null);
  const [likeList, setLikeList] = useState(null);
  const [isfollow, setisfollow] = useState(null);
  const [userAvatar, setUserAvatar] = useState("");
  const [needRerender, setNeedRerender] = useState(false);
  const [isPageActive, setIsPageActive] = useState(null);
  const { follow, unfollow } = useContext(UserContext);
  //先call API 確認使用者輸入的帳號是否存在
  useEffect(() => {
    const checkUserTokenIsValid = async () => {
      if (location.pathname.includes("replies")) {
        setIsPageActive("replies");
      } else if (location.pathname.includes("likes")) {
        setIsPageActive("likes");
      } else {
        setIsPageActive("tweets");
      }
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
      const result = await checkUserPermission(token);
      if (!result) {
        navigate("/login");
      } else {
        const id = localStorage.getItem("currentUserId");
        const currentUserAccount = localStorage.getItem("currentUserAccount");
        const [{ users }, { avatar }, data] = await Promise.all([
          getTopTenUser(token),
          getUserData(token, id),
          getUserDataByAccount(token, userAccount)
        ])
        if (users) {
          //call API取得前10名追蹤，放入popular
          setTopTenUsers(users);
          setUserAvatar(avatar);
          //確認網址輸入的帳號是否存在，是使用者自己的帳號或是他人的帳號，渲染不同內容
          if (data && currentUserAccount === data.account) {
            setisfollow(!data.isCurrentUserFollowed);
            setUserData(data);
            setUserId(data.id);
            setIsSelf(true);
          } else if (data && currentUserAccount !== data.account) {
            setisfollow(!data.isCurrentUserFollowed);
            setUserData(data);
            setUserId(data.id);
            setIsSelf(false);
          } else {
            // 使用者不存在，導向錯誤頁面
            navigate("/error");
          }
        }
      }
    };
    checkUserTokenIsValid();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const [tweetData, likeData, replyData, { users }, data] = await Promise.all([
          getUserTweets(token, userData.id),
          getUserLike(token, userData.id),
          getUserReply(token, userData.id),
          getTopTenUser(token),
          getUserDataByAccount(token, userAccount)
        ])
      const filterTweetData = tweetData.data.filter(function (item) {
        return item.Tweet !== null;
      });
      const filterLikeData = likeData.data.filter(function (item) {
        return item.Tweet !== null;
      });
      const filterReplyData = replyData.data.filter(function (item) {
        return item.Tweet !== null;
      });

      setisfollow(!data.isCurrentUserFollowed)
      setTweetList(filterTweetData);
      setLikeList(filterLikeData);
      setReplyList(filterReplyData);
      setTopTenUsers(users);

      setUserData(data);
      setUserId(data.id);

      setNeedRerender(false);
    };
    if (userData) {
      fetchData();
    }
  }, [userId, needRerender]);

  

  //回到上一頁
  const handleBack = () => {
    navigate(-1);
  };

  //追蹤功能
  const handleFollowClick = () => {
    follow(userId);
    setNeedRerender(true)
  };

  const handleUnfollowClick = () => {
    unfollow(userId);
    setNeedRerender(true)
  };

  //開啟MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  //開啟MODAL
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className={`${styles.container} container mx-auto`}>
      <div className={styles.pageContainer}>
        <div className={styles.navContainer}>
          <MainNav setNeedRerender={setNeedRerender} />
        </div>
        <div className={styles.MiddlePartContainer}>
          <div className={styles.headerContainer}>
            {/* header */}
            <div className="cursor-point" onClick={handleBack}>
              <img className={styles.backArrow} src={arrow} alt="back-arrow" />
            </div>
            <div className={styles.userInformation}>
              <h5 className={styles.pathUserName}>{userData.name}</h5>
              <h6 className={styles.pathUserTweetCount}>
                {userData.tweetCount} 推文
              </h6>
            </div>
          </div>
          <div className={styles.personalInfo}>
            <div className={styles.bannerContainer}>
              {/* 有banner顯示自訂圖，不然就顯示預設山景圖 */}
              {userData.banner !== "0" ? (
                <img src={userData.banner} alt="userBanner" />
              ) : (
                <img src={defaultBanner} alt="defaultBanner" />
              )}
            </div>
            <div className={styles.personalInfoAvatar}>
              {/* avatar自訂或預設 */}
              {userData.avatar !== null ? (
                <img
                  className={styles.userAvatart}
                  src={userData.avatar}
                  alt="userAvatar"
                />
              ) : (
                <img
                  className={styles.userAvatartDefault}
                  src={defaultAvatar}
                  alt="defaultAvatar"
                />
              )}
            </div>
            <div className={styles.personalData}>
              <div className={styles.name}>
                <h6>{userData.name}</h6>
              </div>
              <div className={styles.account}>
                <h6>@{userData.account}</h6>
              </div>
              <div className={styles.introduction}>
                <span>{userData.introduction}</span>
              </div>
              <div className={styles.infoTwo}>
                <Link to={`/user/${userAccount}/following`}>
                  <div className="cursor-point">
                    <span className={styles.followingCount}>
                      {userData.FollowingsCount}個
                    </span>
                    <span className={styles.words}>跟隨中</span>
                  </div>
                </Link>
                <Link to={`/user/${userAccount}/follower`}>
                  <div className="cursor-point">
                    <span className={styles.followerCount}>
                      {userData.FollowersCount}個
                    </span>
                    <span className={styles.words}>跟隨者</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className={styles.interactButton}>
              {isSelf ? (
                <div className={styles.editButton}>
                  <NotActiveButton onClick={openModal}>
                    編輯個人資料
                  </NotActiveButton>
                  {isModalOpen && (
                    <UserInfoModal
                      userData={userData}
                      closeModal={closeModal}
                      setNeedRerender={setNeedRerender}
                    />
                  )}
                </div>
              ) : (
                <div className={styles.otherButton}>
                  <img
                    className={`${styles.messageIcon} cursor-point`}
                    src={messageIcon}
                    alt="messageIcon"
                  />
                  <img
                    className={`${styles.notiIcon} cursor-point`}
                    src={notiIcon}
                    alt="notiIcon"
                  />
                  <div className={`${styles.buttonContainer} cursor-point`}>
                    {isfollow ? (
                      <div className={styles.notActiveButtonContainer}>
                        <NotActiveButton onClick={handleFollowClick}>
                          跟隨
                        </NotActiveButton>
                      </div>
                    ) : (
                      <div className={styles.secondaryButtonContainer}>
                        <SecondaryButton onClick={handleUnfollowClick}>
                          正在跟隨
                        </SecondaryButton>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.controlPanel}>
            <Link to={`/user/${userAccount}`}>
              <div
                className={`${styles.tweetPanel} cursor-point ${
                  isPageActive === "tweets" ? styles.isActive : ""
                }`}
              >
                推文
              </div>
            </Link>
            <Link to={`/user/${userAccount}/replies`}>
              <div
                className={`${styles.replyPanel} cursor-point ${
                  isPageActive === "replies" ? styles.isActive : ""
                }`}
              >
                回覆
              </div>
            </Link>
            <Link to={`/user/${userAccount}/likes`}>
              <div
                className={`${styles.likePanel} cursor-point ${
                  isPageActive === "likes" ? styles.isActive : ""
                }`}
              >
                喜歡的內容
              </div>
            </Link>
          </div>
          <div className={styles.userPageTweetContainer}>
            {tweetList &&
              isPageActive === "tweets" &&
              tweetList.map((tweet) => (
                <TweetInfoCard
                  key={tweet.id}
                  tweet={tweet}
                  userAvatar={userAvatar}
                  setNeedRerender={setNeedRerender}
                />
              ))}
            {likeList &&
              isPageActive === "likes" &&
              likeList.map((tweet) => (
                <LikeTweetInfoCard
                  key={tweet.id}
                  tweet={tweet}
                  userAvatar={userAvatar}
                  setNeedRerender={setNeedRerender}
                />
              ))}
            {replyList &&
              isPageActive === "replies" &&
              replyList.map((tweet) => (
                <ReplyInfoCard
                  key={tweet.id}
                  tweet={tweet}
                  userAvatar={userAvatar}
                />
              ))}
          </div>
        </div>
        <div className={styles.popularContainer}>
          {topTenUsers !== null && (
            <Popular
              topTenUsers={topTenUsers}
              setNeedRerender={setNeedRerender}
            />
          )}
        </div>
      </div>
    </div>
  );
}
