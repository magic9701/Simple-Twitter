import styles from "styles/MainPage.module.scss"
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

//svg
import arrow from "assets/icons/back-arrow-icon.svg"

//components
import { MainNav } from "components/Nav/Nav";
import Popular from 'components/Popular/Popular';
import SingleTweet from "components/TweetInfoCard/SingleTweet";
import { ReplyInfoCard } from 'components/TweetInfoCard/TweetInfoCard';

//api
import { getTopTenUser } from 'api/followship';
import { getSingleTweet, getSingleReplyTweet } from 'api/PostTweet.js'
import { checkUserPermission } from "api/auth.js"
import { getUserData } from "api/setting.js"


export default function PostPage() {
  const { userAccount } = useParams()
  const { postId } = useParams();
  const navigate = useNavigate()

  const [ topTenUsers, setTopTenUsers ] = useState(null)
  const [ userAvatar, setUserAvatar ] = useState('')
  const [ tweetInfo, setTweetInfo ] = useState(null)
  const [ replyInfo, setReplyInfo ] = useState(null)
  const [ needRerender, setNeedRerender ] = useState(false);


  useEffect(() => {
    const checkUserTokenIsValid = async () => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('currentUserId')
      if (!token) {
        navigate('/login')
      }
      const result = await checkUserPermission(token);
      if (!result) {
        navigate('/login')
      } else {
        const response = await getSingleTweet(token, postId)
        const { avatar } = await getUserData(token, id);
        const { users } = await getTopTenUser(token)
        const { data } = await getSingleReplyTweet(token, postId)
        if(response && response.data.User.account === userAccount) {
          setTweetInfo(response.data)
          setUserAvatar(avatar)
          setTopTenUsers(users)
          setReplyInfo(data)
        } else {
          navigate('/error');
        }
      }
    }
    checkUserTokenIsValid();
  }, [navigate]);

  // useEffect(() => {
  //   const rerenderPage = async () => {
  //     if(needRerender) {
  //       const token = localStorage.getItem('token');
  //       const { users } = await getTopTenUser(token)
  //       const response = await getAllTweets(token)
  //       setTweetsList(response.data)
  //       if (users) {
  //         setTopTenUsers(users)
  //       }
  //       setNeedRerender(false)
  //     } 
  //   }
  //   rerenderPage()
  // }, [needRerender])




  //回到上一頁
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className={`${styles.container} container mx-auto`}>
      <div className={styles.pageContainer}>
        <div className={styles.navContainer}>
          <MainNav />
        </div>
        <div className={styles.MiddlePartContainer}>
          <div className={styles.headerContainer}>
            <div className='cursor-point' onClick={handleBack}>
              <img className={styles.backArrow} src={arrow} alt="back-arrow" />
            </div>
            <div className={styles.userInformation}>
              <h4>推文</h4>
            </div>
          </div>
          {/* 推文內容 */}
          {tweetInfo &&
            <SingleTweet key={tweetInfo.id} tweetInfo={tweetInfo} userAccount={userAccount} userAvatar={userAvatar}/>
          }
          {/* 回覆內容 */}
          <div className={styles.PostPageTweetContainer}>
            {replyInfo &&
              replyInfo.map((tweet) => (
                <ReplyInfoCard key={tweet.id} tweet={tweet} userAvatar={userAvatar} />
              ))}
          </div>
        </div>
        <div className={styles.popularContainer}>
          {topTenUsers !== null && <Popular topTenUsers={topTenUsers} />}
        </div>
      </div>
    </div>
  );
}