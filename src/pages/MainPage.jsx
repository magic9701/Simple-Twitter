import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

//scss
import styles from "styles/MainPage.module.scss"

//components
import { TweetInfoCard } from 'components/TweetInfoCard/TweetInfoCard';
import TweetPanel from 'components/TweetPanel/TweetPanel';
import { MainNav } from 'components/Nav/Nav';
import Popular from 'components/Popular/Popular';

//api
import { getTopTenUser } from 'api/followship';
import { getUserData } from "api/setting.js"
import { checkUserPermission } from "api/auth.js"
import { getAllTweets } from "api/PostTweet"

//主頁
export default function MainPage() {
  const navigate = useNavigate()
  const [ tweetsList, setTweetsList ] = useState(null)
  const [ topTenUsers, setTopTenUsers ] = useState(null)
  const [ userAvatar, setUserAvatar ] = useState('')
  const [ needRerender, setNeedRerender] = useState(false);

  useEffect(() => {
    const checkUserTokenIsValid = async () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('currentUserId');
      if (!token) {
        navigate('/login');
      }
      const result = await checkUserPermission();
      if (!result) {
        navigate('/login');
      } else {
        const [{ users }, response, { avatar }] = await Promise.all([
          getTopTenUser(),
          getAllTweets(),
          getUserData(id)
        ])
          setTweetsList(response.data)
          setUserAvatar(avatar);
        if (users) {
        //call API取得前10名追蹤，放入popular
        setTopTenUsers(users)
        }
      }
    }
    checkUserTokenIsValid();
  }, [navigate]);

  useEffect(() => {
    const rerenderPage = async () => {
      if(needRerender) {
        const [{ users }, response ] = await Promise.all([
          getTopTenUser(),
          getAllTweets(),
        ])
        setTweetsList(response.data)
        if (users) {
          setTopTenUsers(users)
        }
        setNeedRerender(false)
      } 
    }
    rerenderPage()
  }, [needRerender])


  return(
    <div className={`${styles.container} container mx-auto`}>
      <div className={styles.pageContainer}>
        <div className={styles.navContainer}>
          <MainNav setNeedRerender={setNeedRerender}/>
        </div>
        <div className={styles.MiddlePartContainer}>
          <div className={styles.headerContainer}>
            <h4 className={styles.headerWithoutAnything}>首頁</h4>
          </div>
          <div className={styles.postPanel}>
            <TweetPanel userAvatar={userAvatar} setNeedRerender={setNeedRerender}/>
          </div>
          <div className={styles.MainPageTweetContainer}>
            {tweetsList &&
              tweetsList.map((tweet) => (
                <TweetInfoCard key={tweet.id} tweet={tweet} userAvatar={userAvatar} setNeedRerender={setNeedRerender}/>
              ))}
          </div>
        </div>
        <div className={styles.popularContainer}>
          {topTenUsers !== null && <Popular topTenUsers={topTenUsers} setNeedRerender={setNeedRerender}/>}
        </div>
      </div>
    </div>
  )
}