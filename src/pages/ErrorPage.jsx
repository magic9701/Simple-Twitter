import styles from "styles/ErrorPage.module.scss";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="container mx-auto">
      <h1>你輸入的頁面不存在</h1>
      <Link to="/login">回到登入頁面</Link>
      <Link to="/main">回到首頁</Link>
    </div>
  );
}
