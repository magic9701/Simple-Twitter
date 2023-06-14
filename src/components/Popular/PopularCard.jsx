import React, { useState } from "react";
import styles from "../../styles/PopularCard.module.scss";
import { SecondaryButton, NotActiveButton } from "../Button/Button";
const PopularCard = ({ userName, account }) => {
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = () => {
    setIsFollow(!isFollow);
  };

  return (
    <div className={styles.popularCard}>
      <img src={"https://picsum.photos/300/300?text=1"} alt="UserPhoto" />
      <div className={styles.popularCardInfo}>
        <p className={styles.popularCardUserName}>{/* {userName} */}apple</p>
        <p className={styles.popularCardUserInfo}>
          {/* {account} */}i am apple
        </p>
      </div>
      {isFollow ? (
        <SecondaryButton onClick={handleFollow}>跟隨</SecondaryButton>
      ) : (
        <div className={styles.NotActiveButton}>
          <NotActiveButton onClick={handleFollow}>正在跟隨</NotActiveButton>
        </div>
      )}
    </div>
  );
};

export default PopularCard;
