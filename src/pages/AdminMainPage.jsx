import styles from "styles/AdminMainPage.module.scss"
import { AdminNav } from "components/Nav/Nav.jsx"
import { useNavigate } from 'react-router-dom';
import { checkAdminPermission } from 'api/auth';
import { useEffect, useState } from "react";
import { adminGetTweet } from "api/admin.js";
import AdminTweetCard from "components/AdminTweetCard/AdminTweetCard.jsx"

export default function AdminMainPage() {
  const navigate = useNavigate();
  const [listOfTweets, setListOfTweets] = useState(null)

  useEffect(() => {
    //確認管理者登入、token合法
    const checkTokenIsValid = async () => {
      const adminToken = localStorage.getItem("adminToken");
      if (!adminToken) {
        navigate("/admin");
      }
      const result = await checkAdminPermission(adminToken);
      if (!result) {
        navigate("/admin");
      }
      if (result) {
        // 取得用戶資料清單
        const {tweetList} = await adminGetTweet(adminToken)
        if (tweetList) {
          setListOfTweets(tweetList);    
        } else {
          console.log("No tweets data available");
        }
      }
    };
    checkTokenIsValid();
  }, [navigate] );


  return(
    <div className={`${styles.adminPageContainer} container mx-auto`}>
      <div className={styles.navContainer}>
        <AdminNav />
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.headerContainer}>
          <h4>推文清單</h4>
        </div>
        <div className={styles.CardContainer}>
          {listOfTweets &&
            listOfTweets.map((tweetInfo) => (
              <AdminTweetCard key={tweetInfo.id} tweetInfo={tweetInfo} />
            ))}
        </div>
      </div>
    </div>
  )
}