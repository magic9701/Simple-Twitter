import styles from "styles/Popular.module.scss"
import { SecondaryButton, NotActiveButton } from "components/Button/Button.jsx"
import defaultAvatar from "assets/icons/default-avatar.svg"
import { Link } from "react-router-dom";
import { UserContext } from "contexts/UserContext.jsx"
import { useContext, useEffect, useState } from 'react';



function SuggestedFollow({user}) {
  const { id, avatar, account, name, isFollowed } = user
  const { follow, unfollow } = useContext(UserContext)
  const [ isfollow, setisfollow ] = useState(!isFollowed)
  


  const handleFollowClick = () => {
    follow(id)
    setisfollow(false)
  };

  const handleUnfollowClick = () => {
    unfollow(id)
    setisfollow(true)
  };



  return (
    <div className={styles.cardContainer}>
      <div className={styles.avatarContainer}>
        <Link to={`/user/${account}`}>
          <img className="cursor-point"
          src={avatar? avatar : defaultAvatar}
          alt="avatar"/>
        </Link>
      </div>
      <div className={styles.nameContainer}>
        <h6 className={styles.name}>
          {account}
        </h6>
        <h6 className={`${styles.userId} secondary-text-medium`}>
          @{name}
        </h6>
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
  );
}

export default function Popular({topTenUsers}) {
  return(
    <div className={styles.popularContainer}>
      <div className={styles.header}>
        <h4>推薦跟隨</h4>
      </div>
      <div className={styles.suggestedFollowContainer}>
        <div className={styles.suggestedFollowContainer}>
          {Object.values(topTenUsers).map((user) => (
            <SuggestedFollow key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}