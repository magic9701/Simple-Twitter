import { useEffect, useState } from 'react';
import { checkUserPermission } from "api/auth.js"
import { useNavigate } from "react-router-dom";
import { MainNav } from 'components/Nav/Nav';
import Popular from 'components/Popular/Popular';
import styles from "styles/MainPage.module.scss"
import { FollowBlock } from 'components/TweetInfoCard/TweetInfoCard';
import { useParams, useLocation } from 'react-router-dom';
import { getTopTenUser } from 'api/followship';


export default function FollowerPage() {
    const navigate = useNavigate()
    const [ topTenUsers, setTopTenUsers ] = useState(null)


  //檢查有有效token
  useEffect (() => {
    //驗證使用者有有效token，若沒有，轉跳回login
    const getPopular = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
      }
      const result = await checkUserPermission(token)
      if (result) {

      }
      const { users } = await getTopTenUser(token)
      if (users) {
        //call API取得前10名追蹤，放入popular
        setTopTenUsers(users)
      }
    };
    getPopular()
  }, [navigate])

  //取得目前頁面所要render的使用者帳號，位置(for panel)
  const { userAccount } = useParams();
  const location = useLocation();
  //account去打API取得ID
  //如果拿使用者資料，使用者不存在=> 跳error page
  //名字跟推文數放header
  //call API 取得特定使用者的追隨者
  //資料丟給FollowBlock，render頁面
  
  return(
    <div className="container mx-auto">
      <div className={styles.pageContainer}>
        <div className={styles.navContainer}>
          <MainNav />
        </div>
        <div className={styles.MiddlePartContainer}>
          <div className={styles.headerContainer}>
            {/* header */}
            {userAccount}
          </div>
          <div className={styles.controlPanel}>
            {/* control panel */}
          </div>
          <div className={styles.tweetContainer}>
            <FollowBlock></FollowBlock>
          </div>
        </div>
        <div className={styles.popularContainer}>
          {topTenUsers !== null && <Popular topTenUsers={topTenUsers} />}
        </div>
      </div>
    </div>
  )
}