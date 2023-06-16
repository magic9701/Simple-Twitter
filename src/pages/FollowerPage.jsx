import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//scss
import styles from "styles/MainPage.module.scss"

//components
import { FollowBlock, FollowingBlock } from 'components/TweetInfoCard/TweetInfoCard';
import { MainNav } from 'components/Nav/Nav';
import Popular from 'components/Popular/Popular';

//API
import { getTopTenUser, userFollower, userFollowing } from 'api/followship';
import { checkUserPermission } from "api/auth.js"
import { getUserDataByAccount } from "api/setting.js"

//svg
import arrow from "assets/icons/back-arrow-icon.svg"

export default function FollowerPage() {
    const navigate = useNavigate()
    const [ topTenUsers, setTopTenUsers ] = useState(null)
    const { userAccount } = useParams();
    const [ pathUserName, setPathUserName] = useState(null)
    const [ pathUserTweetCount, setPathUserTweetCount] = useState(null)
    const [ renderList, setRenderList ] = useState(null)
    const [ renderFollowingList, setRenderFollowingList ] = useState(null)
    const [ isFollowerActive, setIsFollowerActive ] = useState(true);
    


  //檢查有有效token
  useEffect (() => {
    //驗證使用者有有效token，若沒有，轉跳回login
    const getPopular = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
      }
      const result = await checkUserPermission(token)
      if (!result) {
        navigate('/login')
      }
      const { users } = await getTopTenUser(token)
      if (users) {
        //call API取得前10名追蹤，放入popular
        setTopTenUsers(users)
      }
    }
    getPopular()
  }, [navigate, renderList])

  //取得目前頁面所要render的使用者帳號，位置(for panel)
  //account去打API取得ID
  useEffect(() => {
  const getPathUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const { id, tweetCount, name } = await getUserDataByAccount(token, userAccount);
      if (id) {
        setPathUserName(name);
        setPathUserTweetCount(tweetCount);
        const { followerList } = await userFollower(token, id);
        const { followingList } = await userFollowing(token, id);
        setRenderList(followerList);
        setRenderFollowingList(followingList);
      } else {
        // 使用者不存在，導向錯誤頁面
        navigate('/error');
      }
    } catch (error) {
      // 發生異常錯誤，導向錯誤頁面
      navigate('/error');
    }
  };

  getPathUserData();
}, [navigate]);

  //名字跟推文數放header
  //call API 取得特定使用者的追隨者
  //資料丟給FollowBlock，render頁面

  //選項變色功能
  const handelClickfllower = () => {
    setIsFollowerActive(true);
  };
  const handelClickfollowing = () => {
    setIsFollowerActive(false);
  };

  //回到上一頁
  const handleBack = () => {
    navigate(-1)
  }
  
  return(
    <div className="container mx-auto">
      <div className={styles.pageContainer}>
        <div className={styles.navContainer}>
          <MainNav />
        </div>
        <div className={styles.MiddlePartContainer}>
          <div className={styles.headerContainer}>
            {/* header */}
            <div className='cursor-point' onClick={handleBack}>
              <img className={styles.backArrow} src={arrow} alt="back-arrow" />
            </div>
            <div className={styles.userInformation}>
              <h5 className={styles.pathUserName}>{pathUserName}</h5>
              <h6 className={styles.pathUserTweetCount}>{pathUserTweetCount} 推文</h6>
            </div>
          </div>
          <div className={styles.controlPanel}>
            {/* control panel */}
            <div className={`${styles.follower} cursor-point ${
              isFollowerActive ? styles.isActive : ""
            }`} onClick={handelClickfllower}>
              追隨者
            </div>
            <div className={`${styles.following} cursor-point ${
              isFollowerActive ? "" : styles.isActive
            }`} onClick={handelClickfollowing}>
              正在追隨
            </div>
          </div>
          <div className={styles.tweetContainer}>
            {isFollowerActive && renderList && renderList.map((data) => (
              <FollowBlock key={data.followerId} data={data} />
            ))}
            {isFollowerActive === false && renderFollowingList && renderFollowingList.map((data) => (
              <FollowingBlock key={data.followerId} data={data} />
            ))}
          </div>
        </div>
        <div className={styles.popularContainer}>
          {topTenUsers !== null && <Popular topTenUsers={topTenUsers} />}
        </div>
      </div>
    </div>
  )
}