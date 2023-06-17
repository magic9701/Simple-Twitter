import { Link } from "react-router-dom";
import { UserContext } from "contexts/UserContext.jsx"
import { useContext, useState } from 'react';

//scss
import styles from "styles/TweetInfoCard.module.scss"

//components
import { SecondaryButton, NotActiveButton } from "components/Button/Button.jsx"

//ICON
import { ReactComponent as ReplyIcon } from "assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/like-icon.svg";
import defaultAvatar from "assets/icons/default-avatar.svg"


//回覆推文的內容框框
export function ReplyInfoCard({tweet}) {
  const { account, avatar, name} = tweet.User
  const { createdAt, description, userId } = tweet.Tweet
  
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

  return (
    <div className={styles.tweetCardContainer}>
      {/* 頭像 */}
      <div className={styles.avatarContainer}>
        <div className={styles.avatarContainer}>
          <Link to={`/user/${account}`}><img className="cursor-point"
            src={avatar ? avatar : defaultAvatar}
            alt="avatar"
          /></Link>
        </div>
      </div>
      <div className={styles.information}>
        {/* 使用者名字、帳號、時間 */}
        <div className={styles.topInfo}>
          <h6 className={styles.name}>{name}</h6>
          <h6 className={styles.userId}>@{account}・{timeAgo}</h6>
        </div>
        {/* 回覆 */}
        <div className={styles.replyBy}>
          <h6 className={styles.reply}>回覆</h6>
          <h6 className={styles.replyUserId}>@{userId}</h6>
        </div>
        {/* 內容 */}
        <div className={styles.botInfo}>
          {description}
        </div>
      </div>
    </div>
  )
}

//mainPage userPage所有貼文
export function TweetInfoCard( {tweet} ) {
  const { createdAt, description, likeCount, replyCount } = tweet
  const { account, avatar, name} = tweet.User
  
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

  return (
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
        <div className={styles.tweetContent}>
          {description}
        </div>
        {/* 回覆及愛心 */}
        <div className={styles.iconContainer}>
          <div className={styles.replyContainer}>
            <ReplyIcon className={styles.replyIcon}/>
            <h6 className={styles.replyCount}>{replyCount}</h6>
          </div>
          <div className={styles.likeContainer}>
            <LikeIcon className={styles.likeIcon}/>
            <h6 className={styles.LikeCount}>{likeCount}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

//User喜歡的貼文
export function LikeTweetInfoCard( {tweet} ) {
  const { likeCount, replyCount } = tweet
  const { account, avatar, name} = tweet.User
  const { createdAt, description } = tweet.Tweet
  
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

  return (
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
        <div className={styles.tweetContent}>
          {description}
        </div>
        {/* 回覆及愛心 */}
        <div className={styles.iconContainer}>
          <div className={styles.replyContainer}>
            <ReplyIcon className={styles.replyIcon}/>
            <h6 className={styles.replyCount}>{replyCount}</h6>
          </div>
          <div className={styles.likeContainer}>
            <LikeIcon className={styles.likeIcon}/>
            <h6 className={styles.LikeCount}>{likeCount}</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FollowBlock({data}) {
  const { id, name, account, avatar, introduction } = data.Follower
  const { isCurrentUserFollowed } = data
  const [ isfollow, setisfollow ] = useState(!isCurrentUserFollowed)
  const { follow, unfollow } = useContext(UserContext)

  const handleFollowClick = () => {
    follow(id)
    setisfollow(false)
  };

  const handleUnfollowClick = () => {
    unfollow(id)
    setisfollow(true)
  };


  return(
    <div className={styles.followCardContainer}>
      <div className={styles.avatarContainer}>
        <Link to={`/user/${account}`}><img className="cursor-point"
          src={avatar ? avatar : defaultAvatar}
          alt="avatar"
        /></Link>
      </div>
      <div className={styles.information}>
        {/* 使用者名字、追蹤按鈕 */}
        <div className={styles.nameAndButton}>
          <div className={`${styles.topInfo} ${styles.topInfoFollowBlock}`}>
            <h6 className={styles.name}>{name}</h6>
          </div>
            <div className={styles.buttonContainer}>
              {isfollow ? (
                <div className={styles.notActiveButtonContainer}>
                  <NotActiveButton onClick={handleFollowClick} id={id}>
                    跟隨
                  </NotActiveButton>
                </div>
              ) : (
                <div className={styles.secondaryButtonContainer}>
                  <SecondaryButton onClick={handleUnfollowClick} id={id}>
                    正在跟隨
                  </SecondaryButton>
                </div>
              )}
            </div>
        </div>
        {/* 自我介紹 */}
        <div className={styles.introduction}>
          {introduction}
        </div>
      </div>
    </div>
  )
}

export function FollowingBlock({data}) {
  const { id, name, account, avatar, introduction } = data.Following
  const { isCurrentUserFollowed } = data
  const [ isfollow, setisfollow ] = useState(!isCurrentUserFollowed)
  const { follow, unfollow } = useContext(UserContext)

  const handleFollowClick = () => {
    follow(id)
    setisfollow(false)
  };

  const handleUnfollowClick = () => {
    unfollow(id)
    setisfollow(true)
  };


  return(
    <div className={styles.followCardContainer}>
      <div className={styles.avatarContainer}>
        <Link to={`/user/${account}`}><img className="cursor-point"
          src={avatar ? avatar : defaultAvatar}
          alt="avatar"
        /></Link>
      </div>
      <div className={styles.information}>
        {/* 使用者名字、追蹤按鈕 */}
        <div className={styles.nameAndButton}>
          <div className={`${styles.topInfo} ${styles.topInfoFollowBlock}`}>
            <h6 className={styles.name}>{name}</h6>
          </div>
            <div className={styles.buttonContainer}>
              {isfollow ? (
                <div className={styles.notActiveButtonContainer}>
                  <NotActiveButton onClick={handleFollowClick} id={id}>
                    跟隨
                  </NotActiveButton>
                </div>
              ) : (
                <div className={styles.secondaryButtonContainer}>
                  <SecondaryButton onClick={handleUnfollowClick} id={id}>
                    正在跟隨
                  </SecondaryButton>
                </div>
              )}
            </div>
        </div>
        {/* 自我介紹 */}
        <div className={styles.introduction}>
          {introduction}
        </div>
      </div>
    </div>
  )
}