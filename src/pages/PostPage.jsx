import styles from "styles/UserPage.module.scss";
import { useParams } from "react-router-dom";
import { MainNav } from "components/Nav/Nav";
import Header from "components/Header/Header";
import Popular from "components/Popular/Popular";
import { ReplyPost } from "components/TweetInfoCard/TweetInfoCard";
export default function PoatPage() {
  const { postId } = useParams();

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
            <ReplyPost />
          </div>
        </div>
        <div className={styles.Popular}>
          <Popular />
        </div>
      </div>
    </div>
  );
}
