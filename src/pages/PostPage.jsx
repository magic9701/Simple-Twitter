import styles from "styles/UserPage.module.scss"
import { useParams } from 'react-router-dom';

export default function PoatPage() {
  const { postId } = useParams();

  return (
    <div className={styles.postPage}>
      <div>這是指定貼文 {postId} 的頁面內容</div>
    </div>
  );
}