import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as BackIcon } from "../../assets/icons/back-arrow-icon.svg";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Header.module.scss";

const authURL = "https://pure-falls-11392.herokuapp.com/api";

const axiosTwitter = axios.create({
  baseURL: authURL,
});

const Header = ({ name }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [tweetCount, setTweetCount] = useState(null);

  const handleBackClick = () => {
    navigate("/main");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const account = localStorage.getItem("currentAccount");
        const response = await axiosTwitter.get(`/users/${account}/users`);
        const { name, tweetCount } = response.data;
        setUserData({ name, tweetCount });
        setTweetCount(tweetCount);
      } catch (error) {
        console.error("[Get User Data failed]: ", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header>
      {location.pathname !== "/main" && (
        <div className={styles.headerContainer} onClick={handleBackClick}>
          <div className={styles.backIcon}>
            <BackIcon />
          </div>
          <div className={styles.userData}>
            <p className={styles.name}>{name}</p>
            <p className={styles.tweetCount}>25推文</p>
          </div>
        </div>
      )}

      {location.pathname === "/main" && userData}
    </header>
  );
};

export default Header;
