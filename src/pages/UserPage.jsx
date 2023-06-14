import styles from "styles/UserPage.module.scss";
import { useParams } from "react-router-dom";
import { MainNav } from "components/Nav/Nav";
import Popular from "components/Popular/Popular";
import { NotActiveButton } from "../components/Button/Button";
import UserTable from "components/UserTable/UserTable";
import {
  TweetInfoCard,
  ReplyInfoCard,
} from "components/TweetInfoCard/TweetInfoCard";

export default function UserPage() {
  const { userAccount } = useParams();
  //先call API 確認使用者輸入的帳號是否存在
  //帳號存在比對輸入的內容跟目前登入的帳號是否相符
  //如果符合 顯示A 內容
  //如果不符 顯示B 內容

  return (
    <div className="container mx-auto">
      <div className={styles.mainContainer}>
        <div className={styles.Nav}>
          <MainNav />
        </div>
        <div className={styles.mainMiddle}>
          <div className={styles.Header}>
            <p>首頁</p>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.img}>
              <img
                className={styles.backGroundPhoto}
                src="https://picsum.photos/300/300?text=1"
                alt="backGroundPhoto"
              />
              <img
                className={styles.userPhoto}
                src="https://picsum.photos/300/300?text=2"
                alt="userPhoto"
              />
              <NotActiveButton className={styles.NotActiveButton}>
                編輯個人資料
              </NotActiveButton>
            </div>
            <div className={styles.userName}>apple</div>
            <div className={styles.userAccount}>@apple</div>
            <div className={styles.userIntroduction}>i am apple</div>
            <div className={styles.follow}>
              <div className={styles.userFollowing}>34個跟隨中</div>
              <div className={styles.userFollower}>50位跟隨者</div>
            </div>
          </div>
          <UserTable />
          <ReplyInfoCard />
          <TweetInfoCard />
        </div>
        <div className={styles.Popular}>
          <Popular />
        </div>
      </div>
    </div>
  );
}
