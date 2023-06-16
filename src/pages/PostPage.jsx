import styles from "styles/UserPage.module.scss";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MainNav } from "components/Nav/Nav";
import Header from "components/Header/Header";
import Popular from "components/Popular/Popular";
import { ReplyPost } from "components/TweetInfoCard/TweetInfoCard";
import { checkUserPermission } from "api/auth";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "api/user";
export default function PostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUserId = localStorage.getItem("currentUserId");
      if (currentUserId) {
        const user = await getCurrentUser(currentUserId);
        setCurrentUser(user);
      }
    };

    fetchCurrentUser();
  }, []);
  useEffect(() => {
    const checkUserTokenIsValid = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const result = await checkUserPermission(token);
      if (!result) {
        navigate("/login");
      }
    };

    checkUserTokenIsValid();
  }, [navigate]);
  return (
    <div className="container mx-auto">
      <div className={styles.mainContainer}>
        <div className={styles.Nav}>
          <MainNav />
        </div>
        <div className={styles.mainMiddle}>
          <div className={styles.Header}>
            <Header />
          </div>
          <div className={styles.ReplyInfoCard}>
            <ReplyPost currentUser={currentUser} />
          </div>
        </div>
        <div className={styles.Popular}>
          <Popular />
        </div>
      </div>
    </div>
  );
}
