import styles from "styles/AdminUserCard.module.scss"
import likeIcon from "assets/icons/like-icon.svg"
import tweetIcon from "assets/icons/tweet-Icon.svg"
import defaultAvatar from "assets/icons/default-avatar.svg";
import defaultBanner from "assets/icons/default-banner.svg";

export default function AdminUserCard({ user }) {
  const { banner, avatar, name, account, tweetCount, likeCount, FollowingsCount, FollowersCount } = user;
  return (
    <div className={styles.userCard}>
      <div className={styles.bannerContainer}>
        {/* 有banner顯示自訂圖，不然就顯示預設山景圖 */}
        {banner !== "0" ? (
          <img src={banner} alt="userBanner" />
        ) : (
          <img src={defaultBanner} alt="defaultBanner" />
        )}
      </div>
      <div className={styles.avatarContainer}>
        {/* avatar自訂或預設 */}
        {avatar !== null ? (
          <img className={styles.userAvatart} src={avatar} alt="userAvatar" />
        ) : (
          <img className={styles.userAvatartDefault}src={defaultAvatar} alt="defaultAvatar" />
        )}
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>
          <h6>{name}</h6>
        </div>
        <div className={styles.account}>
          <h6>@{account}</h6>
        </div>
        <div className={styles.infoOne}>
          <div className={styles.infoTweet}>
            <img src={tweetIcon} alt="tweetIcon" />
            <div className={styles.tweetIconCount}><h6>{tweetCount}</h6></div>  
          </div>
          <div className={styles.infoLike}>
            <img src={likeIcon} alt="likeIcon" />
            <div className={styles.likeIconCount}><h6>{likeCount}個</h6></div>
          </div>
        </div>
        <div className={styles.infoTwo}>
          <div>
            <span className={styles.followingCount}>{FollowingsCount}個</span>
            <span className={styles.words}>跟隨中</span>
          </div>
          <div>
            <span className={styles.followerCount}>{FollowersCount}個</span>
            <span className={styles.words}>跟隨者</span>
          </div>
        </div>
      </div>
    </div>
  )
}