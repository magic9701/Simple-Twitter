import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/icons/back-arrow-icon.svg";
import styles from "../../styles/Header.module.scss";
import { getCurrentUser } from "../../api/user";

const Header = () => {
  const { userId } = useParams();
  //   const [tweetCount, setTweetCount] = useState(0);
  //   const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        setUserData(user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    Navigate("/main");
  };

  return (
    <div>
      <div className={styles.header}>
        {/* <div className={styles.backIcon} onClick={handleBack}>
          <BackIcon />
        </div> */}
        <p>{userId ? `使用者主頁 - ${userData.name}` : "首頁"}</p>
        {/* {userData && <p className={styles.tweetCount}>{`${tweetCount}推文`}</p>} */}
      </div>
    </div>
  );
};

export default Header;
