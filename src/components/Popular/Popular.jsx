import styles from "styles/Popular.module.scss";
import { SecondaryButton, NotActiveButton } from "components/Button/Button.jsx";
import React, { useState, useEffect } from "react";
import { getTopUsers } from "../../api/follow.js";

const dummyData = {
  user1: {
    avatar: null,
    userName: "Pizza Hut",
    userId: "pizzahut",
  },
  user2: {
    avatar: null,
    userName: "PizzaAAAAAA",
    userId: "pizzaAAAAAA",
  },
  user3: {
    avatar: null,
    userName: "MasterCard",
    userId: "MasterCard",
  },
  user4: {
    avatar: null,
    userName: "User4",
    userId: "user4",
  },
  user5: {
    avatar: null,
    userName: "User5",
    userId: "user5",
  },
  user6: {
    avatar: null,
    userName: "User6",
    userId: "user6",
  },
  user7: {
    avatar: null,
    userName: "User7",
    userId: "user7",
  },
  user8: {
    avatar: null,
    userName: "User8",
    userId: "user8",
  },
  user9: {
    avatar: null,
    userName: "User9",
    userId: "user9",
  },
  user10: {
    avatar: null,
    userName: "User10",
    userId: "user10",
  },
};

function SuggestedFollow({ avatar, userName, userId }) {
  const displayName =
    userName.length <= 9 ? userName : `${userName.slice(0, 7)} ...`;
  const displayID = userId.length <= 9 ? userId : `${userId.slice(0, 7)} ...`;
  const [isFollow, setIsFollow] = useState(false);

  const handleFollow = () => {
    setIsFollow(!isFollow);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.avatarContainer}>{avatar}</div>
      {/* 顯示10個字 or 6個字 空格 ... */}
      <div className={styles.nameContainer}>
        <div className={styles.name}>{displayName}</div>
        <div className={`${styles.userId} secondary-text-medium`}>
          @{displayID}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {/* <div className={styles.secondaryButtonContainer}>
          <SecondaryButton>正在跟隨</SecondaryButton>
        </div> */}
        <div className={styles.notActiveButtonContainer}>
          {isFollow ? (
            <SecondaryButton onClick={handleFollow}>跟隨</SecondaryButton>
          ) : (
            <div className={styles.NotActiveButton}>
              <NotActiveButton onClick={handleFollow}>正在跟隨</NotActiveButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Popular() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const usersData = await getTopUsers();
        const processedData = Array.isArray(usersData) ? usersData : [];
        setTopUsers(processedData);
      } catch (error) {
        console.error("獲取推薦跟隨失敗：", error);
      }
    };
    fetchTopUsers();
  }, []);
  return (
    <div className={styles.popularContainer}>
      <div className={styles.header}>
        <h4>推薦跟隨</h4>
      </div>
      <div className={styles.suggestedFollowContainer}>
        <div className={styles.suggestedFollowContainer}>
          {topUsers.map((user, index) => (
            <SuggestedFollow
              key={index}
              userName={user.userName}
              userId={user.userId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
