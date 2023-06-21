import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

//scss
import styles from "styles/TweetModal.module.scss";

//components
import { SecondaryButton } from "components/Button/Button.jsx";
import notiFailIcon from "assets/icons/noti-fail.svg";

//svg
import greenIcon from "assets/icons/green-Icon.svg"
import redIcon from "assets/icons/red-icon.svg"
import defaultAvatar from "assets/icons/default-avatar.svg"

//api
import { postReply } from "api/PostTweet";


export const ReplyModal = ({ isOpen, onClose, setModalOpen, userAvatar ,userAccount, tweet, setNeedRerender }) => {
  const [ comment, setComment] = useState('');
  const [ inputNone , setInputNone ] = useState(false)
  //要回覆的推文的資訊
  const { createdAt, description } = tweet
  const { account, avatar, name} = tweet.User
  const tweetId = tweet.id


  //距今多久的發文，時間轉換
  const createdAtTime = new Date(createdAt);
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - createdAtTime.getTime();
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const secondsDiff = Math.floor(timeDiff / 1000);
  let timeAgo = ""

  if (secondsDiff < 60) {
    timeAgo = `${secondsDiff} 秒前`;
  } else if (secondsDiff < 3600) {
    const minutesDiff = Math.floor(secondsDiff / 60);
    timeAgo = `${minutesDiff} 分鐘前`;
  } else if (hoursDiff >= 24) {
    timeAgo = `${Math.floor(hoursDiff / 24)} 天前`;
  } else {
    timeAgo = `${hoursDiff} 小時前`;
  }

  const handleModalClick = (event) => {
    event.stopPropagation();
  };


  const handleCommentChange = event => {
    event.stopPropagation()
    setComment(event.target.value);
  }

  useEffect(() => {
    if( comment.length > 0 ){
      setInputNone(false)
    }
  }, [comment])

  //處理送出推文內容
  const handleReply = async (event) => {
    event.stopPropagation()
    const token = localStorage.getItem('token');
    //前端檢查輸入內容
    if(comment.trim().length === 0) {
      //有異常跳提示框
      setInputNone(true)
      return;
    }
    
    const success = await postReply(token, comment, tweetId)
    if (success) {
      //顯示推文成功
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">回覆成功!</div>
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
      setInputNone(false)
      setNeedRerender(true)
      setComment("")
    }if (!success) {
      //顯示推文失敗
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">回覆失敗!</div>
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
        <div className={`${styles.modal} ${styles.replyModal}`} onClick={handleModalClick}>
          <div className={styles.modalHeader}>
            <div className={`${styles.IconContainer} cursor-point`} onClick={onClose}>
              <img className={styles.NotiFailIcon} onClick={onClose} src={notiFailIcon} alt="close"/>
            </div>
          </div>
          {/* 要回覆的貼文 */}
          <div className={styles.tweetCardContainer}>
            {/* 頭像 */}
            <div className={styles.avatarContainer}>
              <Link to={`/user/${account}`}><img className="cursor-point"
                src={avatar ? avatar : defaultAvatar}
                alt="avatar"
              /></Link>
            </div>
            <div className={styles.information}>
              {/* 使用者名字、帳號、時間 */}
              <div className={styles.topInfo}>
                <h6 className={styles.name}>{name}</h6>
                <h6 className={styles.userId}>@{account}・{timeAgo}</h6>
              </div>
              {/* 內容 */}
              <div className={styles.botInfo}>
                {description}
              </div>
              {/* 回覆 */}
              <div className={styles.replyBy}>
                <h6 className={styles.reply}>回覆</h6>
                <h6 className={styles.replyUserId}>@{account}</h6>
              </div>
            </div>
          </div>

          {/* 灰色的線 */}
          <div className={styles.grayLine}></div>
          
          {/* 使用者回覆的地方 */}
          <div className={styles.tweetContainer}>
            <div className={styles.avatarContainer}>
              <Link to={`/user/${userAccount}`}><img className="cursor-point"
                src={userAvatar ? userAvatar : defaultAvatar}
                alt="avatar"
              /></Link>
            </div>
            <div className={styles.textAreaContainer}>
              <textarea
                className={styles.textArea}
                placeholder="推你的回覆"
                maxLength="140"
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
            </div>
          </div>
          { comment.length === 140 && <div className={styles.alertMessage}>字數不可超過140字!</div>}
          { inputNone && <div className={styles.alertMessage}>內容不可空白</div>}
          <div className={styles.tweetButton}>
            <SecondaryButton  onClick={handleReply}>回覆</SecondaryButton>
          </div>
        </div>
      </div>
  );
};


export const SecondReplyModal = ({ isOpen, onClose, setModalOpen, userAvatar ,userAccount, tweet, setNeedRerender }) => {
  const [ comment, setComment] = useState('');
  const [ inputNone , setInputNone ] = useState(false)
  //要回覆的推文的資訊
  const { createdAt, description } = tweet.Tweet
  const { account, avatar, name} = tweet.Tweet.User
  const tweetId = tweet.TweetId

  //距今多久的發文，時間轉換
  const createdAtTime = new Date(createdAt);
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - createdAtTime.getTime();
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  const secondsDiff = Math.floor(timeDiff / 1000);
  let timeAgo = ""

  if (secondsDiff < 60) {
    timeAgo = `${secondsDiff} 秒前`;
  } else if (secondsDiff < 3600) {
    const minutesDiff = Math.floor(secondsDiff / 60);
    timeAgo = `${minutesDiff} 分鐘前`;
  } else if (hoursDiff >= 24) {
    timeAgo = `${Math.floor(hoursDiff / 24)} 天前`;
  } else {
    timeAgo = `${hoursDiff} 小時前`;
  }


  const handleCommentChange = event => {
    setComment(event.target.value);
  }

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  //處理送出推文內容
  const handleReply = async () => {
    const token = localStorage.getItem('token');
    //前端檢查輸入內容
    if(comment.trim().length === 0) {
      //有異常跳提示框
      setInputNone(true)
      return;
    }
    
    const { success } = await postReply(token, comment, tweetId)
    if (success) {
      //顯示推文成功
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">回覆成功!</div>
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
      setInputNone(false)
      setNeedRerender(true)
    }if (!success) {
      //顯示推文失敗
      Swal.fire({
        position: 'top',
        title: `
          <div class="${styles["my-custom-title"]}">
            <div class="${styles["my-custom-title-text"]}">回覆失敗!</div>
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
        <div className={`${styles.modal} ${styles.replyModal}`} onClick={handleModalClick}>
          <div className={styles.modalHeader}>
            <div className={`${styles.IconContainer} cursor-point`} onClick={onClose}>
              <img className={styles.NotiFailIcon} onClick={onClose} src={notiFailIcon} alt="close"/>
            </div>
          </div>
          {/* 要回覆的貼文 */}
          <div className={styles.tweetCardContainer}>
            {/* 頭像 */}
            <div className={styles.avatarContainer}>
              <Link to={`/user/${account}`}><img className="cursor-point"
                src={avatar ? avatar : defaultAvatar}
                alt="avatar"
              /></Link>
            </div>
            <div className={styles.information}>
              {/* 使用者名字、帳號、時間 */}
              <div className={styles.topInfo}>
                <h6 className={styles.name}>{name}</h6>
                <h6 className={styles.userId}>@{account}・{timeAgo}</h6>
              </div>
              {/* 內容 */}
              <div className={styles.botInfo}>
                {description}
              </div>
              {/* 回覆 */}
              <div className={styles.replyBy}>
                <h6 className={styles.reply}>回覆</h6>
                <h6 className={styles.replyUserId}>@{account}</h6>
              </div>
            </div>
          </div>

          {/* 灰色的線 */}
          <div className={styles.grayLine}></div>
          
          {/* 使用者回覆的地方 */}
          <div className={styles.tweetContainer}>
            <div className={styles.avatarContainer}>
              <Link to={`/user/${userAccount}`}><img className="cursor-point"
                src={userAvatar ? userAvatar : defaultAvatar}
                alt="avatar"
              /></Link>
            </div>
            <div className={styles.textAreaContainer}>
              <textarea
                className={styles.textArea}
                placeholder="推你的回覆"
                maxLength="140"
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
            </div>
          </div>
          { comment.length === 140  && <div className={styles.alertMessage}>字數不可超過140字!</div>}
          { inputNone && <div className={styles.alertMessage}>內容不可空白</div>}
          <div className={styles.tweetButton}>
            <SecondaryButton  onClick={handleReply}>回覆</SecondaryButton>
          </div>
        </div>
      </div>
  );
};