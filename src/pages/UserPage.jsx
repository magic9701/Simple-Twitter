import styles from "styles/UserPage.module.scss";
import { useParams } from "react-router-dom";

export default function UserPage() {
  const { userAccount } = useParams();

  //先call API 確認使用者輸入的帳號是否存在
  //帳號存在比對輸入的內容跟目前登入的帳號是否相符
  //如果符合 顯示A 內容
  //如果不符 顯示B 內容

  return (
    <div className={styles.userPage}>
      <div>這是使用者 {userAccount} 的頁面內容</div>
    </div>
  );
}
