import { Link } from "react-router-dom";
import { UserContext } from "contexts/UserContext.jsx"
import { useContext, useState } from 'react';

//scss
import styles from "styles/SingleTweet.module.scss"

//svg
import { ReactComponent as ReplyIcon } from "assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/like-icon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/like-active.svg";

//component
import { ReplyModal } from "components/Modal/ReplyModal.jsx"
import defaultAvatar from "assets/icons/default-avatar.svg"

export default function SingleTweet ({tweetInfo, userAccount, userAvatar}) {
  const { account, avatar, name } = tweetInfo.User
  const { description, createdAt, likeCount, replyCount, id } = tweetInfo
  const [ needRerender, setNeedRerender] = useState(false)
  const { likeATweet, unlikeATweet } = useContext(UserContext)
  const [ isLike, setIsLike ] = useState(tweetInfo.isLiked)

  //時間轉換
  const date = new Date(createdAt)
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const hour = date.getUTCHours()
  const minute = date.getUTCMinutes()

  // 判断小时数，确定上午或下午
  const period = (hour < 12) ? '上午' : '下午'

  // 格式化日期时间为指定格式
  const formattedDateTime = period + ' ' +
                          padZero(hour % 12 || 12) + ':' +
                          padZero(minute) + '・' +
                          year + '年' +
                          padZero(month) + '月' +
                          padZero(day) + '日';
  function padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }

  //回文modal功能
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = (event) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }
  };
  const handleReply = () => {
    openModal();
  };

  //like/unlike貼文
  const handleLikeClick = (id) => {
    likeATweet(id)
    setIsLike(true)
  };

  const handleUnLikeClick = (id) => {
    unlikeATweet(id)
    setIsLike(false)
  };


  return(
    <div className={styles.tweetInfoContainer}>
      {/* 頭像 */}
      <div className={styles.userInfo}>
        <div className={styles.avatarContainer}>
          <Link to={`/user/${account}`}><img className="cursor-point"
            src={avatar ? avatar : defaultAvatar}
            alt="avatar"
          /></Link>
        </div>
        <div className={styles.accountContainer}>
          {/* 使用者名字、帳號 */}
            <h6 className={styles.name}>{name}</h6>
            <h6 className={styles.userId}>@{account}</h6>
        </div>
      </div>
        {/* 內容 */}
      <div className={styles.tweetContent}>
        {description}
      </div>
      <div className={styles.timeContainer}>
        {formattedDateTime}
      </div>
      {/* 回覆及喜歡次數 */}
      <div className={styles.replyAndLike}>
        <div>
          <span className={styles.replyCount}>{replyCount}</span>
          <span className={styles.words}>回覆</span>
        </div>
        <div>
          <span className={styles.likeCount}>{likeCount}</span>
          <span className={styles.words}>喜歡次數</span>
        </div>
      </div>
      {/* Icon */}
      <div className={styles.iconContainer}>
        <ReplyIcon className={`${styles.replyIcon} cursor-point`} onClick={handleReply}/>
        <ReplyModal isOpen={modalOpen} onClose={closeModal} setModalOpen={setModalOpen} userAvatar={userAvatar} userAccount={userAccount} tweet={tweetInfo} setNeedRerender={setNeedRerender}/>
        { isLike ? <LikeActiveIcon className={styles.likeBig} onClick={handleUnLikeClick}/> : <LikeIcon className={styles.like} onClick={handleLikeClick}/>}
      </div>
    </div>
  )
}