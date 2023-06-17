import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

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
      const result = await checkUserPermission(token);
      if (!result) {
        navigate('/login');
      } else {
        const { users } = await getTopTenUser(token)
        const response = await getAllTweets(token)
        const { avatar } = await getUserData(token, id)
          setTweetsList(response.data.reverse())
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
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('currentUserId');
        const { users } = await getTopTenUser(token)
        const response = await getAllTweets(token)
        const { avatar } = await getUserData(token, id)
        setTweetsList(response.data.reverse())
        setUserAvatar(avatar);
        if (users) {
          setTopTenUsers(users)
        }
        setNeedRerender(false)
      } 
    }
    rerenderPage()
  }, [needRerender])


  return(
    <div className="container mx-auto">
      <div className={styles.pageContainer}>
        <div className={styles.navContainer}>
          <MainNav />
        </div>
        <div className={styles.MiddlePartContainer}>
          <div className={styles.headerContainer}>
            <h4 className={styles.headerWithoutAnything}>首頁</h4>
          </div>
          <div className={styles.postPanel}>
            <TweetPanel userAvatar={userAvatar} setNeedRerender={setNeedRerender}/>
          </div>
          <div className={styles.tweetContainer}>
            {tweetsList &&
              tweetsList.map((tweet) => (
                <TweetInfoCard key={tweet.id} tweet={tweet} />
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