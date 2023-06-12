import { MainNav } from "components/Nav/Nav";
import styles from "../styles/FollowingPage.module.scss";
import Popular from "components/Popular/Popular";
import PopularCard from "components/Popular/PopularCard";
import FollowUserTable from "components/UserTable/FollowUserTable";
export default function FollowerPage() {
  return (
    <div className="container mx-auto">
      <div className={styles.mainContainer}>
        <div className={styles.Nav}>
          <MainNav />
        </div>
        <div className={styles.mainMiddle}>
          <div className={styles.Header}>
            <p>首頁</p>
          </div>
          <FollowUserTable />
          <PopularCard />
          <PopularCard />
          <PopularCard />
        </div>
        <div className={styles.Popular}>
          <Popular />
        </div>
      </div>
    </div>
  );
}
