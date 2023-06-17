import styles from "styles/MainPage.module.scss"
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

//svg
import arrow from "assets/icons/back-arrow-icon.svg"
import ReplyIcon from "assets/icons/reply-icon.svg";
import LikeIcon from "assets/icons/like-icon.svg";
import defaultAvatar from "assets/icons/default-avatar.svg"

//components
import { MainNav } from "components/Nav/Nav";

export default function PoatPage() {
  const { userAccount } = useParams()
  const { postId } = useParams();
  const navigate = useNavigate()
  const location = useLocation()



  //回到上一頁
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="container mx-auto">
      <div className={styles.pageContainer}>
        <div className={styles.navContainer}>
          <MainNav />
        </div>
        <div className={styles.MiddlePartContainer}>
          <div className={styles.headerContainer}>
            <div className='cursor-point' onClick={handleBack}>
              <img className={styles.backArrow} src={arrow} alt="back-arrow" />
            </div>
            <div className={styles.userInformation}>
              <h4>推文</h4>
            </div>
          </div>
          <div className={styles.tweetInfoContainer}>
            {/* 頭像 */}
            <div className={styles.userInfo}>
              <div className={styles.avatarContainer}>
                {/* <Link to={`/user/${account}`}><img className="cursor-point"
                  src={avatar ? avatar : defaultAvatar}
                  alt="avatar"
                /></Link> */}
                <img src={defaultAvatar}></img>
              </div>
              <div className={styles.accountContainer}>
                {/* 使用者名字、帳號 */}
                  <h6 className={styles.name}>name</h6>
                  <h6 className={styles.userId}>@account</h6>
              </div>
            </div>
              {/* 內容 */}
            <div className={styles.tweetContent}>
              description
            </div>
            <div className={styles.timeContainer}>
              上午 10:05・2021年11月10日
            </div>
            {/* 回覆及喜歡次數 */}
            <div className={styles.replyAndLike}>
              <div>
                <span className={styles.replyCount}>replyCount</span>
                <span className={styles.words}>回覆</span>
              </div>
              <div>
                <span className={styles.likeCount}>likeCount</span>
                <span className={styles.words}>喜歡次數</span>
              </div>
            </div>
            {/* Icon */}
            <div className={styles.iconContainer}>
              <img src={ReplyIcon} alt="ReplyIcon" />
              <img className={styles.like}src={LikeIcon} alt="LikeIcon" />
            </div>
          </div>

          {/* 回覆內容 */}
          <div className={styles.tweetContainer}>

          </div>
        </div>
        <div className={styles.popularContainer}>
          {/* {topTenUsers !== null && <Popular topTenUsers={topTenUsers} />} */}
        </div>
      </div>
    </div>
  );
}