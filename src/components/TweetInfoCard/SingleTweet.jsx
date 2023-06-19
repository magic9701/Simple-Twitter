import { Link } from "react-router-dom";
import { useState } from "react";

//scss
import styles from "styles/SingleTweet.module.scss"

//svg
import { ReactComponent as ReplyIcon } from "assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/like-icon.svg";

//component
import { ReplyModal } from "components/Modal/ReplyModal.jsx"
import defaultAvatar from "assets/icons/default-avatar.svg"

export default function SingleTweet ({tweetInfo, userAccount, userAvatar}) {
  const { account, avatar, name } = tweetInfo.User
  const { description, createdAt, likeCount, replyCount } = tweetInfo
  const [ needRerender, setNeedRerender] = useState(false)

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
        <LikeIcon className={styles.like} />
      </div>
    </div>
  )
}